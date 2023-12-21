'use client';
import React from 'react';

import EditAuthorForm from '@/components/forms/EditAuthorForm';

export default function EditAuthorPage({ params }: { params: { id: string } }) {
  return <EditAuthorForm params={params} entity={'author'} />;
}
