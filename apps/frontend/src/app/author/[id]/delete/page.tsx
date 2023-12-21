'use client';

import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Corrected import path

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
const DeleteEntity = ({
  entity = "author",
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
      <h1 className="text-xl font-bold mb-4">
        Are you sure you want to delete this {entity.slice(0, -1)}?
      </h1>
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

export default DeleteEntity;
