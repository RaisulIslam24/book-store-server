import express from 'express';
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} from '../controllers/bookController';
import { bookValidationRules } from '../middlewares/validation';
import { validateRequest } from '../middlewares/errorHandler';

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", bookValidationRules, validateRequest, createBook);
router.put("/:id", bookValidationRules, validateRequest, updateBook);
router.delete("/:id", deleteBook);

export default router;
