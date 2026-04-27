import { promises as fs } from 'node:fs';
import path from 'node:path';

const RESUME_FILENAME = '프론트엔드_개발_지원자_김남영.pdf';
const RESUME_PATH = path.join(process.cwd(), 'private-files', 'resume.pdf');

export async function GET() {
  try {
    const resumeBuffer = await fs.readFile(RESUME_PATH);

    return new Response(resumeBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(RESUME_FILENAME)}`,
        'Cache-Control': 'no-store',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    });
  } catch {
    return Response.json(
      { error: '이력서 파일을 불러오지 못했습니다.' },
      { status: 404 }
    );
  }
}

