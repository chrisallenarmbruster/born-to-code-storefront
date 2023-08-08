import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import CarouselWrapper from './CarouselWrapper';
import ProductFeaturedItems from './ProductFeaturedItems';

export class ProductLanding extends Component {
  render() {
    console.log('carouseldata: ', this.carouselData);
    return (
      <React.Fragment>
        <div className="container-fluid p-0 m-0">
          <CarouselWrapper />
        </div>
        <ProductFeaturedItems />

        <div className="container my-5 h3 text-center">
          Placeholder for testimonials
        </div>
        <hr />
        <div className="container my-5 h3 text-center">
          Placeholder for our story
        </div>
        <hr />
      </React.Fragment>
    );
  }
}

export default ProductLanding;
