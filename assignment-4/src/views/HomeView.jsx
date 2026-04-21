import React from 'react'
import { Link } from 'react-router-dom'

export default function HomeView(){
  return (
    //Home page with intro my app and link to list/create.
    <div className="p-4 bg-light rounded">
      <h2 className="h5">Welcome to Capstone Catalog</h2>
      <p className="mb-3">Browse, create, and manage your personal collection of items. Each item has a name, category, price, rating, and description.</p>
      <div className="d-flex gap-2">
        <Link className="btn btn-outline-secondary" to="/list">Browse List</Link>
        <Link className="btn btn-primary" to="/new">Add New Item</Link>
      </div>
    </div>
  )
}