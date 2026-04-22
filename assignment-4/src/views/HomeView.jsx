//Name: Pratig Thapa Magar
//Course Code: INFT 2202
//Date: 2025-04-20
//Description: This component serves as the home page of the application.
import React from 'react'
import { Link } from 'react-router-dom'

export default function HomeView(){
  return (
    //Home page with intro my app and link to list/create.
    <div className="p-4 bg-light rounded">
      <h2 className="h5"><i>Welcome to Capstone Catalog :- Design by Pratig Thapa</i></h2>
      <h3 className="h4 mb-2">🏍️ My Favourite Sportbikes Collection</h3>
      <p className="mb-3 text-muted">Track, compare, and manage your favourite motorbikes. Add specs like engine size, horsepower, and top speed and mark star as favourite, the ones you love most.</p>
      <div className="d-flex gap-2">
        <Link className="btn btn-outline-secondary" to="/list">Browse Bikes</Link>
        <Link className="btn btn-primary" to="/new">Add a Bike</Link>
      </div>
    </div>
  )
}