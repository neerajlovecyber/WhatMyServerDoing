import React from 'react';
import { Input } from "@/components/ui/input";

interface SearchProps {
  onChange: (query: string) => void;
}

export function Search({ onChange }: SearchProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <Input
        type="search"
        placeholder="Search..."
        className="md:w-[100px] lg:w-[300px]"
        onChange={handleChange}
      />
    </div>
  );
}
