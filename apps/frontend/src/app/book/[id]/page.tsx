'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const Author = ({ params }: { params: { id: string } }) => {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const fetchBook = async () => {
      const result = await axios(`http://localhost:3000/book/${params.id}`);
      setBook(result.data);
    };

    fetchBook();
  }, []);

  return (
    <div>
      <h1>Book:</h1>
      <h2>title : {book.title}</h2>
      {book.createdAt}
      {book.updatedAt}
    </div>
  );
};

export default Author;
