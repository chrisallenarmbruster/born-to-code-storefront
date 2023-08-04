const conn = require('./conn');
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const LineItem = require('./LineItem');
const Review = require('./Review');
const syncAndSeed = require('./seed');

Order.belongsTo(User);
LineItem.belongsTo(Order);
Order.hasMany(LineItem);
LineItem.belongsTo(Product);
Review.belongsTo(User);
Review.belongsTo(Product);
User.hasMany(Review);
Product.hasMany(Review);

module.exports = {
  syncAndSeed,
  User,
  Product,
  Review,
  Order,
};
