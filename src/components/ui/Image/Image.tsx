'use client';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NextImage from 'next/image';
import React, { useState } from 'react';

import { cn } from '@/utils/cn';
import CustomButton from '../Button';
import { Card } from '../Card';
import Overlay from '../Overlay';
import type { ImageProps } from './Image.types';

function getAriaLabel(
  alt: string | undefined,
  title: string | undefined,
  contextTitle: string | undefined,
  index: number | undefined
): string {
  if (alt) return alt;
  if (title) return title;
  if (contextTitle != null && index != null) {
    return `${contextTitle} 이미지 ${index}`;
  }
  if (contextTitle != null) return `${contextTitle} 이미지`;
  return '이미지';
}

const Image: React.FC<ImageProps> = ({
  src,
  title,
  description,
  contextTitle,
  index,
  width,
  height,
  alt,
  className = '',
  enableModal = true,
  onClick,
  style,
  ...rest
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalId = React.useId();

  const ariaLabel = getAriaLabel(alt, title, contextTitle, index);

  const safeWidth = typeof width === 'number' ? width : 1200;
  const safeHeight = typeof height === 'number' ? height : 800;
  const isVertical = safeHeight > safeWidth;

  const imageStyle: React.CSSProperties = {
    ...(safeWidth > 0 && safeHeight > 0
      ? { aspectRatio: `${safeWidth} / ${safeHeight}` }
      : {}),
    ...(style ?? {}),
  };

  const nextImageShared = {
    src,
    alt: ariaLabel,
    width: safeWidth,
    height: safeHeight,
    style: imageStyle,
    ...rest,
  };

  const handleClick: React.MouseEventHandler<HTMLDivElement> = e => {
    if (enableModal) {
      setIsModalOpen(true);
    }
    onClick?.(e);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = e => {
    if (!enableModal) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  const imageElement = (
    <NextImage
      {...nextImageShared}
      className={cn('w-full h-auto')}
      quality={70}
    />
  );

  return (
    <>
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
              <div
                className={cn(
                  'relative w-full p-5 rounded-lg border-2 border-gray-800 dark:border-gray-500',
                  enableModal &&
                    'cursor-pointer hover:opacity-90 transition-opacity'
                )}
                onClick={handleClick}
                role={enableModal ? 'button' : undefined}
                tabIndex={enableModal ? 0 : -1}
                onKeyDown={handleKeyDown}
                aria-label={enableModal ? `${ariaLabel} 확대 보기` : ariaLabel}
                aria-haspopup={enableModal ? 'dialog' : undefined}
                aria-expanded={enableModal ? isModalOpen : undefined}
                aria-controls={enableModal ? modalId : undefined}
              >
                {imageElement}
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
      {enableModal && (
        <Overlay
          id={modalId}
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          blur={true}
          closeOnBackdropClick={true}
          ariaLabel={`${ariaLabel} 확대 보기`}
        >
          <div
            className={cn(
              'h-full w-full flex overflow-y-scroll no-scrollbar pointer-events-none'
            )}
          >
            <div
              className={cn(
                'flex justify-start flex-col gap-3 pt-16 pb-5',
                isVertical
                  ? 'w-[85%] max-w-[380px] sm:max-w-[420px]'
                  : 'w-[90%] xl:w-[80%]',
                'h-auto m-auto transition-all duration-300 ease-out',
                isModalOpen
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              )}
              onClick={e => e.stopPropagation()}
            >
              <div
                className={cn(
                  'relative mx-auto h-auto',
                  isModalOpen ? 'pointer-events-auto' : 'pointer-events-none'
                )}
              >
                <CustomButton
                  color="neutral"
                  variant="soft"
                  onClick={() => setIsModalOpen(false)}
                  icon={<FontAwesomeIcon icon={faXmark} />}
                  rounded="circle"
                  size="md"
                  aria-label="모달 닫기"
                  className="absolute! -top-15 -right-3 xl:-right-5"
                />
                <NextImage
                  {...nextImageShared}
                  className={cn('w-full h-auto rounded-lg shadow-2xl')}
                  quality={100}
                />
              </div>
            </div>
          </div>
        </Overlay>
      )}
    </>
  );
};

export default Image;
