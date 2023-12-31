const conn = require('./conn');
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const LineItem = require('./LineItem');
const Review = require('./Review');
const { faker } = require('@faker-js/faker');

function fakeUser() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({
    firstName: firstName.toLocaleLowerCase(),
    lastName: lastName.toLocaleLowerCase(),
  });
  return {
    username: email,
    fullname: `${firstName} ${lastName}`,
    email: email,
    password: '123',
    address: faker.location.streetAddress(false),
    city: faker.location.city(),
    state: faker.location.state(),
    country: 'USA',
    zip: faker.location.zipCode(),
  };
}

//add random method to array prototype
Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

productData = [
  {
    name: 'May the Source Be With You Hat',
    category: 'hats',
    description: faker.lorem.paragraphs(1),
    descriptionPlus: faker.lorem.paragraphs(1),
    spec1: faker.lorem.lines(1),
    spec2: faker.lorem.lines(1),
    spec3: faker.lorem.lines(1),
    spec4: faker.lorem.lines(1),
    color: 'Black',
    price: 10.0,
    imageUrl1: '/images/Hats/May_the_Source_Be_With_You_Black_Baseball_Hat.png',
  },
  {
    name: 'May the Source Be With You Hat',
    category: 'hats',
    description: faker.lorem.paragraphs(1),
    descriptionPlus: faker.lorem.paragraphs(1),
    spec1: faker.lorem.lines(1),
    spec2: faker.lorem.lines(1),
    spec3: faker.lorem.lines(1),
    spec4: faker.lorem.lines(1),
    color: 'Grey',
    price: 10.0,
    imageUrl1: '/images/Hats/May_the_Source_Be_With_You_Grey_Baseball_Hat.png',
  },
  {
    name: 'Eat Sleep Code Repeat Hat',
    category: 'hats',
    description: faker.lorem.paragraphs(1),
    descriptionPlus: faker.lorem.paragraphs(1),
    spec1: faker.lorem.lines(1),
    spec2: faker.lorem.lines(1),
    spec3: faker.lorem.lines(1),
    spec4: faker.lorem.lines(1),
    color: 'Grey',
    price: 10.0,
    imageUrl1: '/images/Hats/Eat_Sleep_Code_Repeat_Grey_Baseball_Hat.png',
  },
  {
    name: 'Eat Sleep Code Repeat Hat',
    category: 'hats',
    description: faker.lorem.paragraphs(1),
    descriptionPlus: faker.lorem.paragraphs(1),
    spec1: faker.lorem.lines(1),
    spec2: faker.lorem.lines(1),
    spec3: faker.lorem.lines(1),
    spec4: faker.lorem.lines(1),
    color: 'Black',
    price: 10.0,
    imageUrl1: '/images/Hats/Eat_Sleep_Code_Repeat_Black_Baseball_Hat.png',
    isFeatured: true,
  },
  {
    name: 'Code Bugs Hat',
    category: 'hats',
    description: faker.lorem.paragraphs(1),
    descriptionPlus: faker.lorem.paragraphs(1),
    spec1: faker.lorem.lines(1),
    spec2: faker.lorem.lines(1),
    spec3: faker.lorem.lines(1),
    spec4: faker.lorem.lines(1),
    color: 'Grey',
    price: 10.0,
    imageUrl1: '/images/Hats/Code_Bugs_Grey_Baseball_Hat.png',
  },
  {
    name: 'Code Bugs Hat',
    category: 'hats',
    description: faker.lorem.paragraphs(1),
    descriptionPlus: faker.lorem.paragraphs(1),
    spec1: faker.lorem.lines(1),
    spec2: faker.lorem.lines(1),
    spec3: faker.lorem.lines(1),
    spec4: faker.lorem.lines(1),
    color: 'Black',
    price: 10.0,
    imageUrl1: '/images/Hats/Code_Bugs_Black_Baseball_Hat.png',
  },
  {
    name: 'Give Me a </br> Mug',
    category: 'mugs',
    description: faker.lorem.paragraphs(1),
    descriptionPlus: faker.lorem.paragraphs(1),
    spec1: faker.lorem.lines(1),
    spec2: faker.lorem.lines(1),
    spec3: faker.lorem.lines(1),
    spec4: faker.lorem.lines(1),
    color: 'Black',
    price: 10.0,
    imageUrl1: '/images/Mugs/Give_Me_a_Br_Black_Mug.png',
  },
  {
    name: 'Give Me a </br> Mug',
    category: 'mugs',
    description: faker.lorem.paragraphs(1),
    descriptionPlus: faker.lorem.paragraphs(1),
    spec1: faker.lorem.lines(1),
    spec2: faker.lorem.lines(1),
    spec3: faker.lorem.lines(1),
    spec4: faker.lorem.lines(1),
    color: 'White',
    price: 10.0,
    imageUrl1: '/images/Mugs/Give_Me_a_Br_ White_Camper_Mug.png',
    isFeatured: true,
  },
  {
    name: 'Eat Sleep Code Repeat Mug',
    category: 'mugs',
    description: faker.lorem.paragraphs(1),
    descriptionPlus: faker.lorem.paragraphs(1),
    spec1: faker.lorem.lines(1),
    spec2: faker.lorem.lines(1),
    spec3: faker.lorem.lines(1),
    spec4: faker.lorem.lines(1),
    color: 'White',
    price: 10.0,
    imageUrl1: '/images/Mugs/Eat_Sleep_Code_Repeat_White_Camper_Mug.png',
  },
  {
    name: 'Eat Sleep Code Repeat Mug',
    category: 'mugs',
    description: faker.lorem.paragraphs(1),
    descriptionPlus: faker.lorem.paragraphs(1),
    spec1: faker.lorem.lines(1),
    spec2: faker.lorem.lines(1),
    spec3: faker.lorem.lines(1),
    spec4: faker.lorem.lines(1),
    color: 'Black',
    price: 10.0,
    imageUrl1: '/images/Mugs/Eat_Sleep_Code_Repeat_Black_Mug.png',
  },
  {
    name: 'Code Bugs Mug',
    category: 'mugs',
    description: faker.lorem.paragraphs(1),
    descriptionPlus: faker.lorem.paragraphs(1),
    spec1: faker.lorem.lines(1),
    spec2: faker.lorem.lines(1),
    spec3: faker.lorem.lines(1),
    spec4: faker.lorem.lines(1),
    color: 'White',
    price: 10.0,
    imageUrl1: '/images/Mugs/Code_Bugs_White_Camper_Mug.png',
  },
  {
    name: 'Code Bugs Mug',
    category: 'mugs',
    description: faker.lorem.paragraphs(1),
    descriptionPlus: faker.lorem.paragraphs(1),
    spec1: faker.lorem.lines(1),
    spec2: faker.lorem.lines(1),
    spec3: faker.lorem.lines(1),
    spec4: faker.lorem.lines(1),
    color: 'Black',
    price: 10.0,
    imageUrl1: '/images/Mugs/Code_Bugs_Black_Mug.png',
  },
  {
    name: 'This is My Coding Shirt T-Shirt',
    category: 'shirts',
    description: faker.lorem.paragraphs(1),
    descriptionPlus: faker.lorem.paragraphs(1),
    spec1: faker.lorem.lines(1),
    spec2: faker.lorem.lines(1),
    spec3: faker.lorem.lines(1),
    spec4: faker.lorem.lines(1),
    color: 'Purple',
    sizeOptions: 'S,M,L,XL',
    price: 20.0,
    imageUrl1: '/images/T-shirts/This_is_My_Coding_Shirt_Purple_T-Shirt.png',
  },
  {
    name: 'This is My Coding Shirt T-Shirt',
    category: 'shirts',
    description: faker.lorem.paragraphs(1),
    descriptionPlus: faker.lorem.paragraphs(1),
    spec1: faker.lorem.lines(1),
    spec2: faker.lorem.lines(1),
    spec3: faker.lorem.lines(1),
    spec4: faker.lorem.lines(1),
    color: 'Black',
    sizeOptions: 'S,M,L,XL',
    price: 20.0,
    imageUrl1: '/images/T-shirts/This_is_My_Coding_Shirt_Black_T-Shirt.png',
  },
  {
    name: 'Eat Sleep Code T-Shirt',
    category: 'shirts',
    description: faker.lorem.paragraphs(1),
    descriptionPlus: faker.lorem.paragraphs(1),
    spec1: faker.lorem.lines(1),
    spec2: faker.lorem.lines(1),
    spec3: faker.lorem.lines(1),
    spec4: faker.lorem.lines(1),
    color: 'White',
    sizeOptions: 'S,M,L,XL',
    price: 20.0,
    imageUrl1: '/images/T-shirts/Eat_Sleep_Code_Repeat_White_T-Shirt.png',
  },
  {
    name: 'Eat Sleep Code T-Shirt',
    category: 'shirts',
    description: faker.lorem.paragraphs(1),
    descriptionPlus: faker.lorem.paragraphs(1),
    spec1: faker.lorem.lines(1),
    spec2: faker.lorem.lines(1),
    spec3: faker.lorem.lines(1),
    spec4: faker.lorem.lines(1),
    sizeOptions: 'S,M,L,XL',
    color: 'Black',
    price: 20.0,
    imageUrl1: '/images/T-shirts/Eat_Sleep_Code_Repeat_Black_T-Shirt.png',
  },
  {
    name: 'Bugs T-Shirt',
    category: 'shirts',
    description: faker.lorem.paragraphs(1),
    descriptionPlus: faker.lorem.paragraphs(1),
    spec1: faker.lorem.lines(1),
    spec2: faker.lorem.lines(1),
    spec3: faker.lorem.lines(1),
    spec4: faker.lorem.lines(1),
    sizeOptions: 'S,M,L,XL',
    color: 'Green',
    price: 20.0,
    imageUrl1: '/images/T-shirts/Bugs_Green_T-Shirt.png',
    isFeatured: true,
  },
  {
    name: 'Bugs T-Shirt',
    category: 'shirts',
    description: faker.lorem.paragraphs(1),
    descriptionPlus: faker.lorem.paragraphs(1),
    spec1: faker.lorem.lines(1),
    spec2: faker.lorem.lines(1),
    spec3: faker.lorem.lines(1),
    spec4: faker.lorem.lines(1),
    sizeOptions: 'S,M,L,XL',
    color: 'Black',
    price: 20.0,
    imageUrl1: '/images/T-shirts/Bugs_Black_T-Shirt.png',
  },
  {
    name: 'Born to Code T-Shirt',
    category: 'shirts',
    description: faker.lorem.paragraphs(1),
    descriptionPlus: faker.lorem.paragraphs(1),
    spec1: faker.lorem.lines(1),
    spec2: faker.lorem.lines(1),
    spec3: faker.lorem.lines(1),
    spec4: faker.lorem.lines(1),
    sizeOptions: 'S,M,L,XL',
    color: 'Purple',
    price: 20.0,
    imageUrl1: '/images/T-shirts/Born_to_Code_Purple_T-Shirt.png',
    isFeatured: true,
  },
  {
    name: 'Born to Code Mug',
    category: 'mugs',
    description: faker.lorem.paragraphs(1),
    descriptionPlus: faker.lorem.paragraphs(1),
    spec1: faker.lorem.lines(1),
    spec2: faker.lorem.lines(1),
    spec3: faker.lorem.lines(1),
    spec4: faker.lorem.lines(1),
    color: 'White',
    price: 10.0,
    imageUrl1: '/images/Mugs/Born_to_Code_White_Camper_Mug.png',
  },
  {
    name: 'Born to Code Baseball Hat',
    category: 'hats',
    description: faker.lorem.paragraphs(1),
    descriptionPlus: faker.lorem.paragraphs(1),
    spec1: faker.lorem.lines(1),
    spec2: faker.lorem.lines(1),
    spec3: faker.lorem.lines(1),
    spec4: faker.lorem.lines(1),
    color: 'Grey',
    price: 15.0,
    imageUrl1: '/images/Hats/Born_to_Code_Grey_Baseball_Hat.png',
  },
  {
    name: 'Born to Code Mug',
    category: 'mugs',
    description: faker.lorem.paragraphs(1),
    descriptionPlus: faker.lorem.paragraphs(1),
    spec1: faker.lorem.lines(1),
    spec2: faker.lorem.lines(1),
    spec3: faker.lorem.lines(1),
    spec4: faker.lorem.lines(1),
    color: 'Black',
    price: 10.0,
    imageUrl1: '/images/Mugs/Born_to_Code_Black_Mug.png',
  },
  {
    name: 'Born to Code T-Shirt',
    category: 'shirts',
    description: faker.lorem.paragraphs(1),
    descriptionPlus: faker.lorem.paragraphs(1),
    spec1: faker.lorem.lines(1),
    spec2: faker.lorem.lines(1),
    spec3: faker.lorem.lines(1),
    spec4: faker.lorem.lines(1),
    color: 'Black',
    price: 20.0,
    sizeOptions: 'S,M,L,XL',
    gender: 'Unisex',
    imageUrl1: '/images/T-shirts/Born_to_Code_Black_T-shirt.png',
  },
  {
    name: 'Born to Code Baseball Hat',
    category: 'hats',
    description: faker.lorem.paragraphs(1),
    descriptionPlus: faker.lorem.paragraphs(1),
    spec1: faker.lorem.lines(1),
    spec2: faker.lorem.lines(1),
    spec3: faker.lorem.lines(1),
    spec4: faker.lorem.lines(1),
    color: 'Black',
    price: 15.0,
    gender: 'Unisex',
    imageUrl1: '/images/Hats/Born_to_Code_Black_Baseball_Hat.png',
    isFeatured: true,
  },
];

