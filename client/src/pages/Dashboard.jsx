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

        // console.log("inititemstore",itemstore)
        // console.log("dashboard",user)
        useEffect(()=>{
    
            const showdonations = async ( )=>{
        
                const {data} = await showDonation() 
                const donationObj = data.showDonations.donations
                console.log("userdata",donationObj)
                // setNewDonationData({
                //     ...newDonationData,
                //     [data.name]: data.value
                //   });
                //   console.log("finitemstore",newDonationData)
            //     setState((oldState) => {
            //         return {
            //           ...oldState,
            //           itemstore:donationObj
            //         }
            //       });
            }
            showdonations()
        },[])
    }
    // showDonation()
    // 
    
    return (
        <div>
            {user ? (
                <>
                <header className="text-center">Welcome, {user.username}</header>
                <DashboardCards donationObj={donationObj} />
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