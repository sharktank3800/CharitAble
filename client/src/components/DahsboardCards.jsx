import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


function DashboardCards({ donations }) {
    console.log(donations);
  return (
    donations.map((donation, index) => (
      <Card key={index} style={{ width: '25rem' }}>
        <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
        <Card.Body>
          <Card.Title>{donation.name}</Card.Title>
          <Card.Text>
            Donation Amount: {donation.amount}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Category 1: {donation.categories[0]}</ListGroup.Item>
          <ListGroup.Item>Category 2: {donation.categories[1]}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Card.Link href="#">Card Link</Card.Link>
        </Card.Body>
      </Card>
    ))
  );
}

export default DashboardCards;