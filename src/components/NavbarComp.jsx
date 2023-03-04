import { Link } from 'react-router-dom'
import { useState } from 'react'
import '../styled-sheets/NavbarComp.css'

const NavbarComp = () => {
  const [ fix, setFix ] = useState(false)

  function setFixed() {
  }
  return (
    <header>
      <nav className='navBar'>
        <Link to='/' className='brand'>Service<span>Guide</span></Link>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about'>Nosotros</Link>
          </li>
          <li>
            <Link to='/news'>Noticias</Link>
          </li>
          <li>
            <Link to='/register'>Registrar</Link>
          </li>
          <li>
            <Link to='/login'>Ingresar</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default NavbarComp