import { cn } from '@/utils/cn';
import { BlankProps } from './Blank.types';

export default function Blank({
  margin,
  height = '0.5rem',
  width = '100%',
  bgColor = 'var(--color-surface-level-1)',
  className,
}: BlankProps) {
  return (
    <div
      className={cn(className)}
      style={{
        margin: margin,
        height: height,
        width: width,
        backgroundColor: bgColor,
      }}
    ></div>
  );
}
