import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios'
import { useState, useEffect } from 'react';
import { useStore } from '../Store';
import Cards from './Cards'
import { NavLink, Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';
const initialFormData = {
  slugs: '',

}


function Header() {
  const [formData, setFormData] = useState(initialFormData)
  const { user,setState } = useStore();
  // console.log('initial',formData)
  const handleChange = (e) => {
    setFormData({
      [e.target.name]: e.target.value
    })
    console.log(formData)
  }
  // useEffect(() => {
  const handleSearch = async (e) => {
    e.preventDefault()
    const slugs = formData.slugs;
    console.log('fomdata', slugs);
    try {
      const response = await axios.get(`https://partners.every.org/v0.2/search/${slugs}?apiKey=pk_live_596302b8ccb639ed7710bd6a962a5f50`, {
        params: {
          q: "dogs",
          limit: 5,
          offset: 0,
        }
      });
      setState((oldState) => {
        return {
          ...oldState,
          searchContents: response.data.nonprofits
        }
      });
      console.log('results', response.data.nonprofits)
    } catch (error) {
      console.error(error);
    }
  };

  // handleSearch();
  // }, [formData]);
  return (
    <Navbar expand="lg" className="bg-primary header">
      <Container fluid>
        <section>

          <NavLink to="/">
            <Navbar.Brand className="header-logo">
              <img
                src="./logo_gagogo.svg"
                width="200"
                height="60"
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
          </NavLink>
        </section>

        <div onSubmit={handleSearch} className="search">
          <Form className="d-flex search-bar">
            <Form.Control
              type="search"
              name="slugs"
              onChange={handleChange}
              // value={formData.slugs}
              placeholder="Search for your charity"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success" className="search-button" id="searchButton" onClick={handleSearch} >Search</Button>
          </Form>
        </div>

        <div className="links">
          <Nav className="me-auto button-bar">
            {user ? (<>
            <NavLink to="/dashboard"> <Button variant="outline-success" className="links-button" >Dashboard</Button></NavLink>
            
            <NavLink to="/login"> <Button variant="outline-success" className="links-button" >Logout</Button></NavLink>
            </>):(<>
            <NavLink to="/register"><Button variant="outline-success" className="links-button" >Register</Button></NavLink>
            <NavLink to="/login"> <Button variant="outline-success" className="links-button" >Login</Button></NavLink>
            </>)}
          </Nav>
        </div>
        {/* <Cards handleSearch={handleSearch}/> */}
      </Container>
    </Navbar>
  );
}

export default Header;