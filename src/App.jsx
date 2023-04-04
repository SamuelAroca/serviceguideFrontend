import './App.css'
import Login from './pages/home/components/Login'
import Register from './pages/home/components/Register'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/home/Index';
import News from './pages/News/News';
import Major from './pages/private/Major';
import NotFound from './pages/home/components/NotFound';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/news' element={<News/>} />
        <Route path='/Major' element={<Major />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App

