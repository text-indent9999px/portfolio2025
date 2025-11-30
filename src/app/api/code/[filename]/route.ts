import { promises as fs } from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { getCodePath } from '../pathMap';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;

    // 파일명을 실제 컴포넌트 경로로 매핑
    const filePath = getCodePath(filename);
    if (!filePath) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const fullPath = path.join(process.cwd(), filePath);
    
    // 파일 존재 여부 확인
    try {
      await fs.access(fullPath);
    } catch (accessError) {
      console.error('File access error:', {
        filename,
        filePath,
        fullPath,
        cwd: process.cwd(),
        error: accessError,
      });
      return NextResponse.json(
        { error: 'File not found', path: fullPath },
        { status: 404 }
      );
    }

    const content = await fs.readFile(fullPath, 'utf-8');

    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  } catch (error) {
    console.error('Error reading file:', {
      error,
      filename: (await params).filename,
      cwd: process.cwd(),
    });
    return NextResponse.json(
      { error: 'Failed to read file', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
