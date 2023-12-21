'use client';
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Link from 'next/link';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const ContentItemPage = ({ entity = 'author', titleFields = ['title'] }) => {
  const [contentItems, setContentItems] = useState<Any[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log({ API_BASE_URL }, `${API_BASE_URL}/${entity}`);
        const result = await axios(`${API_BASE_URL}/${entity}`);
        console.log('result.data',result.data);
        setContentItems(result.data.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, [entity]);

  const contentItemTitle = useMemo(() => {
    if (contentItems.length === 0) {
      // Return an empty array or a placeholder value if contentItems is empty
      return [];
    }

    return contentItems.map((item) =>
      titleFields.map((field, index) => (
        <React.Fragment key={index}>
          {index > 0 ? ' ' : ''}
          {item[field]}
        </React.Fragment>
      ))
    );

  }, [contentItems, titleFields]);

  console.log('contentItems:', { contentItems });
if(contentItems.length === 0){
    return 'empty';
}
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="">
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {capitalizeFirstLetter(entity)}
          </h1>
          <Link
            href={`/${entity}/create`}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create new content item
          </Link>
        </div>
      </div>
      {error && <p>Error loading content items.</p>}
      {contentItems.length > 0 ? (
        contentItems.map((contentItem) => (
          <div
            key={contentItem.id}
            className="border-b py-2 flex flex-row justify-between"
          >
            <Link
              href={`/${entity}/${contentItem.id}`}
              className="text-blue-600 hover:text-blue-800 transition duration-300"
            >
              {contentItemTitle}
            </Link>
            <div className="flex flex-row">
              <Link href={`/${entity}/${contentItem.id}/edit`} className="p-2">
                ✏️
              </Link>
              <Link
                href={`/${entity}/${contentItem.id}/delete`}
                className="p-2"
              >
                🗑
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No content items available.</p>
      )}
    </div>
  );
};

export default ContentItemPage;
