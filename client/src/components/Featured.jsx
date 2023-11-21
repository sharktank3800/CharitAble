import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import DonateForm from '../pages/DonateForm';
import { useEffect, useState } from 'react';
import { useStore } from '../Store';
import axios from 'axios';
// import { NavLink } from 'react-router-dom';
import { NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Featured({ data }) {
  const { featuredContents, setState } = useStore();
  const [timerId, setTimerId] = useState(null)

  useEffect(() => {
    const handleSearch = async () => {
      const slugs = ['dog', 'cat', 'health', 'oceans']
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

        // Filter the response data based on the slugs
        setState((oldState) => {
          return {
            ...oldState,
            featuredContents: response.data.nonprofits || []
          }
        });

        const filteredData = response.data.nonprofits.map(item => slugs.includes(item.slug));
        // console.log(response.data.nonprofits);
        // Update the state with the filtered data
      } catch (error) {
        console.error('Error in handleSearch:', error);
      }
    };

    handleSearch();
  }, [setState])
  // const id = setInterval(handleSearch, 3000000);
  // setTimerId(id);

  // return () => {
  //   if (timerId) {
  //     // handleSearch()
  //     clearInterval(timerId)
  //   };
  // }
  // }, [setState, timerId])

  return (
    <div className="featured-container ">
      {/* {console.log(featuredContents)} */}
      {featuredContents.slice(0, 5).map((item, index) => (
        <Card key={index} style={{ width: '25rem' }} className="card-body popa">

          <Card.Body>
              <Card.Img variant="top" src={item.coverImageUrl} className="feature-image" />
            <div className="card_body_container">
              <Card.Title className='featured-title'>{item.name}</Card.Title>
              <Card.Text>{item.description}</Card.Text>


              <div className="button-container">
                {/* <NavLink path='/donateform' element={<DonateForm/>} ><Button variant="primary" className="feature-button">Donate Here!</Button></NavLink> */}
                <Link to='/donateform'> <Button variant="primary" >Donate Here!</Button></Link>
                <NavLink href={item.websiteUrl || '/teapot' || 'https://colorlib.com/etc/404/colorlib-error-404-1/'} target="_blank"><Button variant="primary">Learn more</Button></NavLink>
              </div>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
export default Featured;