const conn = require('./conn');
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const LineItem = require('./LineItem');

Order.belongsTo(User);
LineItem.belongsTo(Order);
Order.hasMany(LineItem);
LineItem.belongsTo(Product);

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [moe, lucy, larry, foo, bar, bazz, ethyl] = await Promise.all([
    User.create({ username: 'moe', password: '123' }),
    User.create({ username: 'lucy', password: '123' }),
    User.create({ username: 'larry', password: '123' }),
    Product.create({
      name: 'Foo',
      category: 'Mugs',
      description: 'Awesome foo mug.',
      color: 'Red',
      price: 10.0,
    }),
    Product.create({
      name: 'Bar',
      category: 'T-shirts',
      description: 'Awesome bar t-shirt.',
      color: 'Blue',
      price: 20.0,
      sizeOptions: 'S,M,L,XL',
      gender: 'Unisex',
    }),
    Product.create({
      name: 'Bazz',
      category: 'Hats',
      description: 'Awesome bazz hat.',
      color: 'Green',
      price: 15.0,
      sizeOptions: 'One Size',
      gender: 'Unisex',
    }),
    User.create({ username: 'ethyl', password: '123', isAdmin: true }),
  ]);

  const cart = await ethyl.getCart();
  await ethyl.addToCart({ product: bazz, quantity: 3 });
  await ethyl.addToCart({ product: foo, quantity: 2 });
  return {
    users: {
      moe,
      lucy,
      larry,
    },
    products: {
      foo,
      bar,
      bazz,
    },
  };
};

module.exports = {
  syncAndSeed,
  User,
  Product,
};
