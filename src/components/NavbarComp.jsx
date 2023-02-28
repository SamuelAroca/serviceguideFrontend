import '../styled-sheets/NavbarComp.css'

const NavbarComp = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light bg-transparent fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Service<span className='span-guide'>Guide</span></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon color"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link" href="/">Home</a>
            <a className="nav-link" href="/login">Login</a>
            <a className="nav-link" href="/register">Register</a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavbarComp