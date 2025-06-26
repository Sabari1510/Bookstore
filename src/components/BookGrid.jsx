
import { BookCard } from './BookCard';
import { BookCardSkeleton } from './BookCardSkeleton';

export const BookGrid = ({ books, loading, onBookSelect, onAddToCart }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <BookCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-slate-600 mb-4">No books found</p>
        <p className="text-slate-500">Try searching with different keywords</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onSelect={() => onBookSelect(book)}
          onAddToCart={() => onAddToCart(book)}
        />
      ))}
    </div>
  );
};
