import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <header>
            {user && (

                <div>
                    <h1>Workout Buddy</h1>
                    <nav>
                        <div>
                            <span>{user.email}</span>
                            <button onClick={handleClick}>Log out</button>
                            <Link to="/dashboard">Dashboard</Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    )
}

export default Navbar