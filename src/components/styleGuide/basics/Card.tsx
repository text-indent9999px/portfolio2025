import {
  faBookmark,
  faEllipsis,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import Blank from '../../ui/Blank';
import { CustomButton } from '../../ui/Button';
import { Card } from '../../ui/Card';
import { Description } from '../../ui/Description';
import { Heading } from '../../ui/Heading';
import { Pill } from '../../ui/Pill';
import { StyleGuideDetailHeading, StyleGuideSection } from '../common';

const CardStyleGuide: React.FC = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isLiked2, setIsLiked2] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isMdOrAbove = useMediaQuery('--breakpoint-md', 'min');

  const handleLike = () => {
    setIsLiked(prev => !prev);
  };

  const handleLike2 = () => {
    setIsLiked2(prev => !prev);
  };

  const handleBookmark = () => {
    setIsBookmarked(prev => !prev);
  };

  // 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <StyleGuideSection>
      <>
        <div className="space-y-1">
          <StyleGuideDetailHeading>Slots API</StyleGuideDetailHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-6">
            <Card
              appearance="solid"
              padding="md"
              className="w-full"
              elevation={0}
              surfaceLevel={'min'}
              slots={{
                header: (
                  <Heading size={5} bottomSpacing="xs">
                    기본 카드
                  </Heading>
                ),
                body: (
                  <Description size={7}>
                    헤더와 본문으로 구성된 간단한 카드 컴포넌트로, 기본형
                    카드입니다.
                  </Description>
                ),
              }}
            />

            <Card
              appearance="outline"
              padding="md"
              className="w-full"
              elevation={1}
              surfaceLevel={1}
              slots={{
                header: (
                  <div className="flex items-start justify-between relative">
                    <Heading size={5} bottomSpacing="xs" className="shrink-0">
                      액션 포함 카드
                    </Heading>
                    <div className="relative" ref={menuRef}>
                      <CustomButton
                        variant="plain"
                        color="brand"
                        size="xs"
                        className="-mr-3 -mt-1"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                      >
                        <FontAwesomeIcon icon={faEllipsis} />
                      </CustomButton>
                      {isMenuOpen && (
                        <div className="absolute right-0 top-full mt-1 bg-surface-level-min dark:bg-surface-level-4 border border-surface-level-2 rounded-lg shadow-lg py-1 min-w-[120px] z-10">
                          <button
                            className="w-full px-3 py-2 text-left text-sm hover:bg-surface-level-1 dark:hover:bg-surface-level-5 transition-colors text-text-primary"
                            onClick={() => {
                              setIsMenuOpen(false);
                            }}
                          >
                            예시 버튼
                          </button>
                          <button
                            className="w-full px-3 py-2 text-left text-sm hover:bg-surface-level-1 dark:hover:bg-surface-level-5 transition-colors text-text-primary"
                            onClick={() => {
                              setIsMenuOpen(false);
                            }}
                          >
                            예시 버튼
                          </button>
                          <button
                            className="w-full px-3 py-2 text-left text-sm hover:bg-surface-level-1 dark:hover:bg-surface-level-5 transition-colors text-text-primary"
                            onClick={() => {
                              setIsMenuOpen(false);
                            }}
                          >
                            예시 버튼
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ),
                body: (
                  <Description size={7}>
                    헤더에 액션 버튼이나 아이콘과 같은 추가 요소를 포함할 수
                    있습니다.
                  </Description>
                ),
              }}
            />

            <Card
              appearance="outline"
              padding="md"
              className="w-full"
              elevation={4}
              surfaceLevel={2}
              gap="1rem"
              slots={{
                header: (
                  <Heading size={5} bottomSpacing="xs">
                    푸터 포함 카드
                  </Heading>
                ),
                body: (
                  <Description size={7}>
                    푸터 섹션은 메타데이터, 액션, 또는 추가 정보를 표시하는 데
                    유용합니다.
                  </Description>
                ),
                footer: (
                  <div className="flex items-center justify-between">
                    <Description size={8} textClassName="text-text-tertiary">
                      최종 업데이트: 오늘
                    </Description>
                    <CustomButton
                      variant="plain"
                      color="brand"
                      size="xs"
                      style={{ padding: 0 }}
                    >
                      자세히 보기
                    </CustomButton>
                  </div>
                ),
              }}
            />

            <Card
              appearance="solid"
              elevation={4}
              padding="lg"
              cursorTrigger
              className="w-full"
              surfaceLevel={'min'}
              onClick={() =>
                console.log('리플 애니메이션 적용 카드를 클릭했습니다.')
              }
              interactiveLabel="리플 애니메이션 적용 카드"
              slots={{
                header: (
                  <Heading size={5} bottomSpacing="xs">
                    리플 애니메이션 적용 카드
                  </Heading>
                ),
                body: (
                  <Description size={7}>
                    카드 자체를 클릭하여 액션을 수행하는 경우 사용합니다.
                    클릭하면 리플 효과가 발생합니다.
                  </Description>
                ),
              }}
            />
          </div>
        </div>

        <div className="space-y-1">
          <StyleGuideDetailHeading>With Thumbnail</StyleGuideDetailHeading>
          <div className="space-y-4 w-full mb-6">
            <Card
              appearance="solid"
              padding="md"
              elevation={2}
              className="w-full"
              ratio={isMdOrAbove ? '120px 1fr' : '1fr auto'}
              gap={isMdOrAbove ? '2rem' : '1rem'}
              surfaceLevel={'min'}
              thumbPosition={isMdOrAbove ? 'left' : 'top'}
              slots={{
                thumb: (
                  <div className="w-full aspect-[2/1] md:aspect-square bg-gradient-to-br from-primary-400 to-primary-600 rounded flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      이미지 썸네일
                    </span>
                  </div>
                ),
                body: (
                  <>
                    <Heading size={5} bottomSpacing="sm">
                      썸네일 카드
                    </Heading>
                    <Description size={7} className="mb-3">
                      썸네일이 콘텐츠 위에 표시됩니다. 아티클이나 제품과 같은
                      이미지 중심 콘텐츠에 이상적입니다.
                    </Description>
                    <div className="flex items-center gap-2 text-xs text-text-tertiary">
                      <span>📅 2024.01.15</span>
                      <span>•</span>
                      <span>👁 1.2k 조회</span>
                    </div>
                  </>
                ),
              }}
            />
          </div>
        </div>

        <div className="space-y-1">
          <StyleGuideDetailHeading>Examples</StyleGuideDetailHeading>
          <div className="space-y-6">
            <Card
              appearance="solid"
              elevation={3}
              padding="lg"
              cursorTrigger
              className="w-full"
              ratio={isMdOrAbove ? '120px 1fr' : '1fr auto'}
              gap={isMdOrAbove ? '1rem 2rem' : '1rem 1rem'}
              surfaceLevel={'min'}
              thumbPosition={isMdOrAbove ? 'left' : 'top'}
              onClick={() =>
                console.log(
                  '공통 UI 컴포넌트 시스템 — 예시 카드를 클릭했습니다.'
                )
              }
              interactiveLabel="공통 UI 컴포넌트 시스템 — 예시 카드"
              slots={{
                thumb: (
                  <div className="w-full aspect-[3/2] md:aspect-[2/3] bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-4xl mb-2">🚀</div>
                      <p className="text-sm font-medium">이미지</p>
                    </div>
                  </div>
                ),
                header: (
                  <>
                    <Heading size={3} visualSize="xl" bottomSpacing="none">
                      공통 UI 컴포넌트 시스템
                    </Heading>
                    <Description size={7}>
                      React와 TypeScript로 구축한 포괄적인 공통 UI 컴포넌트
                      시스템
                    </Description>
                  </>
                ),
                body: (
                  <>
                    <Description size={7} className="mb-4">
                      UI 컴포넌트 시스템 프로젝트입니다. slots API로
                      헤더·썸·본문·푸터를 조합합니다.
                    </Description>
                    <div className="flex flex-wrap gap-1 mb-4">
                      <Pill
                        variant="soft"
                        color="brand"
                        size="sm"
                        rounded="pill"
                      >
                        React
                      </Pill>
                      <Pill
                        variant="soft"
                        color="brand"
                        size="sm"
                        rounded="pill"
                      >
                        TypeScript
                      </Pill>
                      <Pill
                        variant="soft"
                        color="brand"
                        size="sm"
                        rounded="pill"
                      >
                        Next.js
                      </Pill>
                      <Pill
                        variant="outline"
                        color="neutral"
                        size="sm"
                        rounded="pill"
                      >
                        + 5 more
                      </Pill>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-text-tertiary">
                      <span>📅 2 days ago</span>
                    </div>
                  </>
                ),
                footer: (
                  <div className="flex items-center justify-end">
                    <div className="flex gap-2">
                      <CustomButton
                        variant={isLiked2 ? 'solid' : 'outline'}
                        color={isLiked2 ? 'brand' : 'neutral'}
                        size="xs"
                        rounded="pill"
                        onClick={handleLike2}
                        icon={
                          <FontAwesomeIcon
                            icon={faHeart}
                            className={
                              isLiked2
                                ? 'text-warning-400 dark:text-warning-400'
                                : ''
                            }
                            bounce={isLiked2 ? true : false}
                            style={{
                              animationDuration: '1s',
                              animationIterationCount: '1',
                            }}
                          />
                        }
                      >
                        {`좋아요 ${isLiked2 ? '12' : '11'}`}
                      </CustomButton>
                      <CustomButton
                        variant={isBookmarked ? 'soft' : 'outline'}
                        color={isBookmarked ? 'success' : 'neutral'}
                        size="xs"
                        rounded="pill"
                        onClick={handleBookmark}
                        icon={<FontAwesomeIcon icon={faBookmark} />}
                      >
                        {`북마크 ${isBookmarked ? '5' : '4'}`}
                      </CustomButton>
                    </div>
                  </div>
                ),
              }}
            />

            <Card
              appearance="solid"
              padding="md"
              className="w-full"
              elevation={2}
              surfaceLevel={'min'}
              gap="0.5rem 1.5rem"
              ratio={isMdOrAbove ? '120px 1fr' : '1fr auto'}
              thumbPosition={isMdOrAbove ? 'left' : 'top'}
              slots={{
                header: (
                  <div className="flex items-center justify-between mb-0 md:mb-2">
                    <Heading size={5} bottomSpacing="none">
                      제품 카드
                    </Heading>
                    <CustomButton
                      variant="plain"
                      color={'brand'}
                      size="sm"
                      onClick={handleLike}
                      icon={
                        <FontAwesomeIcon
                          icon={faHeart}
                          className={
                            isLiked
                              ? 'text-warning-500 dark:text-warning-400'
                              : 'text-gray-300 dark:text-gray-500'
                          }
                          bounce={isLiked ? true : false}
                          style={{
                            animationDuration: '1s',
                            animationIterationCount: '1',
                          }}
                        />
                      }
                    />
                  </div>
                ),
                thumb: (
                  <div className="w-full h-40 bg-gradient-to-br from-success-400 to-success-600 rounded flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      제품 이미지
                    </span>
                  </div>
                ),
                body: (
                  <>
                    <Heading size={7} visualSize="sm" bottomSpacing="xs">
                      프리미엄 제품명
                    </Heading>
                    <Description size={8} className="mb-3">
                      제품에 대한 설명을 입력합니다.
                    </Description>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-text-primary">
                          99,000원
                        </span>
                        <span className="text-xs text-text-tertiary line-through ml-2">
                          149,000원
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-warning-600">★★★★★</span>
                        <span className="text-xs text-text-tertiary">
                          (4.8)
                        </span>
                      </div>
                    </div>
                  </>
                ),
                footer: (
                  <>
                    <Blank height="1rem" bgColor="transparent" />
                    <CustomButton
                      variant="solid"
                      color="brand"
                      size="md"
                      fullWidth
                      rounded="pill"
                    >
                      장바구니에 추가
                    </CustomButton>
                  </>
                ),
              }}
            />
          </div>
        </div>
      </>
    </StyleGuideSection>
  );
};

export default CardStyleGuide;
