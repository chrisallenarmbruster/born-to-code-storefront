import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ProductTestimonialCard from './ProductTestimonialCard';

const ProductTestimonials = () => {
  return (
    <Container fluid className="mt-5 py-5 bg-dark text-light">
      <Container>
        <div className="h3 text-center mb-5">What Customers Are Saying</div>
        <div>
          <Row xs={1} md={2} xl={4} className="g-5 mb-5">
            <Col className="g-5 d-flex justify-content-center">
              <ProductTestimonialCard />
            </Col>
            <Col className="g-5 d-flex justify-content-center">
              <ProductTestimonialCard />
            </Col>
            <Col className="g-5 d-flex justify-content-center">
              <ProductTestimonialCard />
            </Col>
            <Col className="g-5 d-flex justify-content-center">
              <ProductTestimonialCard />
            </Col>
          </Row>
        </div>
      </Container>
    </Container>
  );
};

export default ProductTestimonials;
