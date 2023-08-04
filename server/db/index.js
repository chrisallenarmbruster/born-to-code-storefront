const conn = require('./conn');
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const LineItem = require('./LineItem');
const Review = require('./Review');

Order.belongsTo(User);
LineItem.belongsTo(Order);
Order.hasMany(LineItem);
LineItem.belongsTo(Product);
Review.belongsTo(User);
Review.belongsTo(Product);
User.hasMany(Review);
Product.hasMany(Review);

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  Promise.all([
    Product.create({
      name: 'May the Source Be With You',
      category: 'Hats',
      description: 'Awesome foo hat',
      color: 'Black',
      price: 10.0,
      imageUrl1:
        '/images/Hats/May_the_Source_Be_With_You_Black_Baseball_Hat.png',
    }),
    Product.create({
      name: 'May the Source Be With You',
      category: 'Hats',
      description: 'Awesome foo hat',
      color: 'Black',
      price: 10.0,
      imageUrl1:
        '/images/Hats/May_the_Source_Be_With_You_Grey_Baseball_Hat.png',
    }),
    Product.create({
      name: 'Eat Sleep Code Repeat',
      category: 'Hats',
      description: 'Awesome foo hat',
      color: 'Grey',
      price: 10.0,
      imageUrl1: '/images/Hats/Eat_Sleep_Code_Repeat_Grey_Baseball_Hat.png',
    }),
    Product.create({
      name: 'Eat Sleep Code Repeat',
      category: 'Hats',
      description: 'Awesome foo hat',
      color: 'Black',
      price: 10.0,
      imageUrl1: '/images/Hats/Eat_Sleep_Code_Repeat_Black_Baseball_Hat.png',
    }),
    Product.create({
      name: 'Code Bugs',
      category: 'Hats',
      description: 'Awesome foo hat',
      color: 'Grey',
      price: 10.0,
      imageUrl1: '/images/Hats/Code_Bugs_Grey_Baseball_Hat.png',
    }),
    Product.create({
      name: 'Code Bugs',
      category: 'Hats',
      description: 'Awesome foo hat',
      color: 'Black',
      price: 10.0,
      imageUrl1: '/images/Hats/Code_Bugs_Black_Baseball_Hat.png',
    }),
    Product.create({
      name: 'Give Me a Br',
      category: 'Mugs',
      description: 'Awesome foo mug',
      color: 'Black',
      price: 10.0,
      imageUrl1: '/images/Mugs/Give_Me_a_Br_Black_Mug.png',
    }),
    Product.create({
      name: 'Give Me a Br',
      category: 'Mugs',
      description: 'Awesome foo mug',
      color: 'White',
      price: 10.0,
      imageUrl1: '/images/Mugs/Give_Me_a_Br_ White_Camper_Mug.png',
    }),
    Product.create({
      name: 'Eat Sleep Code Repeat',
      category: 'Mugs',
      description: 'Awesome foo mug',
      color: 'White',
      price: 10.0,
      imageUrl1: '/images/Mugs/Eat_Sleep_Code_Repeat_White_Camper_Mug.png',
    }),
    Product.create({
      name: 'Eat Sleep Code Repeat',
      category: 'Mugs',
      description: 'Awesome foo mug',
      color: 'Black',
      price: 10.0,
      imageUrl1: '/images/Mugs/Eat_Sleep_Code_Repeat_Black_Mug.png',
    }),
    Product.create({
      name: 'Code Bugs',
      category: 'Mugs',
      description: 'Awesome foo mug',
      color: 'White',
      price: 10.0,
      imageUrl1: '/images/Mugs/Code_Bugs_White_Camper_Mug.png',
    }),
    Product.create({
      name: 'Code Bugs',
      category: 'Mugs',
      description: 'Awesome foo mug',
      color: 'Black',
      price: 10.0,
      imageUrl1: '/images/Mugs/Code_Bugs_Black_Mug.png',
    }),
    Product.create({
      name: 'This is My Coding Shirt',
      category: 'T-shirts',
      description: 'Awesome bar t-shirt',
      color: 'White',
      price: 20.0,
      imageUrl1: '/images/T-shirts/This_is_My_Coding_Shirt_Purple_T-Shirt.png',
    }),
    Product.create({
      name: 'This is My Coding Shirt',
      category: 'T-shirts',
      description: 'Awesome bar t-shirt',
      color: 'Black',
      price: 20.0,
      imageUrl1: '/images/T-shirts/This_is_My_Coding_Shirt_Black_T-Shirt.png',
    }),
    Product.create({
      name: 'Eat Sleep Code',
      category: 'T-shirts',
      description: 'Awesome bar t-shirt',
      color: 'White',
      price: 20.0,
      imageUrl1: '/images/T-shirts/Eat_Sleep_Code_Repeat_White_T-Shirt.png',
    }),
    Product.create({
      name: 'Eat Sleep Code',
      category: 'T-shirts',
      description: 'Awesome bar t-shirt',
      color: 'Black',
      price: 20.0,
      imageUrl1: '/images/T-shirts/Eat_Sleep_Code_Repeat_Black_T-Shirt.png',
    }),
    Product.create({
      name: 'Bugs',
      category: 'T-shirts',
      description: 'Awesome bar t-shirt',
      color: 'Green',
      price: 20.0,
      imageUrl1: '/images/T-shirts/Bugs_Green_T-Shirt.png',
    }),
    Product.create({
      name: 'Bugs',
      category: 'T-shirts',
      description: 'Awesome bar t-shirt',
      color: 'Black',
      price: 20.0,
      imageUrl1: '/images/T-shirts/Bugs_Black_T-Shirt.png',
    }),
    Product.create({
      name: 'Born to Code T-shirt',
      category: 'T-shirts',
      description: 'Awesome bar t-shirt',
      color: 'Purple',
      price: 20.0,
      imageUrl1: '/images/T-shirts/Born_to_Code_Purple_T-Shirt.png',
    }),
    Product.create({
      name: 'Born to Code Mug',
      category: 'Mugs',
      description: 'Awesome foo mug.',
      color: 'White',
      price: 10.0,
      imageUrl1: '/images/Mugs/Born_to_Code_White_Camper_Mug.png',
    }),
    Product.create({
      name: 'Born to Code Baseball Hat',
      category: 'Hats',
      description: 'Awesome bazz hat',
      color: 'Grey',
      price: 15.0,
      imageUrl1: '/images/Hats/Born_to_Code_Grey_Hat.png',
    }),
  ]);
  const [joel, chris, michael, foo, bar, bazz, ethyl] = await Promise.all([
    User.create({ username: 'joel', password: '123', isAdmin: true }),
    User.create({ username: 'chris', password: '123', isAdmin: true }),
    User.create({ username: 'michael', password: '123', isAdmin: true }),
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
  await Review.create({ rating: 5, userId: ethyl.id, productId: foo.id });
  await Review.create({ rating: 4, userId: ethyl.id, productId: bar.id });
  await Review.create({ rating: 3, userId: ethyl.id, productId: bazz.id });
  return {
    users: {
      joel,
      chris,
      michael,
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
  Review,
};
