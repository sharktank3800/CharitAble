import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function ContainerInsideExample() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary"
    fixed="bottom">
      <Container>
        <Navbar.Brand href="#">Navbar</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default ContainerInsideExample;