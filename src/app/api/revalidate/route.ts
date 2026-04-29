import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;

const ALLOWED_TAGS = new Set([
  'projects-data',
  'profile-skills',
  'profile-experience',
  'profile-intro',
]);

type RevalidateBody = {
  tags?: string[];
};

function getBearerToken(authHeader: string | null) {
  if (!authHeader) {
    return null;
  }

  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return null;
  }

  return token;
}

export async function POST(request: NextRequest) {
  if (!REVALIDATE_SECRET) {
    return NextResponse.json(
      { ok: false, error: 'REVALIDATE_SECRET 환경변수가 설정되지 않았습니다.' },
      { status: 500 }
    );
  }

  const bearerToken = getBearerToken(request.headers.get('authorization'));
  if (bearerToken !== REVALIDATE_SECRET) {
    return NextResponse.json(
      { ok: false, error: '인증에 실패했습니다.' },
      { status: 401 }
    );
  }

  let body: RevalidateBody;
  try {
    body = (await request.json()) as RevalidateBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: '요청 본문은 JSON 형식이어야 합니다.' },
      { status: 400 }
    );
  }

  const requestedTags = Array.isArray(body.tags)
    ? body.tags.filter(tag => typeof tag === 'string')
    : [];

  const tags =
    requestedTags.length > 0
      ? requestedTags
          .map(tag => tag.trim())
          .filter(tag => ALLOWED_TAGS.has(tag))
      : [...ALLOWED_TAGS];

  if (tags.length === 0) {
    return NextResponse.json(
      {
        ok: false,
        error:
          '유효한 태그가 없습니다. 허용 태그: projects-data, profile-skills, profile-experience, profile-intro',
      },
      { status: 400 }
    );
  }

  for (const tag of tags) {
    revalidateTag(tag, 'max');
  }

  return NextResponse.json({
    ok: true,
    revalidatedTags: tags,
    timestamp: new Date().toISOString(),
  });
}
