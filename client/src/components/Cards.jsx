import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useStore } from '../Store';
import NavLink from 'react-bootstrap/esm/NavLink';
import {Search} from './Search'

function Cards() {
  // const {searchContents} = useStore()
  // useEffect(()=>{

  // },[searchContents])
  
  const {searchContents, setState} = useStore();

  useEffect(() => {
    const handleSearch = async () => {
      const slugs = ['dog', 'cat', 'fish', 'health', 'sanctuary', 'hostel']
      const slug = slugs[Math.floor(Math.random()* slugs.length)]
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
        setState((oldState)=>{
          return{
           ...oldState,
           searchContents: response.data.nonprofits 
         }
       });
       console.log(response.data.nonprofits);
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
          <Card.Img variant="top" src={item.coverImageUrl} className="charity-image" />
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>
              {item.description}
            </Card.Text>
            <Button variant="primary">Donate Here!</Button>
            <NavLink href={item.websiteUrl} target="_blank"><Button variant="primary">learn more</Button></NavLink>
          </Card.Body>
        </Card>
      )) : <p>use the search feature to find results</p>}
    </div>
  );
}

export default Cards;