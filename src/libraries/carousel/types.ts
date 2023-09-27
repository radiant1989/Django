export type CarouselPropsWithoutBreakpoints = {
  itemsToShow?: number;
  itemsToScroll?: number;
  wrapAround?: boolean;
  snapAlign?: "center" | "start" | "end" | "center-odd" | "center-even";
  transition?: number;
  autoplay?: number;
  modelValue?: number;
  mouseDrag?: boolean;
  touchDrag?: boolean;
  pauseAutoplayOnHover?: boolean;
  dir?: "ltr" | "rtl";
};

export type CarouselProps = CarouselPropsWithoutBreakpoints & {
  breakpoints?: {
    [key in number]: CarouselPropsWithoutBreakpoints
  }
}
