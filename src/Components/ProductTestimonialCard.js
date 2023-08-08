import React from 'react';
import Card from 'react-bootstrap/Card';
import { faker } from '@faker-js/faker';

const ProductTestimonialCard = () => {
  return (
    <Card className="custom-card" border="secondary" style={{ width: '100%' }}>
      <Card.Body>
        <Card.Title>{faker.person.fullName()}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {faker.person.jobTitle()}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          @ {faker.company.name()}
        </Card.Subtitle>
        <Card.Text className="fst-italic">"{faker.lorem.lines(4)}"</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductTestimonialCard;
