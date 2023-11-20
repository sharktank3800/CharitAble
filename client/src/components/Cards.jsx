import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

function Cards() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const handleSearch = async () => {
      const slugs = 'birds'
      try {
        const response = await axios.get(`https://partners.every.org/v0.2/search/${slugs}?apiKey=pk_live_596302b8ccb639ed7710bd6a962a5f50`, {
          params: {
            q: "dogs",
            limit: 5,
            offset: 0,
            sort: "relevance",
            order: "asc",
            fields: "id,name,description,mission,logo,websiteUrl,category,city,state,zipCode,latitude,longitude,profileImage,profileImageThumbnail"
          }
        });
        setData(response.data.nonprofits);
      } catch (error) {
        console.log(error);
      }
    };

    handleSearch();
  }, []);

  return (
    <div className="charity-cards">
      {data.map((item, index) => (
        <Card key={index} style={{ width: '18rem' }}>
          <Card.Img variant="top" src={item.logo} className="charity-image" />
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>
              {item.description}
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Cards;