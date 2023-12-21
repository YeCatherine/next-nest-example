'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const Author = ({ params }: { params: { id: string } }) => {
  const [author, setAuthor] = useState([]);

  useEffect(() => {
    const fetchAuthor = async () => {
      const result = await axios(`http://localhost:3000/author/${params.id}`);
      setAuthor(result.data);
    };

    fetchAuthor();
  }, []);

  return (
    <div>
      <h1>Author</h1>
      <h2>Fist Name : {author.firstName}</h2>
      <h2> Last Name : {author.lastName}</h2>
      {author.createdAt}
      {author.updatedAt}
    </div>
  );
};

export default Author;
