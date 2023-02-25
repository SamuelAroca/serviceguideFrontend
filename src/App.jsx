import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './components/Index';
import NavbarComp from './components/NavbarComp';

const App = () => {

  return (
    <div className='container-app'>
      <NavbarComp />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

