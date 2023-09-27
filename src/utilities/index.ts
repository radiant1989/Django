export const mustBeTrue = (v: boolean) => v === true;

export function getWin(ele: HTMLElement) {
  return ele?.ownerDocument.defaultView || null;
}

export function collectScroller(ele: HTMLElement) {
  const scrollerList: HTMLElement[] = [];
  let current = ele?.parentElement;

  const scrollStyle = ["hidden", "scroll", "clip", "auto"];

  while (current) {
    const { overflowX, overflowY, overflow } =
      getWin(current)!.getComputedStyle(current);
    if ([overflowX, overflowY, overflow].some((o) => scrollStyle.includes(o))) {
      scrollerList.push(current);
    }

    current = current.parentElement;
  }

  return scrollerList;
}

export function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