const syncAndSeed = async () => {
  await conn.sync({ force: true });

  //create products
  const products = await Promise.all(
    productData.map((product) => Product.create(product))
  );

  //create 100 fake users
  const users = await Promise.all(
    Array(100)
      .fill(0)
      .map(() => User.create(fakeUser()))
  );

  //create 10 reviews for every product
  await Promise.all(
    products.map((product) => {
      return Promise.all(
        Array(10)
          .fill(0)
          .map(() => {
            return Review.create({
              rating: Math.floor(Math.random() * 5) + 1,
              userId: users.random().id,
              productId: product.id,
            });
          })
      );
    })
  );

  //create special users
  const [joel, chris, michael, ethyl, tim] = await Promise.all([
    User.create({
      username: 'jejanov@mac.com',
      email: 'jejanov@mac.com',
      firstName: 'Joel',
      lastName: 'Janov',
      phone: '7205551212',
      address: '123 Main St.',
      city: 'Anytown',
      state: 'CO',
      zip: '80439',
      country: 'USA',
      password: '123',
      isAdmin: false,
    }),
    User.create({
      username: 'chris@armbrustermail.com',
      email: 'chris@armbrustermail.com',
      firstName: 'Chris',
      lastName: 'Armbruster',
      phone: '2244302064',
      address: '101 Hemlock Dr.',
      city: 'Columbia',
      state: 'TN',
      zip: '37174',
      country: 'USA',
      password: '123',
      isAdmin: true,
    }),
    User.create({
      username: 'mrmchughes27@gmail.com',
      email: 'mrmchughes27@gmail.com',
      firstName: 'Michael',
      lastName: 'Hughes',
      phone: '3125551212',
      address: '123 Elm St.',
      city: 'Chicago',
      state: 'IL',
      zip: '60601',
      country: 'USA',
      password: '123',
      isAdmin: false,
    }),
    User.create({
      username: 'ethyl@gmail.com',
      email: 'ethyl@gmail.com',
      password: '123',
    }),
    User.create({
      username: 'tim@gmail.com',
      email: 'tim@gmail.com',
      password: '123',
    }),
  ]);

  //create cart for ethyl
  let cart = await ethyl.getCart();
  await ethyl.addToCart({ product: products[0], quantity: 3 });
  await ethyl.addToCart({ product: products[1], quantity: 2 });

  //create cart for chris
  cart = await chris.getCart();
  let amount = 0;
  let rndProduct = products.random();
  let itemQty = Math.floor(Math.random() * 10) + 1;
  await chris.addToCart({
    product: rndProduct,
    quantity: itemQty,
  });
  amount += rndProduct.price * itemQty;
  rndProduct = products.random();
  itemQty = Math.floor(Math.random() * 10) + 1;
  await chris.addToCart({
    product: rndProduct,
    quantity: itemQty,
  });
  amount += rndProduct.price * itemQty;
  rndProduct = products.random();
  itemQty = Math.floor(Math.random() * 10) + 1;
  await chris.addToCart({
    product: rndProduct,
    quantity: itemQty,
  });
  amount += rndProduct.price * itemQty;
  rndProduct = products.random();
  itemQty = Math.floor(Math.random() * 10) + 1;
  await chris.addToCart({
    product: rndProduct,
    quantity: itemQty,
  });
  amount += rndProduct.price * itemQty;
  rndProduct = products.random();
  itemQty = Math.floor(Math.random() * 10) + 1;
  await chris.addToCart({
    product: rndProduct,
    quantity: itemQty,
  });
  amount += rndProduct.price * itemQty;
  cart.amount = amount * 100;
  await cart.save();
  let order = await chris.createOrder();

  cart = await chris.getCart();
  amount = 0;
  rndProduct = products.random();
  itemQty = Math.floor(Math.random() * 10) + 1;
  await chris.addToCart({
    product: rndProduct,
    quantity: itemQty,
  });
  amount += rndProduct.price * itemQty;
  rndProduct = products.random();
  itemQty = Math.floor(Math.random() * 10) + 1;
  await chris.addToCart({
    product: rndProduct,
    quantity: itemQty,
  });
  amount += rndProduct.price * itemQty;
  rndProduct = products.random();
  itemQty = Math.floor(Math.random() * 10) + 1;
  await chris.addToCart({
    product: rndProduct,
    quantity: itemQty,
  });
  amount += rndProduct.price * itemQty;
  rndProduct = products.random();
  itemQty = Math.floor(Math.random() * 10) + 1;
  await chris.addToCart({
    product: rndProduct,
    quantity: itemQty,
  });
  amount += rndProduct.price * itemQty;
  rndProduct = products.random();
  itemQty = Math.floor(Math.random() * 10) + 1;
  await chris.addToCart({
    product: rndProduct,
    quantity: itemQty,
  });
  amount += rndProduct.price * itemQty;
  cart.amount = amount * 100;
  await cart.save();
  order = await chris.createOrder();

  cart = await chris.getCart();
  amount = 0;
  rndProduct = products.random();
  itemQty = Math.floor(Math.random() * 10) + 1;
  await chris.addToCart({
    product: rndProduct,
    quantity: itemQty,
  });
  amount += rndProduct.price * itemQty;
  rndProduct = products.random();
  itemQty = Math.floor(Math.random() * 10) + 1;
  await chris.addToCart({
    product: rndProduct,
    quantity: itemQty,
  });
  amount += rndProduct.price * itemQty;
  rndProduct = products.random();
  itemQty = Math.floor(Math.random() * 10) + 1;
  await chris.addToCart({
    product: rndProduct,
    quantity: itemQty,
  });
  amount += rndProduct.price * itemQty;
  cart.amount = amount * 100;
  await cart.save();
  order = await chris.createOrder();

  cart = await chris.getCart();
  amount = 0;
  rndProduct = products.random();
  itemQty = Math.floor(Math.random() * 10) + 1;
  await chris.addToCart({
    product: rndProduct,
    quantity: itemQty,
  });
  amount += rndProduct.price * itemQty;
  rndProduct = products.random();
  itemQty = Math.floor(Math.random() * 10) + 1;
  await chris.addToCart({
    product: rndProduct,
    quantity: itemQty,
  });
  amount += rndProduct.price * itemQty;
  rndProduct = products.random();
  itemQty = Math.floor(Math.random() * 10) + 1;
  await chris.addToCart({
    product: rndProduct,
    quantity: itemQty,
  });
  amount += rndProduct.price * itemQty;
  rndProduct = products.random();
  itemQty = Math.floor(Math.random() * 10) + 1;
  await chris.addToCart({
    product: rndProduct,
    quantity: itemQty,
  });
  amount += rndProduct.price * itemQty;
  rndProduct = products.random();
  itemQty = Math.floor(Math.random() * 10) + 1;
  await chris.addToCart({
    product: rndProduct,
    quantity: itemQty,
  });
  amount += rndProduct.price * itemQty;
  cart.amount = amount * 100;
  await cart.save();
  order = await chris.createOrder();

  cart = await chris.getCart();
  amount = 0;
  rndProduct = products.random();
  itemQty = Math.floor(Math.random() * 10) + 1;
  await chris.addToCart({
    product: rndProduct,
    quantity: itemQty,
  });
  amount += rndProduct.price * itemQty;
  cart.amount = amount * 100;
  await cart.save();
  order = await chris.createOrder();

  cart = await chris.getCart();
  rndProduct = products.random();
  itemQty = Math.floor(Math.random() * 10) + 1;
  await chris.addToCart({
    product: rndProduct,
    quantity: itemQty,
  });
  rndProduct = products.random();
  itemQty = Math.floor(Math.random() * 10) + 1;
  await chris.addToCart({
    product: rndProduct,
    quantity: itemQty,
  });
  await cart.save();
};

module.exports = syncAndSeed;
