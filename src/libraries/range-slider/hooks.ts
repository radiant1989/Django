import {
  reactive,
  computed,
  ref,
  onBeforeUnmount,
  Ref,
  ComputedRef,
  watch,
} from "vue";

export const useDragHandler = ({
  onChange,
}: {
  onChange: (processX: number) => void;
}) => {
  const state = reactive<{ benchmarkPageX: number; benchmarkProcessX: number }>(
    {
      benchmarkPageX: 0, // mouse x pixels related to viewport when starting drag
      benchmarkProcessX: 0, // process x pixels related to slider when starting drag
    }
  );

  const handleDragStart = (e: MouseEvent | TouchEvent, processX: number) => {
    // make sure mouseup event fires even if cursor moved out from target element by quick moving click.
    e.preventDefault();
    // stop emiting event into parent element
    e.stopPropagation();

    const event = "targetTouches" in e ? e.targetTouches[0] : e;
    state.benchmarkPageX = event.pageX;
    state.benchmarkProcessX = processX;

    document.addEventListener("mousemove", handleDragMove, { passive: false }); // allow event.preventDefault() in listener
    document.addEventListener("touchmove", handleDragMove, { passive: false });
    document.addEventListener("touchend", handleDragEnd, { passive: false });
    document.addEventListener("mouseup", handleDragEnd);
  };

  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    const event = "targetTouches" in e ? e.targetTouches[0] : e;

    // calculate moved pixels from bechmark related to viewport
    const movedX = event.pageX - state.benchmarkPageX;
    // calculate process pixels in slider range
    const processX = state.benchmarkProcessX + movedX;
    onChange(processX);
  };
  const handleDragEnd = () => {
    // optional but, let's reset benchmarks
    state.benchmarkPageX = 0;
    state.benchmarkProcessX = 0;

    // remove listeners
    document.removeEventListener("mousemove", handleDragMove);
    document.removeEventListener("touchmove", handleDragMove);
    document.removeEventListener("touchend", handleDragEnd);
    document.removeEventListener("mouseup", handleDragEnd);
  };
  return {
    startDrag: handleDragStart,
  };
};

export const useSliderLine = ({
  lineElementRef,
  onChange,
}: {
  lineElementRef: Ref<HTMLDivElement | null>;
  onChange: (
    processX: number,
    options: { event: MouseEvent | TouchEvent }
  ) => void;
}): {
  clickOnLine: (e: MouseEvent | TouchEvent) => void;
} => {
  const elPageX = (): number => {
    if (!lineElementRef.value) return 0;
    const rect = lineElementRef.value.getBoundingClientRect();
    const doc = document.documentElement as HTMLElement;
    const body = document.body as HTMLElement;
    // defensive with doc.scrollLeft for IE 9 compatible
    return (
      rect.left +
      (window.pageXOffset || doc.scrollLeft) -
      (doc.clientLeft || body.clientLeft || 0)
    );
  };
  const handleClickOnLine = (e: MouseEvent | TouchEvent) => {
    const event = "targetTouches" in e ? e.targetTouches[0] : e;
    const processX = event.pageX - elPageX();
    onChange(processX, { event: e });
  };

  return {
    clickOnLine: handleClickOnLine,
  };
};

export const useElementSize = (
  elementRef: Ref<HTMLDivElement | null>
): { width: Ref<number>; height: Ref<number> } => {
  const width = ref<number>(
    elementRef.value?.getBoundingClientRect().width || 0
  );
  const height = ref<number>(
    elementRef.value?.getBoundingClientRect().height || 0
  );
  let observer: ResizeObserver | null = null;

  const handleResize = ([entry]: ResizeObserverEntry[]) => {
    width.value = entry.contentRect.width;
    height.value = entry.contentRect.height;
  };

  const cleanup = () => {
    observer?.disconnect();
    observer = null;
  };

  const stopWatchElement = watch(
    () => elementRef.value,
    (element) => {
      cleanup();

      if (element) {
        observer = new ResizeObserver(handleResize);
        observer.observe(element);
      }
    },
    { immediate: true, flush: "post" }
  );
  onBeforeUnmount(() => {
    stopWatchElement();
    cleanup();
  });
  return {
    width,
    height,
  };
};
