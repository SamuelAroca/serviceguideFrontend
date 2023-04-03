import './App.css'
import Login from './pages/home/components/Login'
import Register from './pages/home/components/Register'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/home/Index';
import NavbarComp from './components/NavbarComp';
import News from './pages/News/News';
import P_main from './pages/private/P_main';

const App = () => {

  return (
    <Router>
      {/* <NavbarComp /> */}
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/news' element={<News/>} />
        <Route path='/P_main' element={<P_main />} />
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  )
}

export default App

