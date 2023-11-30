import Header from "./components/Header"
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import Chat from "./pages/Chat"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import { useAuth } from "./context/AuthContext"

function App() {

  const auth = useAuth()
  
  console.log(useAuth()?.isLoggedIn)
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<SignUp />}/>
        {auth?.isLoggedIn && auth.user && (<Route path="/chat" element={<Chat />}/>)}

        {/* If any other route then its not found */}
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </main>
  )
}

export default App
