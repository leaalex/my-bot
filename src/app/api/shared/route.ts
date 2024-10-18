import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const sharedDir = path.join(process.cwd(), 'shared');

export async function GET() {
    try {
        const files = fs.readdirSync(sharedDir);
        return NextResponse.json(files);
    } catch (error) {
        console.error('Ошибка при получении файлов:', error);
        return NextResponse.json({ error: 'Ошибка при получении файлов' }, { status: 500 });
    }
}
