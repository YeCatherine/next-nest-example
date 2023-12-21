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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(`${API_BASE_URL}/${entity}?page=${currentPage}&limit=${itemsPerPage}`);
        setContentItems(result.data.data);
        setTotalPages(result.data.totalPages);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchData();
  }, [entity, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const contentItemTitle = (item: ContentItem): string => {
    return titleFields.map(field => item[field]).join(' ');
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ContentListTopBar entity={entity} />
      {error && <p className="text-red-500">Error loading content items: {error}</p>}
      <ContentListItems entity={entity} contentItems={contentItems} contentItemTitle={contentItemTitle} />
      <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
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
            {contentItemTitle(contentItem)}
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

const Paginator: FC<{ currentPage: number; totalPages: number; onPageChange: (page: number) => void }> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => (
  <div className="flex justify-between items-center my-4">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage <= 1}
      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
    >
      Previous
    </button>
    <span>
      Page {currentPage} of {totalPages}
    </span>
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage >= totalPages}
      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
    >
      Next
    </button>
  </div>
);