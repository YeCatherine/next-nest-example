import React from 'react';
import ContentItemPage from '@/components/pages/ContentList';

export default function BookPage() {
  return <ContentItemPage entity={'book'} titleFields={['title']} />;
}
