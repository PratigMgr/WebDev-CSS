import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Layout(){
  return (
    <div className="container py-3">
      <header className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h4 m-0">Capstone Catalog</h1>
        <nav className="d-flex gap-2">
          <Link className="btn btn-sm btn-outline-secondary" to="/">Home</Link>
          <Link className="btn btn-sm btn-outline-secondary" to="/list">List</Link>
          <Link className="btn btn-sm btn-primary" to="/new">Create</Link>
        </nav>
      </header>
      <Outlet />
    </div>
  )
}
