import {useStore} from '../Store'
import { Link } from 'react-router-dom';
import { ApolloClient, gql, useMutation } from "@apollo/client";
import { useEffect } from 'react';
import { useState } from 'react';

import DashboardCards from '../components/DahsboardCards';

const SHOW =gql`
mutation ShowDonations($id: ID){
    showDonations(id: $id){
        _id
        donations {
            name
            amount
            _id
            categories
            image
          }
    }
}
`



function Dashboard(){
    const { user,itemstore, setState } = useStore();
    if(user){
        const [newDonationData, setNewDonationData] = useState({});

        const [showDonation] = useMutation(SHOW, {
           variables:{
               id: user._id     
        }
    
        })

        useEffect(()=>{
    
            const showdonations = async ( )=>{
        
                const {data} = await showDonation() 
                const donationObj = data.showDonations.donations
                console.log("userdata",data.showDonations.donations)
                
                setState((oldState) => {
                    return {
                      ...oldState,
                      itemstore:donationObj
                    }
                  });
            }
            showdonations()
        },[])
    }
    
    console.log(itemstore);
    return (
        <div>
            {user ? (
                <>
                <header className="text-center display-4 pt-4 " >Welcome, {user.username}</header>

                <DashboardCards  donationObj={itemstore} />
               
                </>
            ) : (
                <>
                <p>Please <Link to='/login'>Log In</Link> or <Link to='/register'>Register</Link> to Access the Dashboard</p>
                </>
            )}
        </div>
    )
}

export default Dashboard