'use client';
import React from 'react';
import { Input } from './input';
import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Search = () => {
  const router = useRouter();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const query = (form.query as HTMLInputElement).value.trim();
    if (!query) return;
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };
  return (
    <form
      onSubmit={handleSearch}
      action={'/search'}
      className="flex items-center sm: w-52 sm:w-full bg-primary rounded-lg overflow-hidden">
      <Input
        className="bg-secondary text-secondary-foreground h-[25px] sm:h-[35px]"
        name="query"
        type="text"
        placeholder="Search ..."
      />
      <button className=" h-full px-1">
        <SearchIcon className="hover:cursor-pointer text-background hover:text-foreground text-xm" />
      </button>
    </form>
  );
};

export default Search;
