'use client';

import React, { useEffect, useState } from 'react';

import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NextImage from 'next/image';

import { cn } from '@/utils/cn';

import CustomButton from '../Button';
import { Card } from '../Card';

import type { VideoProps } from './Video.types';

const PLAY_BUTTON_SELECTOR = '[data-video-play-button]';

export const Video: React.FC<VideoProps> = ({
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
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const focusVideoAfterRevealRef = React.useRef(false);

  const handlePlay = React.useCallback(() => {
    if (thumbnail) {
      focusVideoAfterRevealRef.current = true;
    }
    setShowVideo(true);
  }, [thumbnail]);

  useEffect(() => {
    if (!showVideo || !focusVideoAfterRevealRef.current) return;
    focusVideoAfterRevealRef.current = false;
    const id = requestAnimationFrame(() => {
      videoRef.current?.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [showVideo]);

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

  // 부모 div에 포커스가 가면 재생 버튼으로 이동 (data 속성으로만 탐지)
  const handleParentFocus = React.useCallback(() => {
    if (!containerRef.current) return;
    const playButton = containerRef.current.querySelector<HTMLElement>(
      PLAY_BUTTON_SELECTOR
    );
    playButton?.focus();
  }, []);

  const aspectRatio = width > 0 && height > 0 ? width / height : 16 / 9;

  return (
    <Card
      className={className}
      slots={{
        body: (
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
                      className={cn(
                        'w-full h-auto blur-[3px] scale-[1.01] group-hover:blur-none',
                        'duration-300 transition-all ease-in-out'
                      )}
                      style={{
                        aspectRatio,
                      }}
                      quality={50}
                      placeholder="blur"
                      blurDataURL={
                        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOUqwcAAMEAnwarUJAAAAAASUVORK5CYII='
                      }
                    />
                    <CustomButton
                      color="brand"
                      variant="solid"
                      icon={<FontAwesomeIcon icon={faPlay} />}
                      rounded="circle"
                      size="lg"
                      aria-hidden="true"
                      tabIndex={-1}
                      data-video-play-button=""
                      className={cn(
                        'h-19! w-19! border-primary-900! bg-primary-50/90!',
                        'text-2xl! text-primary-900!',
                        'absolute! top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none!'
                      )}
                    />
                  </div>
                ) : (
                  <video
                    ref={videoRef}
                    id={videoId}
                    tabIndex={-1}
                    autoPlay={autoPlay}
                    loop={thumbnail ? false : loop}
                    muted={muted}
                    playsInline
                    controls={controls}
                    className="w-full h-auto outline-none"
                    aria-label={ariaLabel}
                    style={{
                      aspectRatio,
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
        ),
      }}
    />
  );
};
