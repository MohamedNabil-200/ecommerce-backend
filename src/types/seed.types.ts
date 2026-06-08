export type DbJsonCategory = {
  id: number;
  title: string;
  prefix: string;
  img: string;
};

export type DbJsonProduct = {
  id: number;
  title: string;
  price: number;
  cat_prefix: string;
  img: string;
  max: number;
};

export type DbJsonData = {
  categories: DbJsonCategory[];
  products: DbJsonProduct[];
};

export type SeedCategory = {
  name: string;
  slug: string;
  imageUrl: string;
};

export type SeedProduct = {
  title: string;
  price: number;
  stock: number;
  imageUrl: string;
  categorySlug: string;
};
