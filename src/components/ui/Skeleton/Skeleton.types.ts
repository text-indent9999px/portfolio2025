export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  width?: number | string;
  height?: number | string;
  radius?: number | string | 'none' | 'full';
  animated?: boolean;
}
