import { NextRequest, NextResponse } from 'next/server';
import { Telegraf } from 'telegraf';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

const bot = new Telegraf(process.env.BOT_TOKEN as string);

const messagesDir = path.join(process.cwd(), 'messages');
const sharedDir = path.join(process.cwd(), 'shared');

// Проверка наличия папок и создание, если их нет
if (!fs.existsSync(messagesDir)) {
    fs.mkdirSync(messagesDir);
}
if (!fs.existsSync(sharedDir)) {
    fs.mkdirSync(sharedDir);
}


export async function POST(req: NextRequest) {
    try {
        const body = await req.json(); // Получите тело запроса

        // Обработайте обновление с помощью Telegraf
        await bot.handleUpdate(body);

        // Сохраните сообщение в файл
        if (body.message) {
            const messageText = body.message.text || '';
            const messageId = body.message.message_id;
            const chatId = body.message.chat.id;
            const username = body.message.from?.username || 'Неизвестный пользователь';
            const date = new Date(body.message.date * 1000).toLocaleString(); // Преобразование в читаемый формат

            // Форматируем текст сообщения
            const logMessage = `Дата: ${date}\nПользователь: ${username}\nСообщение: ${messageText}\n`;

            // Определите путь к файлу для сообщений
            const messageFilePath = path.join(messagesDir, `message_${chatId}_${messageId}.txt`);

            // Сохраните сообщение в файл
            fs.writeFileSync(messageFilePath, logMessage);

            // Сохраните прикреплённые файлы
            if (body.message.document) {
                const fileId = body.message.document.file_id;
                const fileName = body.message.document.file_name;

                // Получите информацию о файле
                const fileLink = await bot.telegram.getFileLink(fileId);
                
                // Загрузите файл и сохраните его в папку shared
                const response = await axios.get(fileLink, { responseType: 'arraybuffer' });
                const filePath = path.join(sharedDir, fileName);
                fs.writeFileSync(filePath, response.data);
            }
        }

        return NextResponse.json({ status: 'OK' }); // Ответьте, что всё прошло успешно
    } catch (error) {
        console.error('Ошибка при обработке обновления:', error);
        return NextResponse.json({ error: 'Failed to handle update' }, { status: 500 });
    }
}