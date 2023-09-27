import { useElementRect } from "~/hooks";
import { Style } from "~/types";
import { collectScroller, getWin } from "~/utilities";
export type Placement =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "bottomLeft"
  | "bottomRight"
  | "topLeft"
  | "topRight";
type PlacementBase = "top" | "bottom" | "left" | "right";
export type PlacementProps = {
  placement?: Placement;
  trigger?: "hover" | "click" | boolean;
  arrow?: boolean;
  border?: boolean;
  gap?: string;
  modelValue?: boolean;
  transition?: {
    "enter-active-class": string;
    "enter-from-class": string;
    "enter-to-class": string;
    "leave-active-class": string;
    "leave-from-class": string;
    "leave-to-class": string;
  };
  leftDeviation?: string;
  topDeviation?: string;
  zIndex?: number;
};

type PlacementReturn = {
  style: Ref<Style>;
  arrowStyle: Ref<Style>;
  arrowClass: ComputedRef<string>;
  getRect: () => DOMRect;
  getStyle: () => Style;
  getArrowStyle: () => Style;
};
type PlacementOptions = {
  placement: Placement;
  gap?: string;
  arrowRounding?: number;
  enabled?: boolean; // TODO: this is deprecated, should remove in next stage
};
const placementBaseMap: { [key in Placement]: PlacementBase } = {
  top: "top",
  left: "left",
  right: "right",
  bottom: "bottom",
  bottomLeft: "bottom",
  bottomRight: "bottom",
  topLeft: "top",
  topRight: "top",
};

