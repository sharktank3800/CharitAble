import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios'

function Header() {
  const handleSearch = async () => {
    try {
      const response = await axios.get("https://partners.every.org/v0.2/search/pets?apiKey=pk_live_596302b8ccb639ed7710bd6a962a5f50" , {
        params: {
          q: "dogs",
          limit: 5,
          offset: 0,
          sort: "relevance",
          order: "asc",
          fields: "id,name,description,mission,logo,websiteUrl,category,city,state,zipCode,latitude,longitude,profileImage,profileImageThumbnail"}
    });
      const data = response.data;
      // handle your data here
      console.log(data);
    } catch (error) {
      // handle your error here
      console.log(error);
    }
  }

  return (
    <Navbar expand="lg" className="bg-primary">
      <Container fluid>
        <section>
      
        <Navbar.Brand href="#" className="header-text">
        <img 
          src="vite.svg"
          width="30"
          height="30"
          className="d-inline-block align-top header-logo"
          alt="somelogo"/>
          CharitAble</Navbar.Brand>
        </section>
        
        <div className="search">
          <Form className="d-flex search-bar">
            <Form.Control
              type="search"
              placeholder="Search for your charity"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success" className="search-button" id="searchButton" onClick={handleSearch}>Search</Button>
          </Form>
        </div>

        <div className="links">
          <Nav className="me-auto button-bar">
            <Button variant="outline-success" className="links-button" href="#">Register</Button>
            <Button variant="outline-success" className="links-button" href="#">Login</Button>
            <Button variant="outline-success" className="links-button" href="#">Donate Here!</Button>
          </Nav>
        </div>

      </Container>
    </Navbar>
  );
  }

export default Header;