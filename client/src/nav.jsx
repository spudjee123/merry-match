import React from 'react'
import { Link } from 'react-router-dom'


function Nav() {
  return (
    <nav className='w-full bg-white h-[100px] flex justify-center' >
      <div>
      <Link to="/">Why Merry match?</Link><Link to="/">-U</Link><Link to="/">  </Link><Link to="/register"> </Link>
      </div>
      
    </nav>
  )
}

export default Nav