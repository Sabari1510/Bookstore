
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-2xl mx-auto">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Search for books, authors, or ISBN..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="pl-4 pr-4 py-3 text-lg rounded-l-lg rounded-r-none border-r-0 focus:ring-2 focus:ring-white/50"
        />
      </div>
      <Button
        type="submit"
        size="lg"
        className="rounded-l-none rounded-r-lg px-6 bg-white text-blue-600 hover:bg-slate-50 border border-l-0"
      >
        <Search className="h-5 w-5" />
      </Button>
    </form>
  );
};
