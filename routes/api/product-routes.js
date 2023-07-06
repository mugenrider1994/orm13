const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// Get all products
router.get('/', (req, res) => {
  Product.findAll({
    include: [
      { model: Category },
      { model: Tag, through: ProductTag },
    ],
  })
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get a single product by id
router.get('/:id', (req, res) => {
  Product.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      { model: Category },
      { model: Tag, through: ProductTag },
    ],
  })
    .then((product) => {
      if (!product) {
        res.status(404).json({ message: 'No product found with this id' });
        return;
      }
      res.json(product);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a new product
router.post('/', (req, res) => {
  Product.create(req.body)
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tagId) => ({
          product_id: product.id,
          tag_id: tagId,
        }));
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(product);
    })
    .then((productTags) => res.status(200).json(productTags))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// Update a product
router.put('/:id', (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (!product[0]) {
        res.status(404).json({ message: 'No product found with this id' });
        return;
      }
      res.json(product);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete a product
router.delete('/:id', (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (!product) {
        res.status(404).json({ message: 'No product found with this id' });
        return;
      }
      res.json(product);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
