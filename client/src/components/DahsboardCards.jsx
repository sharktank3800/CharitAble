import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


function DashboardCards( {donationObj}) {
    console.log(donationObj);
    return (
        <div className='dashboard-cards-container'>
          {donationObj.map((donation, index) => (
            <div className='dashboard-cards' key={index}>
              <Card style={{ width: '25rem' }}>
                <Card.Img variant="top" className="dahsboard-image" src={donation.image} />
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
                  {/* <Card.Link href="#">Card Link</Card.Link> */}
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      );
          }
export default DashboardCards;