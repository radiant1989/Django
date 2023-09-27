export type ID = string;
export type Asset = {
  url: string;
};

export type User = {
  id: ID;
  name: string;
};
export type Promo = {
  id: ID;
  channel: string;
  title: string;
  promoImage: Asset;
};
export type Provider = {
  id: ID;
  name: string;
  image: Asset;
  slug: string;
};
export type Module = {
  id: ID;
  title: string;
  slug: string;
  headerImage: Asset;
};
