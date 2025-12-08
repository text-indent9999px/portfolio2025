'use client';

import React, { useState } from 'react';
import { Card } from '../Card';
import { VideoProps } from './Video.types';

import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NextImage from 'next/image';
import CustomButton from '../Button';

const Video: React.FC<VideoProps> = ({
  src,
  title,
  description,
  contextTitle,
  index,
  width,
  height,
  autoPlay = true,
  loop = true,
  muted = true,
  controls = true,
  className = '',
  thumbnail,
}) => {
  const videoId = React.useId();
  const ariaLabel = React.useMemo(() => {
    if (title) return title;
    if (contextTitle && index) {
      return `${contextTitle} 데모 비디오 ${index}`;
    }
    if (contextTitle) return `${contextTitle} 데모 비디오`;
    return '데모 비디오';
  }, [title, contextTitle, index]);

  const playButtonLabel = React.useMemo(() => {
    return `${ariaLabel} 재생`;
  }, [ariaLabel]);

  const [showVideo, setShowVideo] = useState(!thumbnail);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handlePlay = React.useCallback(() => {
    setShowVideo(true);
  }, []);

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> =
    React.useCallback(
      e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handlePlay();
        }
      },
      [handlePlay]
    );

  // 부모 div에 포커스가 가면 버튼에 포커스 이동
  const handleParentFocus = React.useCallback(() => {
    if (containerRef.current) {
      // 컨테이너 내부의 첫 번째 button 요소 찾기
      const button = containerRef.current.querySelector('button');
      if (button) {
        button.focus();
      }
    }
  }, []);

  return (
    <Card className={className}>
      <Card.Body>
        <figure>
          {title && (
            <strong className="flex text-md text-text-primary mb-4">
              {title}
            </strong>
          )}
          <div className="relative w-full p-5 rounded-lg border-2 border-gray-800 dark:border-gray-500">
            <div className="w-full h-full relative group overflow-hidden">
              {thumbnail && !showVideo ? (
                <div
                  ref={containerRef}
                  role="button"
                  tabIndex={0}
                  aria-label={playButtonLabel}
                  aria-controls={videoId}
                  onClick={handlePlay}
                  onKeyDown={handleKeyDown}
                  onFocus={handleParentFocus}
                  className="cursor-pointer focus-visible:outline-none"
                >
                  <NextImage
                    src={thumbnail}
                    alt=""
                    width={width}
                    height={height}
                    className="w-full h-auto
                      blur-[3px]
                      scale-101
                      group-hover:blur-none
                      duration-300 transition-all ease-in-out"
                    style={{
                      aspectRatio: `${width / height}`,
                    }}
                    quality={50}
                    placeholder="blur"
                    blurDataURL={
                      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOUqwcAAMEAnwarUJAAAAAASUVORK5CYII='
                    }
                  />
                  <CustomButton
                    color="primary"
                    variant="filled"
                    icon={<FontAwesomeIcon icon={faPlay} />}
                    rounded="circle"
                    size="lg"
                    aria-hidden="true"
                    tabIndex={-1}
                    className="
                    h-19! w-19!
                    border-primary-900!
                    bg-primary-50/90!
                    text-2xl! text-primary-900!
                    absolute! top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    pointer-events-none!"
                  />
                </div>
              ) : (
                <video
                  id={videoId}
                  autoPlay={autoPlay}
                  loop={thumbnail ? false : loop}
                  muted={muted}
                  playsInline
                  controls={controls}
                  className="w-full h-auto"
                  aria-label={ariaLabel}
                  style={{
                    aspectRatio: `${width / height}`,
                  }}
                >
                  <source src={src} type="video/mp4" />
                  브라우저가 비디오 태그를 지원하지 않습니다.
                </video>
              )}
            </div>
          </div>
          {description && (
            <figcaption className="mt-4 text-sm text-text-secondary dark:text-text-tertiary">
              {description}
            </figcaption>
          )}
        </figure>
      </Card.Body>
    </Card>
  );
};

export default Video;
