'use client';
import React from 'react';
import axios from 'axios';

const DeleteAuthor = ({ params }: { params: { id: string } }) => {
  console.log('id:', { params });

  const handleDelete = async () => {
    await axios.delete(`http://localhost:3000/book/${params.id}`);
    // @todo redirect to book
    // router.push('/book');
  };

  return (
    <div>
      <h1>Are you sure you want to delete this author?</h1>
      <button onClick={handleDelete}>Yes, Delete</button>
      <button onClick={() => router.push('/book')}>No, Cancel</button>
    </div>
  );
};

export default DeleteAuthor;
