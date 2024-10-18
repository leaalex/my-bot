import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dialogsDir = path.join(process.cwd(), 'dialogs');

export async function GET(req: NextRequest, { params }: { params: { filename: string } }) {
    const { filename } = params;
    const filePath = path.join(dialogsDir, filename);

    if (fs.existsSync(filePath)) {
        const fileBuffer = fs.readFileSync(filePath);
        return new NextResponse(fileBuffer, {
            headers: {
                'Content-Type': 'text/plain',
                'Content-Disposition': `attachment; filename="${filename}"`,
            },
        });
    } else {
        return NextResponse.json({ error: 'Файл не найден' }, { status: 404 });
    }
}