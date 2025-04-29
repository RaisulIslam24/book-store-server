import { Request, Response, NextFunction } from "express";
import db from "../db/knex";
import { Author } from "../types/author";

export const getAuthors = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authors = await db<Author>("authors");
    res.json(authors);
  } catch (err) {
    next(err);
  }
};

export const getAuthorById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
	const id = Number(req.params.id);

	const author = await db<Author>("authors").where({ id }).first();
	if (!author) {
	  res.status(404).json({ message: "Author not found" });
	  return;
	}
	res.json(author);
  } catch (err) {
	next(err);
  }
};  

export const createAuthor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [id] = await db<Author>("authors").insert(req.body);
    const newAuthor = await db<Author>("authors").where({ id }).first();
    res.status(201).json(newAuthor);
  } catch (err) {
    next(err);
  }
};

export const updateAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
	const id = Number(req.params.id);

	const updated = await db<Author>("authors")
	  .where({ id })
	  .update(req.body);

	if (!updated) {
	  res.status(404).json({ message: "Author not found" });
	  return;
	}

	const updatedAuthor = await db<Author>("authors")
	  .where({ id })
	  .first();

	res.json(updatedAuthor);
  } catch (err) {
	next(err);
  }
};  

export const deleteAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
	const id = Number(req.params.id);
	const deleted = await db("authors").where({ id }).del();

	if (!deleted) {
	  res.status(404).json({ message: "Author not found" });
	  return;
	}
	res.json({ message: "Author deleted" });
  } catch (err) {
	next(err);
  }
};