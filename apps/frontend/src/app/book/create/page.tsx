'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const CreateAuthor = () => {
  const basefields = { firstName: '', lastName: '' };
  const [author, setAuthor] = useState(basefields);
  const entity = 'book';
  const router = useRouter();

  const handleChange = (e) => {
    setAuthor({ ...author, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:3000/${entity}`, author);
    router.push(`/${entity}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={author.firstName}
          onChange={handleChange}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={author.lastName}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Create "{entity}" content item</button>
    </form>
  );
};

export default CreateAuthor;
