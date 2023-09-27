import { onMounted, onUnmounted, ref } from "vue";

export const useOnClickOutside = (
  container = ref<HTMLDivElement | undefined>(undefined),
  callback = () => {}
) => {
  function handleClickOutside(event: MouseEvent) {
    if (container.value && !container.value.contains(event.target as Node)) {
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
