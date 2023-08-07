const conn = require('./conn');
const { INTEGER, UUID, UUIDV4 } = conn.Sequelize;

const Review = conn.define('review', {
  rating: {
    type: INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 5,
    },
  },
});

async function updateProductRating(productId) {
  const Product = require('./Product');
  const product = await Product.findByPk(productId);
  const reviews = await product.getReviews();
  // const ratings = reviews.map((review) => review.rating);
  if (reviews.length === 0) {
    await product.update({ rating: null, reviewCount: 0 });
  } else {
    const averageRating =
      reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;
    await product.update({
      rating: averageRating,
      reviewCount: reviews.length,
    });
  }
}

Review.addHook('afterCreate', async (review) => {
  await updateProductRating(review.productId);
});

Review.addHook('afterUpdate', async (review) => {
  await updateProductRating(review.productId);
});

Review.addHook('afterDestroy', async (review) => {
  await updateProductRating(review.productId);
});

module.exports = Review;
