
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, BookOpen } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export const BookModal = ({ book, isOpen, onClose, onAddToCart }) => {
  const getPrice = () => {
    if (book.saleInfo?.retailPrice) {
      return `$${book.saleInfo.retailPrice.amount.toFixed(2)}`;
    }
    if (book.saleInfo?.listPrice) {
      return `$${book.saleInfo.listPrice.amount.toFixed(2)}`;
    }
    return '$9.99';
  };

  const handleAddToCart = () => {
    onAddToCart(book);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800">
            {book.title}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[calc(90vh-8rem)]">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Book Cover */}
            <div className="flex justify-center">
              <img
                src={book.imageLinks?.large || book.imageLinks?.medium || book.imageLinks?.thumbnail || '/placeholder.svg'}
                alt={book.title}
                className="max-w-full h-auto max-h-96 rounded-lg shadow-lg"
              />
            </div>
            
            {/* Book Details */}
            <div className="space-y-6">
              <div>
                <p className="text-lg text-slate-600 mb-2">
                  by {book.authors.join(', ')}
                </p>
                {book.publisher && (
                  <p className="text-sm text-slate-500">
                    Published by {book.publisher}
                    {book.publishedDate && ` • ${book.publishedDate}`}
                  </p>
                )}
              </div>

              {book.categories && book.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {book.categories.slice(0, 3).map((category, index) => (
                    <Badge key={index} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
              )}

              {book.description && (
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <div 
                    className="text-sm text-slate-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ 
                      __html: book.description.length > 500 
                        ? book.description.substring(0, 500) + '...' 
                        : book.description 
                    }}
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 text-sm">
                {book.pageCount && (
                  <div>
                    <span className="font-medium">Pages:</span> {book.pageCount}
                  </div>
                )}
                {book.averageRating && (
                  <div>
                    <span className="font-medium">Rating:</span> {book.averageRating}/5
                    {book.ratingsCount && ` (${book.ratingsCount} reviews)`}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-2xl font-bold text-blue-600">
                  {getPrice()}
                </div>
                <div className="flex gap-2">
                  {book.previewLink && (
                    <Button
                      variant="outline"
                      onClick={() => window.open(book.previewLink, '_blank')}
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                  )}
                  <Button onClick={handleAddToCart}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
