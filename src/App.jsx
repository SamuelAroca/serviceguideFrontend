import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './components/Index';
import NavbarComp from './components/NavbarComp';

const App = () => {

  return (
    <Router>
      <NavbarComp />
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App

