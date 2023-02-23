import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './components/Index';

const App = () => {

  return (

    <div className="container">
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

