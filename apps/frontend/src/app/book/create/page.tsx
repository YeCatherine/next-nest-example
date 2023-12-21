import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const CreateAuthor = () => {
  const [author, setAuthor] = useState({ firstName: '', lastName: '' });
  const router = useRouter();

  const handleChange = (e) => {
    setAuthor({ ...author, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3000/author', author);
    router.push('/author');
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
      <button type="submit">Create Author</button>
    </form>
  );
};

export default CreateAuthor;
