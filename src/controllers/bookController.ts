import { Request, Response, NextFunction } from "express";
import db from "../db/knex";
import { Book } from "../types/book";

export const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
	const authorId = req.query.author;

	let query = db<Book>("books");

	if (authorId) {
	  query = query.where("author_id", Number(authorId));
	}

	const books = await query;
	res.json(books);
  } catch (err) {
	next(err);
  }
}

export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
	const id = Number(req.params.id);

    const book = await db<Book>("books").where({ id }).first();
    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.json(book);
  } catch (err) {
    next(err);
  }
};

export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [id] = await db<Book>("books").insert(req.body);
    const newBook = await db<Book>("books").where({ id }).first();
    res.status(201).json(newBook);
  } catch (err) {
    next(err);
  }
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
	const id = Number(req.params.id);

    const updated = await db<Book>("books").where({ id }).update(req.body);
    if (!updated) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    const updatedBook = await db<Book>("books").where({ id }).first();
    res.json(updatedBook);
  } catch (err) {
    next(err);
  }
};

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
	const id = Number(req.params.id);

    const deleted = await db<Book>("books").where({ id }).del();
    if (!deleted) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.json({ message: "Book deleted" });
  } catch (err) {
    next(err);
  }
};
