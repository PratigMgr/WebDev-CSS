//Name: Pratig Thapa Magar
//Course Code: INFT 2202
//Date: 2025-04-20
//Description: This component defines the main layout of the application. It includes a header with a title and navigation links to the home page,
//  the list of bikes, and the form to add a new bike. The Outlet component is used to render the child routes defined in the router configuration.

import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Layout(){
  return (
    <div className="container py-3">
      <header className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h4 m-0">🏍️ Favourite Sportbikes</h1>
        <nav className="d-flex gap-2">
          <Link className="btn btn-sm btn-outline-secondary" to="/">Home</Link>
          <Link className="btn btn-sm btn-outline-secondary" to="/list">My Bikes</Link>
          <Link className="btn btn-sm btn-primary" to="/new">+ Add Bike</Link>
        </nav>
      </header>
      <Outlet />
    </div>
  )
}