export const usePlacement = (
  targetElement: Ref<HTMLDivElement | null>,
  popupElement: Ref<HTMLDivElement | null>,
  options: ComputedRef<PlacementOptions>
): PlacementReturn => {
  const style = ref<Style>({});
  const arrowStyle = ref<Style>({});
  const {
    width: popupWidth,
    height: popupHeight,
    ready: popupReady,
  } = useElementRect(popupElement);
  const state = reactive({
    placement: options.value.placement,
  });
  // conventional values which are reactive
  const v = {
    get placement() {
      return state.placement;
    },
    get gap() {
      return options.value.gap || "15px";
    },
    get gapPx() {
      return parseInt(v.gap); // Note: this will work only when gap is pixels
    },
    get arrowRounding() {
      return options.value.arrowRounding || 2;
    },
    get enabled() {
      return options.value.enabled;
    },
    get popupWidth() {
      return popupWidth.value;
    },
    get popupHeight() {
      return popupHeight.value;
    },
    get popupReady() {
      return popupReady.value;
    },
  };

  const arrowClassMap = {
    top: "-translate-y-1/2 -translate-x-1/2",
    bottom: "-translate-x-1/2 -translate-y-1/2",
    left: "-translate-y-1/2 -translate-x-1/2",
    right: "-translate-y-1/2 -translate-x-1/2",
    bottomLeft: "-translate-x-1/2 -translate-y-1/2",
    bottomRight: "-translate-x-1/2 -translate-y-1/2",
    topLeft: "-translate-y-1/2 -translate-x-1/2",
    topRight: "-translate-y-1/2 -translate-x-1/2",
  };
  const arrowClass = computed(() => arrowClassMap[v.placement]);

  const getPlacementVisible = (): { [key in PlacementBase]: number } => {
    const { innerWidth: winWidth, innerHeight: winHeight } = window;
    const { top, left, right, bottom } =
      targetElement.value!.getBoundingClientRect();
    return {
      top: Math.min(top / v.popupHeight, 1),
      bottom: Math.min((winHeight - bottom) / v.popupHeight, 1),
      left: Math.min(left / v.popupWidth, 1),
      right: Math.min((winWidth - right) / v.popupWidth, 1),
    };
  };
  const getPlacement = (): Placement => {
    const flipPlacementMap: {
      [key in Placement]: Placement;
    } = {
      top: "bottom",
      left: "right",
      right: "left",
      bottom: "top",
      bottomLeft: "topLeft",
      bottomRight: "topRight",
      topLeft: "bottomLeft",
      topRight: "bottomRight",
    };
    const placement = options.value.placement;
    const placementBase = placementBaseMap[placement];
    const placementFlipped = flipPlacementMap[placement];
    const flippedBase = placementBaseMap[placementFlipped];
    const placementVisible = getPlacementVisible();
    if (placementVisible[placementBase] < placementVisible[flippedBase]) {
      return placementFlipped;
    }
    return placement;
  };
  const getRect = (): DOMRect => {
    const boundingRect = targetElement.value?.getBoundingClientRect()!;
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    return {
      ...boundingRect.toJSON(),
      top: boundingRect.top + scrollY,
      bottom: boundingRect.bottom + scrollY,
      left: boundingRect.left + scrollX,
      right: boundingRect.right + scrollX,
    };
  };
  const minMax = (v: number, min: number, max: number): number =>
    Math.min(Math.max(v, min), max);
  const getStyleBase = () => {
    const placementBase = placementBaseMap[v.placement];
    const styleBaseMap = {
      top: {
        paddingBottom: v.gap,
      },
      bottom: {
        paddingTop: v.gap,
      },
      left: {
        paddingRight: v.gap,
      },
      right: {
        paddingLeft: v.gap,
      },
    };
    return styleBaseMap[placementBase];
  };
  const getStyle = () => {
    const {
      innerWidth: winWidth,
      innerHeight: winHeight,
      scrollX,
      scrollY,
    } = window;
    const { top, bottom, left, right, width, height } = getRect();
    const GAP = 7;
    const leftMin = Math.min(0 + scrollX + GAP, left);
    const leftMax = Math.max(
      winWidth + scrollX - v.popupWidth - GAP,
      right - v.popupWidth
    );
    const topMin = Math.min(0 + scrollY + GAP, top);
    const topMax = Math.max(
      winHeight - v.popupHeight + scrollY - GAP,
      bottom - v.popupHeight
    );
    const styleMap = {
      top: {
        top: `${top - v.popupHeight}px`,
        left: `${minMax(
          left + width / 2 - v.popupWidth / 2,
          leftMin,
          leftMax
        )}px`,
      },
      bottom: {
        top: `${bottom}px`,
        left: `${minMax(
          left + width / 2 - v.popupWidth / 2,
          leftMin,
          leftMax
        )}px`,
      },
      left: {
        top: `${minMax(
          top + height / 2 - v.popupHeight / 2,
          topMin,
          topMax
        )}px`,
        left: `${left - v.popupWidth}px`,
      },
      right: {
        top: `${minMax(
          top + height / 2 - v.popupHeight / 2,
          topMin,
          topMax
        )}px`,
        left: `${right}px`,
      },
      bottomLeft: {
        top: `${bottom}px`,
        left: `${minMax(left, leftMin, leftMax)}px`,
      },
      bottomRight: {
        top: `${bottom}px`,
        left: `${minMax(right - v.popupWidth, leftMin, leftMax)}px`,
      },
      topLeft: {
        top: `${top - v.popupHeight}px`,
        left: `${minMax(left, leftMin, leftMax)}px`,
      },
      topRight: {
        top: `${top - v.popupHeight}px`,
        left: `${minMax(right - v.popupWidth, leftMin, leftMax)}px`,
      },
    };
    return styleMap[v.placement];
  };
  const getArrowStyle = () => {
    const { top, bottom, left, right, width, height } = getRect();
    const styleMap = {
      top: {
        top: `${top - v.arrowRounding}px`,
        left: `${left + width / 2}px`,
        transform: `translateY(-${v.gap})`,
      },
      bottom: {
        top: `${bottom + v.arrowRounding}px`,
        left: `${left + width / 2}px`,
        paddingTop: v.gap,
      },
      left: {
        top: `${top + height / 2}px`,
        left: `${left - v.arrowRounding}px`,
        transform: `translateX(-${v.gap})`,
      },
      right: {
        top: `${top + height / 2}px`,
        left: `${right + v.arrowRounding}px`,
        paddingLeft: v.gap,
      },
      bottomLeft: {
        top: `${bottom + v.arrowRounding}px`,
        left: `${left + width / 2}px`,
        paddingTop: v.gap,
      },
      bottomRight: {
        top: `${bottom + v.arrowRounding}px`,
        left: `${left + width / 2}px`,
        paddingTop: v.gap,
      },
      topLeft: {
        top: `${top - v.arrowRounding}px`,
        left: `${left + width / 2}px`,
        transform: `translateY(-${v.gap})`,
      },
      topRight: {
        top: `${top - v.arrowRounding}px`,
        left: `${left + width / 2}px`,
        transform: `translateY(-${v.gap})`,
      },
    };
    return styleMap[v.placement];
  };

  const updateStyles = () => {
    state.placement = getPlacement();
    style.value = { ...getStyleBase(), ...getStyle() };
    arrowStyle.value = getArrowStyle();
  };

  const getScrollers = () => {
    const targetScrollList = targetElement.value
      ? collectScroller(targetElement.value)
      : [];
    const popupScrollList = popupElement.value
      ? collectScroller(popupElement.value)
      : [];
    const win = popupElement.value ? getWin(popupElement.value) : window;
    return {
      mergedList: [win, ...targetScrollList, ...popupScrollList],
      win,
    };
  };

  const enable = () => {
    updateStyles();
    const { mergedList, win } = getScrollers();
    mergedList.forEach((scroller) => {
      scroller!.addEventListener("scroll", updateStyles, { passive: true });
    });
    win!.addEventListener("resize", updateStyles, { passive: true });
  };
  const disable = () => {
    const { mergedList, win } = getScrollers();
    mergedList.forEach((scroller) => {
      scroller!.removeEventListener("scroll", updateStyles);
    });
    win!.removeEventListener("resize", updateStyles);
  };

  watch(
    () => v.popupReady,
    (popupReady) => {
      if (popupReady) {
        enable();
      } else {
        disable();
      }
    }
  );
  onMounted(() => {
    style.value = getStyleBase();
  });
  onBeforeUnmount(() => {
    disable();
  });

  return {
    style,
    arrowStyle,
    arrowClass,
    getRect,
    getStyle,
    getArrowStyle,
  };
};
