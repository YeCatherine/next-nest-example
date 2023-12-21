import { useRouter } from 'next/navigation';
import axios from 'axios';
import React from 'react';
import { DeleteFormEntityHeader } from '@/components/ui/DeleteFormEntityHeader';

/**
 * Component for deleting a specified entity.
 *
 * @param {object} props - Component props.
 * @param {string} props.entity - The type of entity to delete (e.g., 'author').
 * @param {object} props.params - Parameters for the entity, includes 'id'.
 * @param {string} props.params.id - The ID of the entity to delete.
 *
 * @returns {JSX.Element} A component for deleting an entity.
 */
const DeleteEntityForm = ({
  entity = 'author',
  params,
}: {
  entity: string;
  params: { id: string };
}) => {
  const router = useRouter();

  const handleDelete = async () => {
    await axios.delete(`http://localhost:3000/${entity}/${params.id}`);
    router.push(`/${entity}`);
  };
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <DeleteFormEntityHeader entity={entity} />

      <div className="flex space-x-4">
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white font-semibold px-4 py-2 rounded hover:bg-red-600 transition duration-300"
        >
          Yes, Delete
        </button>
        <button
          onClick={() => router.push(`/${entity}`)}
          className="bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
        >
          No, Cancel
        </button>
      </div>
    </div>
  );
};
export default DeleteEntityForm;
