import React from 'react';
import StarRatings from 'react-star-ratings';

const ProductReviewStars = ({ rating }) => {
  return (
    <StarRatings
      rating={parseFloat(rating)}
      starRatedColor="#ffa41c"
      numberOfStars={5}
      name="rating"
      starDimension="20px"
      starSpacing="1px"
    />
  );
};

export default ProductReviewStars;
