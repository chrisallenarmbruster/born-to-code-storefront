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
      name: 'Born to Code Mug',
      category: 'Mugs',
      description: 'Awesome foo mug.',
      color: 'Black',
      price: 10.0,
      imageUrl1: '/images/Mugs/Born_to_Code_Black_Mug.png',
    }),
    Product.create({
      name: 'Born to Code T-shirt',
      category: 'T-shirts',
      description: 'Awesome bar t-shirt.',
      color: 'Black',
      price: 20.0,
      sizeOptions: 'S,M,L,XL',
      gender: 'Unisex',
      imageUrl1: '/images/T-shirts/Born_to_Code_Black_T-shirt.png',
    }),
    Product.create({
      name: 'Born to Code Baseball Hat',
      category: 'Hats',
      description: 'Awesome bazz hat.',
      color: 'Black',
      price: 15.0,
      sizeOptions: 'One Size',
      gender: 'Unisex',
      imageUrl1: '/images/Hats/Born_to_Code_Black_Hat.png',
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
