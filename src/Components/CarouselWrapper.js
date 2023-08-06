import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export class CarouselWrapper extends Component {
  render() {
    return (
      <Carousel
        fade
        autoPlay={true}
        interval={5000}
        controls={false}
        indicators={false}
        className="container-fluid p-0"
      >
        <Carousel.Item className="carousel-item">
          <div
            className="carousel-overlay-image"
            style={{
              backgroundImage: `url("/images/carousel/carousel-hat.jpg")`,
            }}
          ></div>
          <Carousel.Caption>
            <h3>Style Comfort Function</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            <Link to="/products">
              <Button className="btn-lg mb-1" variant="primary">
                Browse Collection
              </Button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div
            className="carousel-overlay-image"
            style={{
              backgroundImage: `url("/images/carousel/carousel-tshirt.jpg")`,
            }}
          ></div>
          <Carousel.Caption>
            <h3>Designed by Coders, for Coders</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            <Link to="/products">
              <Button className="btn-lg mb-1" variant="primary">
                Shop Now
              </Button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div
            className="carousel-overlay-image"
            style={{
              backgroundImage: `url("/images/carousel/carousel-coffee.jpg")`,
            }}
          ></div>
          <Carousel.Caption>
            <h3>Original Coding Outfitters</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            <Link to="/products">
              <Button className="btn-lg mb-1" variant="primary">
                Get Outfitted
              </Button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}

export default CarouselWrapper;
