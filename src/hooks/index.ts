export { useBitcoin } from "./bitcoin";
export { useElementRect, useWindowSize } from "./element";
export * from "./user";
import { onMounted, onUnmounted } from "vue";
import { CONTAINER } from "~/constants";
export * from "./loading";

export const useTickCallback = (
  callback: () => void,
  tickInterval: number
): { tickCallback: () => void } => {
  let invokedAt = 0;

  const tickCallback = () => {
    const now = Date.now();
    if (now - invokedAt >= tickInterval) {
      callback();
      invokedAt = now;
    }
  };

  return {
    tickCallback,
  };
};

export const useDelayFalse = (state: false | any, timeout = 50) => {
  const delayedFalse = ref(state);
  let timeoutID: ReturnType<typeof setTimeout>;
  watch(
    () => state,
    (v) => {
      if (!v) {
        timeoutID = setTimeout(() => {
          delayedFalse.value = v;
        }, timeout);
      } else {
        !!timeoutID && clearTimeout(timeoutID);
        delayedFalse.value = state;
      }
    }
  );
  return delayedFalse;
};

export const useValueInContainer = <T>(
  values: { [key in number]: T }
): ComputedRef<T | false> => {
  const { containerScreen } = inject(CONTAINER)!;
  const valueEntries: [number, T][] = Object.entries(values).map((v) => [
    Number(v[0]),
    v[1],
  ]);
  valueEntries.sort((a, b) => -(a[0] - b[0]));
  return computed(() => {
    for (const [w, value] of valueEntries) {
      if (containerScreen.value.width >= w) {
        return value;
      }
    }
    return false;
  })
};

export const useOnClickOutside = (
  container = ref<null>(null),
  callback = () => {}
) => {
  function handleClickOutside(event: MouseEvent) {
    if (container.value && !container.value.contains(event.target)) {
      callback();
    }
  }

  onMounted(() => {
    document.addEventListener("mousedown", handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener("mousedown", handleClickOutside);
  });
};
