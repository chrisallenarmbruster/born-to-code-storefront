const conn = require('./conn');
const { STRING, BOOLEAN, UUID, UUIDV4, DATE, ENUM, BIGINT } = conn.Sequelize;

const Order = conn.define('order', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  isCart: {
    type: BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  userId: {
    type: UUID,
    allowNull: false,
  },
  orderDate: {
    type: DATE,
    required: false,
    allowNull: true,
  },
  status: {
    type: ENUM(
      'cart',
      'open',
      'shipped',
      'delivered',
      'fulfilled',
      'cancelled'
    ),
    allowNull: false,
    required: true,
    unique: false,
    defaultValue: 'cart',
  },
  shipToName: {
    type: STRING,
    required: false,
    unique: false,
  },
  shipToFirstName: {
    type: STRING,
    required: false,
    unique: false,
  },
  shipToLastName: {
    type: STRING,
    required: false,
    unique: false,
  },
  shipToAddress: {
    type: STRING,
    required: false,
    unique: false,
  },
  shipToCity: {
    type: STRING,
    required: false,
    unique: false,
  },
  shipToState: {
    type: STRING,
    required: false,
    unique: false,
  },
  shipToZip: {
    type: STRING,
    required: false,
    unique: false,
  },
  email: {
    type: STRING,
    required: false,
    unique: false,
  },
  shipDate: {
    type: DATE,
    required: false,
    unique: false,
  },
  paymentMethod: {
    type: STRING,
    required: false,
    unique: false,
  },
  transactionId: {
    type: STRING,
    required: false,
  },
  amount: {
    type: BIGINT,
    required: false,
  },
});

module.exports = Order;
