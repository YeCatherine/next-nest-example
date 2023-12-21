'use client';
import React, { useState, useEffect, useMemo, FC } from 'react';
import axios from 'axios';
import Link from 'next/link';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Capitalizes the first letter of the given string.
 * 
 * @param {string} string - The string to capitalize.
 * 
 * @returns {string} The capitalized string.
 */
function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

interface ContentItem {
  id: string;
  [key: string]: any;
}

interface ContentItemPageProps {
  entity?: string;
  titleFields?: string[];
}

/**
 * Renders the page for a specific type of content item.
 *
 * @param {ContentItemPageProps} props - The properties of the component.
 *
 * @returns {React.ReactElement} The React component.
 */
const ContentItemPage: FC<ContentItemPageProps> = ({ entity = 'author', titleFields = ['title'] }) => {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(`${API_BASE_URL}/${entity}`);
        setContentItems(result.data.data);
      } catch (err: any) { // Use AxiosError for more specific error handling
        setError(err.message);
      }
    };

    fetchData();
  }, [entity]);

  const contentItemTitle = useMemo(() => contentItems?.map((item) =>
    titleFields.map((field, index) => (
      <React.Fragment key={index}>
        {index > 0 ? ' ' : ''}
        {item[field]}
      </React.Fragment>
    )),
  ), [contentItems, titleFields]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ContentListTopBar entity={entity} />
      {error && <p className="text-red-500">Error loading content items: {error}</p>}
      <ContentListItems entity={entity} contentItems={contentItems} contentItemTitle={contentItemTitle} />
    </div>
  );
};

interface ContentListTopBarProps {
  entity: string;
}

/**
 * Displays the top bar of the content list.
 * 
 * @param {ContentListTopBarProps} props - The properties of the component.
 * 
 * @returns {React.ReactElement} The React component.
 */
const ContentListTopBar: FC<ContentListTopBarProps> = ({ entity }) => (
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
);

interface ContentListItemsProps {
  entity: string;
  contentItems: ContentItem[];
  contentItemTitle: React.ReactNode[];
}

/**
 * Lists the content items.
 * 
 * @param {ContentListItemsProps} props - The properties of the component.
 * 
 * @returns {React.ReactElement} The React component.
 */
const ContentListItems: FC<ContentListItemsProps> = ({ entity, contentItems=[], contentItemTitle }) => {
  console.log('test:',{contentItems})

  if (contentItems.length === 0) {
    return <p>No content items available.</p>;
  }

  return (
    <>
      {contentItems.map((contentItem) => (
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
            <Link href={`/${entity}/${contentItem.id}/delete`} className="p-2">
              🗑
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default ContentItemPage;
