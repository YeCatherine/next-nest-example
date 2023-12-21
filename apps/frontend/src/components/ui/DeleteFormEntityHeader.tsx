import Link from 'next/link';
import React from 'react';

export const DeleteFormEntityHeader = ({
  entity = 'author',
}: {
  entity: string;
}) => {
  return (
    <h3 className="text-lg font-semibold mb-4">
      Delete "{entity}" content item |{' '}
      <Link href={`/${entity}`}>Back to {entity} list</Link>
    </h3>
  );
};
