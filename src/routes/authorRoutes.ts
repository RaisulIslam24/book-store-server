import express from "express";
import {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "../controllers/authorController";
import { validateRequest } from "../middlewares/errorHandler";
import { authorValidationRules } from "../middlewares/validation";

const router = express.Router();

router.get("/", getAuthors);
router.get("/:id", getAuthorById);
router.post("/", authorValidationRules, validateRequest, createAuthor);
router.put("/:id", authorValidationRules, validateRequest, updateAuthor);
router.delete("/:id", deleteAuthor);

export default router;
