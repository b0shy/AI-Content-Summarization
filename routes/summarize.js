const express = require('express');
const { summarizeText, summarizeUrl } = require('../controllers/summarizeController');
const { body } = require('express-validator');

const router = express.Router();

/**
 * @swagger
 * /summarize-text:
 *   post:
 *     summary: Summarize a block of plain text
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: Artificial Intelligence is transforming industries...
 *     responses:
 *       200:
 *         description: A summary of the provided text
 *       400:
 *         description: Invalid input
 */
router.post(
  '/summarize-text',
  body('text').isLength({ min: 30 }).withMessage('Text must be at least 30 characters long.'),
  summarizeText
);

/**
 * @swagger
 * /summarize-url:
 *   post:
 *     summary: Summarize the main text content of a web page
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 example: https://en.wikipedia.org/wiki/Artificial_intelligence
 *     responses:
 *       200:
 *         description: A summary of the fetched webpage content
 *       400:
 *         description: Invalid input
 */
router.post(
  '/summarize-url',
  body('url').isURL().withMessage('Valid URL is required.'),
  summarizeUrl
);

module.exports = router;
