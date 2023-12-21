'use client';

import EditBookForm from '@/components/forms/EditBookForm';

export default function EditBookPage({ params }: { params: { id: string } }) {
  return <EditBookForm params={params} entity="book" />;
}
