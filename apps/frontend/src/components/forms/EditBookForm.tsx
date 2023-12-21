import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { EditFormEntityHeader } from '@/components/ui/EditFormEntityHeader';

const EditBookForm = ({
  entity = 'book',
  params,
}: {
  entity: string;
  params: { id?: string };
}) => {
  const [contentItem, setContentItem] = useState({
    firstName: '',
    lastName: '',
  });
  const [optionsList, setOptionsList] = useState<Any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAuthor = async () => {
      const result = await axios(`http://localhost:3000/author?page=1&limit=0`);

      setOptionsList(result.data.data);
    };

    const fetchBook = async () => {
      const result = await axios(
        `http://localhost:3000/${entity}/${params.id}`,
      );
      console.log('book:', result.data);
      setContentItem(result.data);
    };

    if (params.id) {
      fetchBook();
      fetchAuthor();
    }
  }, []);

  const handleChange = (e) => {
    setContentItem({ ...contentItem, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('contentItem', { contentItem });
    if (params.id) {
      await axios.patch(
        `http://localhost:3000/${entity}/${params.id}`,
        contentItem,
      );
    } else {
      await axios.post(`http://localhost:3000/${entity}`, contentItem);
    }
    router.push(`/${entity}`);
  };
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <EditFormEntityHeader entity={entity} params={params} />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title:
            <input
              type="title"
              name="title"
              value={contentItem.title ? contentItem.title : ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-1"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Author:
            <select
              name="author"
              value={contentItem.author ? contentItem.author : ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-1"
            >
              {optionsList.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.firstName} {option.lastName}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Page Count:
            <input
              type="text"
              name="pageCount"
              value={contentItem.pageCount ? contentItem.pageCount : ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-1"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Release Date:
            <input
              type="date"
              name="releaseDate"
              value={contentItem.releaseDate ? contentItem.releaseDate : ''}
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
export default EditBookForm;
