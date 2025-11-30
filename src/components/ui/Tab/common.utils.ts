// 공통 유틸리티 함수들 (PrimaryTab, SecondaryTab 모두에서 사용)

export const buildUpdateIndicator =
  ({
    tabsRef,
    activeTab,
    isInitialized,
    setIndicatorStyle,
    setIsInitialized,
  }: {
    tabsRef: React.RefObject<HTMLDivElement | null>;
    activeTab: string;
    isInitialized: boolean;
    setIndicatorStyle: (v: { width: number; left: number }) => void;
    setIsInitialized: (v: boolean) => void;
  }) =>
  () => {
    if (!tabsRef.current) return;
    const el = tabsRef.current.querySelector(
      `[data-tab-id="${activeTab}"]`
    ) as HTMLElement | null;
    if (!el) return;
    const containerRect = tabsRef.current.getBoundingClientRect();
    const tabRect = el.getBoundingClientRect();
    setIndicatorStyle({
      width: tabRect.width,
      left: tabRect.left - containerRect.left,
    });
    if (!isInitialized) setIsInitialized(true);
  };

export const buildTransitionStart =
  ({ setIsMoving }: { setIsMoving: (v: boolean) => void }) =>
  () =>
    setIsMoving(true);

export const buildButtonFocusSync =
  ({
    activeTab,
    onTabChange,
  }: {
    activeTab: string;
    onTabChange: (tabId: string) => void;
  }) =>
  (tabId: string) => {
    if (tabId !== activeTab) onTabChange(tabId);
  };











