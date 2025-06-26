
export interface Book {
  id: string;
  title: string;
  authors: string[];
  description?: string;
  publishedDate?: string;
  publisher?: string;
  pageCount?: number;
  categories?: string[];
  imageLinks?: {
    thumbnail?: string;
    small?: string;
    medium?: string;
    large?: string;
  };
  infoLink?: string;
  previewLink?: string;
  price?: {
    amount: number;
    currencyCode: string;
  };
  saleInfo?: {
    saleability: string;
    listPrice?: {
      amount: number;
      currencyCode: string;
    };
    retailPrice?: {
      amount: number;
      currencyCode: string;
    };
  };
  averageRating?: number;
  ratingsCount?: number;
}
