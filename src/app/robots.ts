import type { MetadataRoute } from 'next';
import { SITE } from '../data/portfolio';

export default function robots(): MetadataRoute.Robots {
  // 검색엔진 노출 차단은 각 페이지의 noindex 메타태그가 맡는다. 여기서 크롤링
  // 자체를 막으면, 이력서 등으로 링크를 직접 받은 사람이 AI 도구로 그 링크를
  // 읽으려 할 때도 robots.txt를 지키는 도구는 함께 막혀버린다.
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/'] },
    ...(SITE.indexable && { sitemap: `${SITE.url}/sitemap.xml` }),
  };
}
