// const { ENUM } = require('sequelize');
const conn = require('./conn');
const { UUID, UUIDV4, STRING, ENUM, DECIMAL, BOOLEAN, INTEGER } =
  conn.Sequelize;

const Product = conn.define('product', {
  id: {
    type: UUID,
    primaryKey: true,
    required: true,
    allowNull: false,
    unique: true,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
    required: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  category: {
    type: ENUM('Mug', 'T-Shirt', 'Hat'),
    allowNull: false,
    required: true,
    validate: { notEmpty: true },
  },
  description: {
    type: STRING(1000),
    allowNull: false,
    required: true,
    unique: false,
    validate: { notEmpty: true },
  },
  descriptionPlus: {
    type: STRING(1000),
    allowNull: true,
    required: false,
  },
  spec1: {
    type: STRING(1000),
    allowNull: true,
    required: false,
  },
  spec2: {
    type: STRING(1000),
    allowNull: true,
    required: false,
  },
  spec3: {
    type: STRING(1000),
    allowNull: true,
    required: false,
  },
  spec4: {
    type: STRING(1000),
    allowNull: true,
    required: false,
  },
  sizeOptions: {
    type: STRING,
    allowNull: true,
    required: false,
    unique: false,
  },
  color: {
    type: ENUM(
      'Red',
      'Blue',
      'Green',
      'Yellow',
      'Orange',
      'Purple',
      'Black',
      'White',
      'Grey',
      'Pink',
      'Brown',
      'Multi-Color'
    ),
    allowNull: true,
    required: false,
    unique: false,
  },
  gender: {
    type: ENUM('Mens', 'Womens', 'Unisex'),
    allowNull: true,
    required: false,
    unique: false,
  },
  imageUrl1: {
    type: STRING,
    defaultValue: '/images/sample_image.png',
  },
  price: {
    type: DECIMAL(9, 2),
    required: true,
  },
  salePrice: {
    type: DECIMAL(9, 2),
    required: false,
  },
  rating: {
    type: DECIMAL(2, 1),
  },
  reviewCount: {
    type: INTEGER,
    defaultValue: 0,
  },
  isFeatured: {
    type: BOOLEAN,
    defaultValue: false,
  },
  onSale: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Product;
