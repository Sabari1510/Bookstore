
import { useState, useEffect } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { BookGrid } from '@/components/BookGrid';
import { BookModal } from '@/components/BookModal';
import { ShoppingCart } from '@/components/ShoppingCart';
import { fetchBooks, searchBooks } from '@/services/googleBooksApi';
import { ShoppingCart as CartIcon, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadFeaturedBooks();
  }, []);

  const loadFeaturedBooks = async () => {
    setLoading(true);
    try {
      const featuredBooks = await fetchBooks('bestsellers');
      setBooks(featuredBooks);
    } catch (error) {
      toast({
        title: "Error loading books",
        description: "Failed to load featured books. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      loadFeaturedBooks();
      return;
    }
    
    setLoading(true);
    setSearchQuery(query);
    try {
      const searchResults = await searchBooks(query);
      setBooks(searchResults);
    } catch (error) {
      toast({
        title: "Search failed",
        description: "Unable to search books. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (book) => {
    const isAlreadyInCart = cartItems.some(item => item.id === book.id);
    if (!isAlreadyInCart) {
      setCartItems([...cartItems, book]);
      toast({
        title: "Added to cart",
        description: `"${book.title}" has been added to your cart.`
      });
    } else {
      toast({
        title: "Already in cart",
        description: `"${book.title}" is already in your cart.`
      });
    }
  };

  const removeFromCart = (bookId) => {
    setCartItems(cartItems.filter(item => item.id !== bookId));
    toast({
      title: "Removed from cart",
      description: "Book has been removed from your cart."
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-slate-800">Reading Realm</h1>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCart(true)}
              className="relative"
            >
              <CartIcon className="h-4 w-4 mr-2" />
              Cart ({cartItems.length})
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">Discover Your Next Great Read</h2>
          <p className="text-xl mb-8 opacity-90">Explore millions of books from around the world</p>
          <div className="max-w-2xl mx-auto">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h3 className="text-3xl font-bold text-slate-800 mb-2">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Featured Books'}
          </h3>
          <p className="text-slate-600">
            {searchQuery ? `Found ${books.length} books` : 'Discover our handpicked selection'}
          </p>
        </div>

        <BookGrid
          books={books}
          loading={loading}
          onBookSelect={setSelectedBook}
          onAddToCart={addToCart}
        />
      </main>

      {/* Book Details Modal */}
      {selectedBook && (
        <BookModal
          book={selectedBook}
          isOpen={!!selectedBook}
          onClose={() => setSelectedBook(null)}
          onAddToCart={addToCart}
        />
      )}

      {/* Shopping Cart */}
      <ShoppingCart
        items={cartItems}
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        onRemoveItem={removeFromCart}
      />
    </div>
  );
};

export default Index;
