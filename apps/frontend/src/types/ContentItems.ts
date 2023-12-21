/**
 * This file contains the types for the Author and Books content items.
 */
export type Author = {
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  books: Book[];
};

export type Book = {
  id: number;
  title: string;
  author: Author;
  pageCount: number;
  createdAt: Date;
  updatedAt: Date;
  releaseDate: Date;
};
