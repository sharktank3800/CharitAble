import Cards from '../components/Cards'
import Featured from '../components/Featured'
import 'bootstrap/dist/css/bootstrap.css';
import { Container } from "react-bootstrap";




function Landing() {

    return (
        
        <Container>
            <Featured />
            <Cards />
        </Container>
    
    )
}

export default Landing