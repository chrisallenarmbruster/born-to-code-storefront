import React, { Component, Fragment } from 'react';
import CarouselWrapper from './CarouselWrapper';
import ProductFeaturedItems from './ProductFeaturedItems';
import ProductTestimonials from './ProductTestimonials';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

export class ProductLanding extends Component {
  render() {
    console.log('carouseldata: ', this.carouselData);
    return (
      <Fragment>
        <div className="container-fluid p-0 m-0">
          <CarouselWrapper />
        </div>
        <ProductFeaturedItems />
        <ProductTestimonials />
        <Container fluid className="my-5 py-5 text-dark">
          <Container>
            <Row xs={1} md={2} className="g-5">
              <Col className="g-5 d-flex justify-content-center">
                <div>
                  <Image
                    fluid
                    src="/images/landing/sustainability.png"
                    roundedCircle
                  />
                </div>
              </Col>
              <Col className="g-5  d-flex flex-column justify-content-around px-5 display-5">
                <p>
                  10% of everything we sell is made from recycled materials.
                </p>
                <p>
                  Whenever possible we use reclaimed technology to run our
                  business.
                </p>
              </Col>
            </Row>
          </Container>
        </Container>
        <Container fluid className="mt-5 mb-0 py-5 text-light bg-primary">
          <Container>
            <Row xs={1} md={2} className="g-5">
              <Col className="g-5  d-flex flex-column  px-5 display-5">
                <h1 className="text-center display-4 fw-bold my-5">
                  Paying It Forward
                </h1>
                <p className="text-left fst-italic display-6">
                  A portion of the proceeds from every sale supports our STEM
                  Education Foundation.{' '}
                </p>
                <p className="text-left fst-italic display-6">
                  We have created community learning programs for jump-starting
                  tomorrow's coders.
                </p>
              </Col>
              <Col className="g-5 d-flex justify-content-center">
                <div>
                  <Image fluid src="/images/landing/classroom.png" thumbnail />
                </div>
              </Col>
            </Row>
          </Container>
        </Container>
      </Fragment>
    );
  }
}

export default ProductLanding;
