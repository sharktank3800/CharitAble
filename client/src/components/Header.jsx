import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

function TextLinkExample() {
  return (
    <Navbar className="bg-primary">
      <Container>
        <Navbar.Brand href="#home">CharitAble</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button variant="outline-light" className="mx-2 nav-button">Login</Button>
          <Button variant="outline-light" className="mx-2 nav-button">Register</Button>
          <Button variant="outline-light" className="mx-2 nav-button">Logout</Button>
          <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TextLinkExample;