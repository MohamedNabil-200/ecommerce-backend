export type CreateProductInput = {
  title: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryId: number;
};

export type UpdateProductInput = {
  title?: string;
  price?: number;
  stock?: number;
  imageUrl?: string;
  categoryId?: number;
  isActive?: boolean;
};
