'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookContentItemPage = ({ params }: { params: { id: string } }) => {
  const [contentItem, setContentItem] = useState([]);
  const entity = 'book';

  useEffect(() => {
    const fetchBook = async () => {
      const result = await axios(
        `http://localhost:3000/${entity}/${params.id}`,
      );
      setContentItem(result.data);
    };

    fetchBook();
  }, [params.id]);

  return (
    <div>
      <h1>${entity}:</h1>
      <h2>title : {contentItem.title}</h2>
      {contentItem.createdAt}
      {contentItem.updatedAt}
    </div>
  );
};

export default Author;
