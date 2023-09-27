export type CategoryProducersBaseRow = {
  id: string;
  title: string;
  icon: string;
  enabled: boolean;
}
export type CategoryRow = CategoryProducersBaseRow & {
  type: "category";
  categorySlug: string;
};
export type ProducersRow = CategoryProducersBaseRow & {
  type: "producers";
};
export type ProducerRow = CategoryProducersBaseRow & {
  type: "producer";
  producerSlug: string;
};
