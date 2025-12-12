'use client';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NextImage from 'next/image';
import React, { useEffect, useState } from 'react';
import CustomButton from '../Button';
import { Card } from '../Card';
import Overlay from '../Overlay';
import { ImageProps } from './Image.types';

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
  ...rest
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalId = React.useId();

  const ariaLabel = React.useMemo(() => {
    if (alt) return alt;
    if (title) return title;
    if (contextTitle && index) {
      return `${contextTitle} 이미지 ${index}`;
    }
    if (contextTitle) return `${contextTitle} 이미지`;
    return '이미지';
  }, [alt, title, contextTitle, index]);

  const safeWidth = typeof width === 'number' ? width : 1200;
  const safeHeight = typeof height === 'number' ? height : 800;
  const aspectClass =
    typeof safeWidth === 'number' &&
    typeof safeHeight === 'number' &&
    safeWidth > 0 &&
    safeHeight > 0
      ? `aspect-[${safeWidth / safeHeight}]`
      : '';

  // ESC 키로 모달 닫기 (모달 모드에서만 의미 있음)
  useEffect(() => {
    if (!enableModal || !isModalOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [enableModal, isModalOpen]);

  const handleClick: React.MouseEventHandler<HTMLDivElement> = e => {
    if (enableModal) {
      setIsModalOpen(true);
    }
    if (rest.onClick) {
      // 부모에서 전달한 onClick도 함께 호출
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (rest.onClick as any)(e);
    }
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
      src={src}
      alt={ariaLabel}
      width={safeWidth}
      height={safeHeight}
      className={`w-full h-auto ${aspectClass}`}
      quality={80}
      {...rest}
    />
  );

  return (
    <>
      <Card className={className}>
        <Card.Body>
          <figure>
            {title && (
              <strong className="flex text-md text-text-primary mb-4">
                {title}
              </strong>
            )}
            <div
              className={`relative w-full p-5 rounded-lg border-2 border-gray-800 dark:border-gray-500 ${
                enableModal
                  ? 'cursor-pointer hover:opacity-90 transition-opacity'
                  : ''
              }`}
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
        </Card.Body>
      </Card>
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
            className={`h-full w-full flex
            overflow-y-scroll no-scrollbar pointer-events-none`}
          >
            <div
              className={`flex justify-start flex-col gap-3 w-[90%] xl:w-[80%] pt-16 pb-5
                h-auto m-auto transition-all duration-300 ease-out ${
                  isModalOpen
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                }`}
              onClick={e => e.stopPropagation()}
            >
              <div
                className={`relative mx-auto h-auto ${
                  isModalOpen ? 'pointer-events-auto' : 'pointer-events-none'
                }`}
              >
                <CustomButton
                  color="gray"
                  variant="tonal"
                  onClick={() => setIsModalOpen(false)}
                  icon={<FontAwesomeIcon icon={faXmark} />}
                  rounded="circle"
                  size="md"
                  aria-label="모달 닫기"
                  className="absolute! -top-15 -right-3 xl:-right-5"
                />
                <NextImage
                  alt={ariaLabel}
                  src={src}
                  width={safeWidth}
                  height={safeHeight}
                  className="w-full h-auto rounded-lg shadow-2xl"
                  quality={100}
                  {...rest}
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
