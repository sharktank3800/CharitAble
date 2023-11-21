import { useState } from "react"
import { useStore } from "../Store"
import { Button, Form } from "react-bootstrap"
import axios from "axios";

function DonateForm() {
    const { user } = useStore();
    const[donationData, setDonationData] = useState({
        amount: '',
        category: ''
    })

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const handleInputChange = (e) => {
        setDonationData({
            ...donationData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setLoading(true)
        console.log(donationData)

        try {
            const response = await axios.post('', {
                ...donationData,
                userId: user.id
            })

            setDonationData({
                Amount: '',
                category: ''
            })
        } catch (error) {
            setError('failed to make donation')
        }

        setLoading(false)
    };


    return (
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
          placeholder="Enter donation category"
          name="category"
          value={donationData.category}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? 'Donating...' : 'Donate'}
      </Button>
        </Form>
    )
}

export default DonateForm