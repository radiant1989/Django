import { GameCategory, GameProducer } from "~/types";
import type { CategoryRow, ProducersRow, ProducerRow } from "../types";
import { Promo } from "~/cms-hygraph";

export const CASINO_HOME = Symbol() as InjectionKey<{
  producers: GameProducer[];
  promos: Promo[];
  gameCategories: Array<GameCategory>;
  categoryProducerRows: Ref<Array<CategoryRow | ProducersRow | ProducerRow>>;
  updateProducerEnabled: (producerSlug: string, enabled: boolean) => void;
  liveBetFeedEnabled: Ref<boolean>;
}>;
