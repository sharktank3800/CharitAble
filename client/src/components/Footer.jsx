import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'



function ContainerInsideExample() {
  return (
    <Navbar expand="lg" className="bg-primary"
    fixed="bottom">
      <Navbar.Brand className="header-logo">
              <img
                src="./image.png"
                width="200"
                height="60"
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
      <Container>
        <p>&copy; 2023</p>
      </Container>
    </Navbar>
  );
}

export default ContainerInsideExample;