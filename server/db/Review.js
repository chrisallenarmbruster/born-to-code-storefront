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

module.exports = Review;
