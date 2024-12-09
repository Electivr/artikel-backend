const express = require('express');
const { getArticles, createArticle, updateArticle, deleteArticle } = require('../controllers/articleController');

const router = express.Router();

// GET all articles
router.get('/', getArticles);

// POST new article
router.post('/', createArticle);

// PUT update an article
router.put('/:id', updateArticle);

// DELETE an article
router.delete('/:id', deleteArticle);

module.exports = router;
