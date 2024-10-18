import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const sharedDir = path.join(process.cwd(), 'shared');

export async function GET(req: NextRequest, { params }: { params: { filename: string } }) {
    const { filename } = params;
    const filePath = path.join(sharedDir, filename);

    if (fs.existsSync(filePath)) {
        const fileBuffer = fs.readFileSync(filePath);
        return new NextResponse(fileBuffer, {
            headers: {
                'Content-Type': 'application/octet-stream', // Используйте правильный тип содержимого
                'Content-Disposition': `attachment; filename="${filename}"`,
            },
        });
    } else {
        return NextResponse.json({ error: 'Файл не найден' }, { status: 404 });
    }
}
