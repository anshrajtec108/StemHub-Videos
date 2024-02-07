import { UserProvider } from '../../Context/UserContext.jsx'
import Header from '../../Components/HeaderNav/Header.jsx'
function Home(props) {
  return (
    <UserProvider>
    <div>
    <Header/>
      Home
    </div>
    </UserProvider>
    
  )
}

export default Home
