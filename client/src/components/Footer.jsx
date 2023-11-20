import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function ContainerInsideExample() {
  return (
    <Navbar expand="lg" className="bg-primary"
    fixed="bottom">
      <Container>
        <p>&copy; 2023</p>
      </Container>
    </Navbar>
  );
}

export default ContainerInsideExample;