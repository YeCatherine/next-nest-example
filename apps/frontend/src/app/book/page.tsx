import React from 'react';
import ContentItemPage from '@/components/ContentList';

export default function BooksPage() {
  return <ContentItemPage entity={"book"} titleFields={["title"]} />;
}
