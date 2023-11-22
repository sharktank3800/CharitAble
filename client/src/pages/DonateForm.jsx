import { useState,useEffect  } from "react";
import { useStore} from "../Store";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { ApolloClient, gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

const InitialFormData = {
  id:'',
  name: '',
  amount: 0,
  categories: [],
};

const DONATION = gql`
  mutation Donations($name: String!, $amount: Int!, $username: String!,$id: ID, $categories: [String]) {
    createDonation(name: $name, amount: $amount, username: $username, id: $id, categories: $categories) {
      _id
      name
      amount
      username
      categories
    }
  }
`;

function DonateForm() {
  const { user } = useStore();  //accessing info from the global store
  const navigate = useNavigate();
  const location = useLocation()
  const itemname = location.state?.name
  const [names, setName] = useState('');
  const [donationData, setDonationData] = useState(InitialFormData);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(!user){
      navigate('/login', {state: {from: location.pathname}})
    }
    const searchParams = new URLSearchParams(location.search);
    const nameParam = searchParams.get('name');
    setName(nameParam);
  }, [user, navigate, location.pathname]);
  // console.log(location.search.replace("?name=", " ").replace('%20'," ").replace('%20'," ").replace('%20'," "))
  const showlocation =location.search.replace("?name=", " ").replace('%20'," ").replace('%20'," ").replace('%20'," ")
  console.log(showlocation);
  
  const [makeDonation] = useMutation(DONATION, {
    variables: {
      id: user ? user._id : null,
      name: showlocation,
      amount:parseFloat( donationData.amount),
      username: user ? user.username : null,
      categories: donationData.categories
    },
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    
    if (name === 'categories') {
      console.log(value.split(','))
      return setDonationData({
        ...donationData,
        [name]: value.split(',')
      });
    }

    setDonationData({
      ...donationData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // console.log('donation',donationData)
      const { data } = await makeDonation();
      // Assuming you want to do something with the response from the mutation
      // (e.g., update local state or navigate to another page)
      // Add your logic here

      // Clear the form data after successful donation
      setDonationData({
        id:'',
        name: '',
        amount: '',
        username: '',
        categories: '',
      });
    } catch (error) {
      console.error(error);
      setError('Failed to make donation');
    }

    setLoading(false);
  };

  return (
    <>
    {user ? (
    <Form onSubmit={handleSubmit}>
      
      <Form.Group controlId="formBasicAmount">
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter donation amount"
          name="amount"
          value={donationData.amount}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="formBasicCategory">
        <Form.Label>Category</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter donation categories seperated by commas"
          name="categories"
          value={donationData.category}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? 'Donating...' : 'Donate'}
      </Button>
    </Form>
    ):(
      <p>Please <Link to='/login' >Log In</Link> or <Link to='/register'>Register</Link> to Access the Dashboard</p>
    )}
</>
    
  );
}

export default DonateForm;