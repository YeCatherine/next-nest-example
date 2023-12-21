'use client';

import EditBookForm from '@/components/forms/EditBookForm';

export default function CreateBookPage({ params }: { params: { id: string } }) {
  return <EditBookForm params={params} entity="book" />;
}
