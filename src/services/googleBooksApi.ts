
import { Book } from '@/types/Book';

const API_KEY = 'AIzaSyCAmYoRoIUP3l7PGtqMhgER6TYGni92QSQ';
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

const transformBookData = (item: any): Book => {
  const volumeInfo = item.volumeInfo || {};
  const saleInfo = item.saleInfo || {};
  
  return {
    id: item.id,
    title: volumeInfo.title || 'Unknown Title',
    authors: volumeInfo.authors || ['Unknown Author'],
    description: volumeInfo.description || '',
    publishedDate: volumeInfo.publishedDate || '',
    publisher: volumeInfo.publisher || '',
    pageCount: volumeInfo.pageCount || 0,
    categories: volumeInfo.categories || [],
    imageLinks: {
      thumbnail: volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || '',
      small: volumeInfo.imageLinks?.small?.replace('http:', 'https:') || '',
      medium: volumeInfo.imageLinks?.medium?.replace('http:', 'https:') || '',
      large: volumeInfo.imageLinks?.large?.replace('http:', 'https:') || '',
    },
    infoLink: volumeInfo.infoLink || '',
    previewLink: volumeInfo.previewLink || '',
    averageRating: volumeInfo.averageRating || 0,
    ratingsCount: volumeInfo.ratingsCount || 0,
    saleInfo: {
      saleability: saleInfo.saleability || 'NOT_FOR_SALE',
      listPrice: saleInfo.listPrice || null,
      retailPrice: saleInfo.retailPrice || null,
    },
  };
};

export const searchBooks = async (query: string, maxResults: number = 20): Promise<Book[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}?q=${encodeURIComponent(query)}&key=${API_KEY}&maxResults=${maxResults}&printType=books`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.items) {
      return [];
    }
    
    return data.items.map(transformBookData);
  } catch (error) {
    console.error('Error searching books:', error);
    throw new Error('Failed to search books');
  }
};

export const fetchBooks = async (category: string = 'fiction', maxResults: number = 20): Promise<Book[]> => {
  return searchBooks(category, maxResults);
};

export const getBookById = async (id: string): Promise<Book | null> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}?key=${API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return transformBookData(data);
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    return null;
  }
};
