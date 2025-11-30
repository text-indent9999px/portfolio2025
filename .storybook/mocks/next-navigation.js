// Next.js navigation 모킹 파일
const mockRouter = {
  push: url => {
    console.log('Mock router push:', url);
  },
  back: () => {
    console.log('Mock router back');
  },
  forward: () => {
    console.log('Mock router forward');
  },
  refresh: () => {
    console.log('Mock router refresh');
  },
  replace: url => {
    console.log('Mock router replace:', url);
  },
  prefetch: url => {
    console.log('Mock router prefetch:', url);
  },
};

export const useRouter = () => mockRouter;
export const usePathname = () => '/';
export const useSearchParams = () => new URLSearchParams();
export const useParams = () => ({});
export const useTransition = () => [false, callback => callback()];
export const unstable_addTransitionType = () => {};
