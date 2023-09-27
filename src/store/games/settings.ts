import { defineStore } from "pinia";
export const useGameSettingStore = defineStore("dice", () => {
  const hotkey = ref<boolean>(false);
  const animation = ref<boolean>(true);
  const audiovolume = ref<number>(50);
  const instantbet = ref<boolean>(false);
  const theatremode = ref<boolean>(false);
  const gameplayable = ref<Object>({});
  function toggleHotkey() {
    hotkey.value = !hotkey.value;
  }
  function toggleAnimation() {
    animation.value = !animation.value;
  }
  function setAudiovolume(value: number) {
    audiovolume.value = value;
  }
  function toggelInstantbet() {
    instantbet.value = !instantbet.value;
  }
  function toggleTheatreMode() {
    theatremode.value = !theatremode.value;
  }
  function setGamePlayeable(val: Object) {
    const key = Object.keys(val)[0];
    const value = Object.values(val)[0];
    gameplayable.value = { ...gameplayable.value, [key]: value };
  }
  return {
    hotkey,
    animation,
    audiovolume,
    instantbet,
    theatremode,
    gameplayable,
    toggleAnimation,
    toggleHotkey,
    setAudiovolume,
    toggelInstantbet,
    toggleTheatreMode,
    setGamePlayeable,
  };
});
