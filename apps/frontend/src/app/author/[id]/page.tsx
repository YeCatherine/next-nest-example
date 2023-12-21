'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Author = ({ params }: { params: { id: string } }) => {
  const [contentItem, setContentItem] = useState([]);
  const entity = 'author';
  useEffect(() => {
    const fetchAuthor = async () => {
      const result = await axios(
        `http://localhost:3000/${entity}/${params.id}`,
      );
      setContentItem(result.data);
    };

    fetchAuthor();
  }, [params.id]);

  return (
    <div>
      <h1>${entity}</h1>
      <h2>Fist Name : {contentItem.firstName}</h2>
      <h2> Last Name : {contentItem.lastName}</h2>
      {contentItem.createdAt}
      {contentItem.updatedAt}
    </div>
  );
};

export default Author;
