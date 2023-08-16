import React, { Component, Fragment } from 'react';
import StarRatings from 'react-star-ratings';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import { resetSetSingleProduct } from '../store/productSingle';
import { resetProducts } from '../store/productAll';
import { resetUserOrders } from '../store/ordersSingleUser';

export class ProductReviewCreate extends Component {
  constructor() {
    super();
    this.state = { rating: 0, isLoading: true };
  }

  async componentDidMount() {
    await this.getRating();
    this.state.isLoading = false;
  }
  async componentDidUpdate(prevProps) {
    if (prevProps.orders !== this.props.orders) {
      await this.getRating();
    }
  }

  getRating = async () => {
    try {
      if (!this.props.auth.id) return;
      const token = window.localStorage.getItem('token');
      const review = (
        await axios.get(
          `/api/reviews/products/${this.props.productId}/users/${this.props.auth.id}`,
          {
            headers: {
              authorization: token,
            },
          }
        )
      ).data;
      if (!review) {
        this.setState({ rating: 0 });
      } else {
        this.setState({ rating: review.rating });
      }
    } catch (error) {
      console.log(error);
    }
  };

  changeRating = async (newRating) => {
    const productReview = {
      productId: this.props.productId,
      rating: newRating,
    };
    try {
      const token = window.localStorage.getItem('token');
      const newProductReview = (
        await axios.post('/api/reviews', productReview, {
          headers: {
            authorization: token,
          },
        })
      ).data;
      this.setState({ rating: newProductReview.rating });
      await this.props.resetUserOrders(this.props.auth.id);
      this.props.resetSetSingleProduct();
      this.props.resetProducts();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Fragment>
        {!this.props.auth.id ? (
          ''
        ) : this.state.isLoading ? (
          <div className="d-flex justify-content-center mt-5">
            <Spinner animation="grow" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <StarRatings
            rating={this.state.rating}
            starRatedColor="#ffa41c"
            numberOfStars={5}
            name="rating"
            starDimension="20px"
            starSpacing="1px"
            changeRating={this.changeRating}
          />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  orders: state.ordersSingleUser.orders,
});

const mapDispatchToProps = (dispatch) => ({
  resetSetSingleProduct: () => dispatch(resetSetSingleProduct()),
  resetProducts: () => dispatch(resetProducts()),
  resetUserOrders: (id) => dispatch(resetUserOrders(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductReviewCreate);
