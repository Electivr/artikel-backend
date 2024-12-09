const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET: Fetch all articles
const getArticles = async (req, res) => {
  try {
    const articles = await prisma.story.findMany();
    res.status(200).json({
      error: false,
      message: 'Stories fetched successfully',
      listStory: articles,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: 'Failed to fetch stories',
    });
  }
};

// POST: Add a new article
const createArticle = async (req, res) => {
  const { name, description, photoUrl, lat, lon } = req.body;

  if (!name || !description || !photoUrl || !lat || !lon) {
    return res.status(400).json({
      error: true,
      message: 'All fields are required',
    });
  }

  try {
    const newArticle = await prisma.story.create({
      data: {
        name,
        description,
        photoUrl,
        lat: parseFloat(lat),
        lon: parseFloat(lon),
      },
    });

    res.status(201).json({
      error: false,
      message: 'Article created successfully',
      data: newArticle,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: 'Failed to create article',
    });
  }
};

// PUT: Update an article
const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { name, description, photoUrl, lat, lon } = req.body;

  if (!name || !description || !photoUrl || !lat || !lon) {
    return res.status(400).json({
      error: true,
      message: 'All fields are required',
    });
  }

  try {
    const updatedArticle = await prisma.story.update({
      where: { id },
      data: {
        name,
        description,
        photoUrl,
        lat: parseFloat(lat),
        lon: parseFloat(lon),
      },
    });

    res.status(200).json({
      error: false,
      message: 'Article updated successfully',
      data: updatedArticle,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: 'Failed to update article',
    });
  }
};

// DELETE: Delete an article
const deleteArticle = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.story.delete({
      where: { id },
    });

    res.status(200).json({
      error: false,
      message: 'Article deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: 'Failed to delete article',
    });
  }
};

module.exports = { getArticles, createArticle, updateArticle, deleteArticle };
