const router = require('express').Router();
const { Category, Product } = require('../../models');

// Get all categories
router.get('/', (req, res) => {
  Category.findAll({
    include: [{ model: Product }],
  })
    .then((categories) => {
      res.json(categories);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get a single category by id
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [{ model: Product }],
  })
    .then((category) => {
      if (!category) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(category);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a new category
router.post('/', (req, res) => {
  Category.create(req.body)
    .then((category) => {
      res.json(category);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Update a category
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => {
      if (!category[0]) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(category);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete a category
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((category) => {
      if (!category) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(category);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
