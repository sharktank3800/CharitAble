import {useStore} from '../Store'



function Dashboard(){
    const { user, setState } = useStore();
    console.log("dashboard",user)

    return (
        <div>
            {user ? (
                <>
                <h1>Welcome, {user.username}</h1>
                <p></p>
                </>
            ) : (
                <>
                <p>Please LogIn or register to Access the Dashboard</p>
                </>
            )}
        </div>
    )
}

export default Dashboard