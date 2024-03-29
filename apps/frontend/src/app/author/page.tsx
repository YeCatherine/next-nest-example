import React from 'react';
import ContentItemPage from '@/components/pages/ContentList';

export default function AuthorPage() {
  return (
    <ContentItemPage
      entity={'author'}
      titleFields={['firstName', 'lastName']}
    />
  );
}
