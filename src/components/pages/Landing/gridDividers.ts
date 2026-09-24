/**
 * 카드 없이 2열 그리드로 배치할 때 쓰는 위치 계산.
 *
 * 각 항목과 구분선을 전부 "실제 grid line"에 올려서, 구분선이 카드와 카드
 * 사이의 짧은 구간에만(위아래/좌우로 살짝 inset된 채) 나타나게 한다 — 카드
 * 하나에 border-r/border-b를 긋는 방식과 달리, 옆 칸이 비어 있으면(항목이
 * 홀수 개일 때 마지막 줄) 그 자리엔 선도 안 생긴다.
 *
 * 그리드 라인 번호: 홀수 라인(1,3,5,...)이 콘텐츠 칸, 짝수 라인(2,4,...)이
 * 그 사이 여백 칸이다. `gridTemplate(count)`로 만든 grid-template-columns/rows
 * 와 함께 쓴다.
 */

const track = (index: number) => index * 2 + 1;

export interface GridPlacement {
  gridColumn: string;
  gridRow: string;
}

/** 2열 그리드에서 index번째(0-based) 항목이 들어갈 grid-column/row. */
export function itemPlacement(index: number): GridPlacement {
  const row = Math.floor(index / 2);
  const col = index % 2;
  return {
    gridColumn: `${track(col)} / ${track(col) + 1}`,
    gridRow: `${track(row)} / ${track(row) + 1}`,
  };
}

export interface DividerSpec extends GridPlacement {
  key: string;
  orientation: 'vertical' | 'horizontal';
}

/** total개 항목을 2열로 채울 때 필요한 칸 수. grid-template-rows 계산에 쓴다. */
export function rowCount(total: number): number {
  return Math.max(1, Math.ceil(total / 2));
}

/**
 * 실제로 옆(또는 아래)에 항목이 있는 경계에만 구분선을 만든다.
 * 항목이 홀수 개면 마지막 줄의 오른쪽 칸은 비고, 그 옆엔 세로선도 없다.
 */
export function computeDividers(total: number): DividerSpec[] {
  const rows = rowCount(total);
  const exists = (i: number) => i < total;
  const dividers: DividerSpec[] = [];

  for (let r = 0; r < rows; r++) {
    const left = r * 2;
    const right = r * 2 + 1;
    if (exists(left) && exists(right)) {
      dividers.push({
        key: `v-${r}`,
        orientation: 'vertical',
        gridColumn: `${track(0) + 1} / ${track(1)}`,
        gridRow: `${track(r)} / ${track(r) + 1}`,
      });
    }
  }

  for (let r = 0; r < rows - 1; r++) {
    for (let c = 0; c < 2; c++) {
      const top = r * 2 + c;
      const bottom = (r + 1) * 2 + c;
      if (exists(top) && exists(bottom)) {
        dividers.push({
          key: `h-${r}-${c}`,
          orientation: 'horizontal',
          gridColumn: `${track(c)} / ${track(c) + 1}`,
          gridRow: `${track(r) + 1} / ${track(r + 1)}`,
        });
      }
    }
  }

  return dividers;
}

/** 콘텐츠 칸은 auto(내용만큼), 사이 여백 칸은 고정폭으로 둔 grid-template 값. */
export function gridTemplate(total: number, gap = '2.5rem') {
  const rows = rowCount(total);
  return {
    gridTemplateColumns: `1fr ${gap} 1fr`,
    gridTemplateRows: Array.from({ length: rows }, () => 'auto').join(
      ` ${gap} `
    ),
  };
}
