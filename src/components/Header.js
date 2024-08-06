import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
   <header className='mb-4'>




    <div className='container'>
    <nav className="navbar bg-body-tertiary">
  <div className="container-fluid">
    <Link to='/' className="navbar-brand">DevFlix</Link>
    <div className="d-flex" role="search">
    
      <Link to='/favoritos' className="btn btn-outline-danger" >Meus Filmes</Link>
    </div>
  </div>
</nav>
    </div>


   </header>
  )
}
