(function () {
  try {
    // localStorage에서 저장된 테마 설정 읽기
    var stored = localStorage.getItem('siteTheme');

    // 시스템 다크모드 선호도 확인
    var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // 유효한 테마 모드인지 확인 (라이트/다크만 지원)
    var mode =
      stored && (stored === 'light' || stored === 'dark')
        ? stored
        : systemDark
        ? 'dark'
        : 'light';

    // 실제 다크모드 여부 결정
    var isDark = mode === 'dark';

    // DOM에 테마 적용
    var root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // 테마 준비 완료 플래그 설정
    root.setAttribute('data-theme-ready', '1');
  } catch (e) {
    // 에러 발생 시 기본값으로 설정
    document.documentElement.setAttribute('data-theme-ready', '1');
  }
})();
