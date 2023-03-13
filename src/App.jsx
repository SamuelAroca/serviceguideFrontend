import './App.css'
import Login from './pages/home/components/Login'
import Register from './pages/home/components/Register'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/home/Index';
import NavbarComp from './components/NavbarComp';
import News from './pages/News/News';

const App = () => {

  return (
    <Router>
      <NavbarComp />
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/news' element={<News/>} />
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  )
}

export default App

