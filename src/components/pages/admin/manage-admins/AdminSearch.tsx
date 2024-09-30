"use client";

import React from "react";
import { Input } from "@nextui-org/react";
import { MdSearch } from "react-icons/md";

interface AdminSearchProps {
  onSearch: (query: string) => void;
}

export default function AdminSearch({ onSearch }: AdminSearchProps) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <Input
      type="text"
      placeholder="Search by email"
      startContent={<MdSearch size={24} />}
      onChange={handleSearch}
      className="max-w-xs"
      radius="full"
    />
  );
}
