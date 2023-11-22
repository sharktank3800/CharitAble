import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useStore } from '../Store';
import { NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import DonateForm from '../pages/DonateForm';
import { Search } from './Search'

function Cards() {
  // const {searchContents} = useStore()
  // useEffect(()=>{

  // },[searchContents])

  const { searchContents, setState } = useStore();

  useEffect(() => {
    const handleSearch = async () => {
      const slugs = ['dog', 'cat', 'fish', 'health', 'sanctuary', 'hostel', 'oceans', 'nato']
      const slug = slugs[Math.floor(Math.random() * slugs.length)]
      try {
        const response = await axios.get(`https://partners.every.org/v0.2/search/${slug}?apiKey=pk_live_596302b8ccb639ed7710bd6a962a5f50`, {
          params: {
            q: "dogs",
            limit: 5,
            offset: 0,
            sort: "relevance",
            order: "asc",
            fields: "id,name,description,mission,logo,websiteUrl,category,city,state,zipCode,latitude,longitude,profileImage,profileImageThumbnail"
          }
        });
        setState((oldState) => {
          return {
            ...oldState,
            searchContents: response.data.nonprofits
          }
        });
        // console.log(response.data.nonprofits);
      } catch (error) {
        console.log(error);
      }
    };

    handleSearch();
  }, []);

  return (
    <div className="charity-cards">
      {searchContents.length ? searchContents.map((item, index) => (
        <Card key={index} style={{ width: '18rem' }}>
          
          <Card.Img variant="top" src={item.coverImageUrl || 'logo_gagogo.svg' || 'https://picsum.photos/300/300'}
            className={`charity-image ${!item.coverImageUrl && 'charity-image-logo'}`}
          />
          <Card.Body className='card_body_container'>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>
              {item.description}
            </Card.Text>
            <div className='button-container'>
              <Link to={`/donateform?name=${encodeURIComponent(item.name)}`}> <Button variant="primary">Donate Here!</Button></Link>
              <NavLink href={item.websiteUrl || 'https://colorlib.com/etc/404/colorlib-error-404-1/' || '/teapot'} target="_blank"><Button variant="primary">Learn more</Button></NavLink>
            </div>
          </Card.Body>

        </Card>
      )) : <p>use the search feature to find results</p>}
    </div>
  );
}

export default Cards;