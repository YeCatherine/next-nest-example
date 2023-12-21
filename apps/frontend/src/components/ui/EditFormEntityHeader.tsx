import Link from 'next/link';
import React from 'react';

export const EditFormEntityHeader = ({
  params,
  entity = 'book',
}: {
  entity: string;
  params: { id?: string };
}) => {
  return (
    <h3 className="text-lg font-semibold mb-4">
      {params?.id ? 'Update' : 'Create'} &quot;{entity}&quot; content item |{' '}
      <Link href={`/${entity}`}>Back to {entity} list</Link>
    </h3>
  );
};
