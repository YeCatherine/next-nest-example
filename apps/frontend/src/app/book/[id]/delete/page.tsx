'use client';

import DeleteEntityForm from "@/components/DeleteEntityForm";

export default function DeleteBook({ params }: { params: { id: string } }) {
  return <DeleteEntityForm params={params} entity="author" />;
}
