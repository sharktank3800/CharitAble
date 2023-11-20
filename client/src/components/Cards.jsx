import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Cards() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Replace with your API fetch call
    fetch('your-api-url')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);
//replace item.image item.title  and  item.text with our data strucure
  return (
    <div className="charity-cards">
      {data.map((item, index) => (
        <Card key={index} style={{ width: '18rem' }}>
          <Card.Img variant="top" src={item.image} className="charity-image" /> 
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>
              {item.text}
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Cards;