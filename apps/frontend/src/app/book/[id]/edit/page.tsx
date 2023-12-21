'use client';
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useRouter } from 'next/navigation';

const EditAuthor = ({
  entity = 'book',
  params,
}: {
  entity: string;
  params: { id?: string };
}) => {
  const [author, setAuthor] = useState({ firstName: '', lastName: '' });
  const router = useRouter();

  useEffect(() => {
    const fetchAuthor = async () => {
      const result = await axios(
        `http://localhost:3000/${entity}/${params.id}`,
      );
      setAuthor(result.data);
    };

    if (params.id) {
      fetchAuthor();
    }
  }, []);

  const handleChange = (e) => {
    setAuthor({ ...author, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (params.id) {
      await axios.patch(`http://localhost:3000/${entity}/${params.id}`, author);
    } else {
      await axios.post(`http://localhost:3000/${entity}`, author);
    }
    router.push(`/${entity}`);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Edit Author</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name:
            <input
              type="text"
              name="firstName"
              value={author.firstName ? author.firstName : ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-1"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name:
            <input
              type="text"
              name="lastName"
              value={author.lastName ? author.lastName : ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-1"
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-md text-sm px-4 py-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditAuthor;
