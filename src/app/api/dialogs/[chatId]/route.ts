import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dialogsDir = path.join(process.cwd(), 'dialogs');

export async function GET(req: NextRequest, { params }: { params: { chatId: string } }) {
    const { chatId } = params;
    const filePath = path.join(dialogsDir, `dialog_${chatId}.txt`);

    if (fs.existsSync(filePath)) {
        const fileBuffer = fs.readFileSync(filePath);
        return new NextResponse(fileBuffer, {
            headers: {
                'Content-Type': 'text/plain', // Укажите правильный тип содержимого для текстовых файлов
                'Content-Disposition': `attachment; filename="dialog_${chatId}.txt"`,
            },
        });
    } else {
        return NextResponse.json({ error: 'Диалог не найден' }, { status: 404 });
    }
}
