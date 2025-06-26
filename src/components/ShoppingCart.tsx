
import { Book } from '@/types/Book';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Trash2 } from 'lucide-react';

interface ShoppingCartProps {
  items: Book[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveItem: (bookId: string) => void;
}

export const ShoppingCart = ({ items, isOpen, onClose, onRemoveItem }: ShoppingCartProps) => {
  const getPrice = (book: Book) => {
    if (book.saleInfo?.retailPrice) {
      return book.saleInfo.retailPrice.amount;
    }
    if (book.saleInfo?.listPrice) {
      return book.saleInfo.listPrice.amount;
    }
    return 9.99;
  };

  const totalPrice = items.reduce((sum, book) => sum + getPrice(book), 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full max-w-md">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({items.length})</SheetTitle>
        </SheetHeader>
        
        {items.length === 0 ? (
          <div className="flex items-center justify-center h-96">
            <p className="text-slate-500">Your cart is empty</p>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 mt-6">
              <div className="space-y-4">
                {items.map((book) => (
                  <div key={book.id} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                    <img
                      src={book.imageLinks?.thumbnail || '/placeholder.svg'}
                      alt={book.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2">{book.title}</h4>
                      <p className="text-xs text-slate-600 line-clamp-1">
                        {book.authors.join(', ')}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-blue-600">
                          ${getPrice(book).toFixed(2)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveItem(book.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="mt-6 space-y-4">
              <Separator />
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
              </div>
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
