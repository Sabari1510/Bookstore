
import { Book } from '@/types/Book';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onSelect: () => void;
  onAddToCart: () => void;
}

export const BookCard = ({ book, onSelect, onAddToCart }: BookCardProps) => {
  const getPrice = () => {
    if (book.saleInfo?.retailPrice) {
      return `$${book.saleInfo.retailPrice.amount.toFixed(2)}`;
    }
    if (book.saleInfo?.listPrice) {
      return `$${book.saleInfo.listPrice.amount.toFixed(2)}`;
    }
    return '$9.99'; // Default price for demo
  };

  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border-slate-200">
      <CardContent className="p-4">
        <div className="aspect-[3/4] mb-4 overflow-hidden rounded-lg bg-slate-100">
          <img
            src={book.imageLinks?.thumbnail || '/placeholder.svg'}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onClick={onSelect}
          />
        </div>
        
        <div className="space-y-2">
          <h3 
            className="font-semibold text-slate-800 line-clamp-2 text-sm leading-tight hover:text-blue-600 transition-colors"
            onClick={onSelect}
          >
            {book.title}
          </h3>
          
          <p className="text-xs text-slate-600 line-clamp-1">
            {book.authors.join(', ')}
          </p>
          
          <div className="flex items-center justify-between pt-2">
            <span className="font-bold text-blue-600">{getPrice()}</span>
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
              className="h-8 w-8 p-0"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
