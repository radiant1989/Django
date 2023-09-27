import { WAITING_PLAY, FUN_PLAY, REAL_PLAY } from "~/constants";
import { Game, PlayType } from "~/types";

export const SOFTSWISS_GAME = Symbol() as InjectionKey<{
  game: Game;
  currentPlay: Ref<PlayType>;
  fullScreen: Ref<boolean>;
  theatreMode: Ref<boolean>;
  currency: Ref<string>;
}>;
