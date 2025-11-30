// 공통 타입 정의 (PrimaryTab, SecondaryTab 모두에서 사용)

export interface TabItem {
  id: string;
  label: string;
  notification?: number | string;
}

export interface BaseTabProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
  enableTransition?: boolean;
}







