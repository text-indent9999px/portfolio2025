import { promises as fs } from 'node:fs';
import path from 'node:path';
import { SITE } from '../../../data/portfolio';

const RESUME_FILENAME = '프론트엔드_개발_지원자_김남영.pdf';
const RESUME_PATH = path.join(process.cwd(), 'private-files', 'resume.pdf');

const notAvailable = () =>
  Response.json(
    { error: '이력서를 제공하지 않습니다.' },
    {
      status: 404,
      headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' },
    }
  );

export async function GET() {
  // 공개하지 않는 동안에는 파일을 읽지도 않고 바로 404를 돌려준다.
  if (!SITE.resumeDownload) return notAvailable();

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
    return notAvailable();
  }
}
