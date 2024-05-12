export interface ProductForm {
  handle: string;
  title: string;
  description: string;
  sku: string;
  grams: number | null;
  stock: number | null;
  price: number | null;
  comparePrice: number | null;
  barcode: string;
}
export interface Product extends ProductForm {
  id: string;
}
