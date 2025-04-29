import { body } from "express-validator";

export const authorValidationRules = [
  body("name").isString().notEmpty(),
  body("birthdate").isISO8601().toDate()
];

export const bookValidationRules = [
  body("title").isString().notEmpty(),
  body("published_date").isISO8601().toDate(),
  body("author_id").isInt()
];
