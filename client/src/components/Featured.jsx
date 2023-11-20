import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function WithHeaderExample() {
    return (
        <div className="featured-container">
            <Card style={{width: '25rem'}}>
                <Card.Header className="text-center">Featured</Card.Header>
                <Card.Body>
                <Card.Img variant="top" src="https://via.placeholder.com/100" className="feature-image" />
                    <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                        With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                    <Button variant="primary" className="feature-button">Donate Here!</Button>
                    <Button variant="primary" className="feature-button">Learn More</Button>
                </Card.Body>
            </Card>
        </div>
    );
}

export default WithHeaderExample;