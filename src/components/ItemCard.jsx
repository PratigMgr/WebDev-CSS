//Name: Pratig Thapa Magar
//Course Code: INFT 2202
//Date: 2025-04-20
//Description: This component is a card that displays the details of a bike. It shows the name, category, price, engine size, 
// horsepower, top speed, rating, and notes of the bike. It also has buttons for viewing, editing, deleting, and marking the bike as a favourite.
//  The card is styled with Bootstrap classes and highlights favourite bikes with a warning border.

import React from 'react'
export default function ItemCard( { bike, onView, onEdit, onDelete, onFavourite }){
 if (!bike) return null
  return (
     /* Show fields */
    <div className={'card h-100' + (bike.favourite ? ' border-warning' : '')}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <h5 className="card-title mb-1">{bike.name}</h5>
          <button
            className="btn btn-sm p-0 border-0 bg-transparent fs-5"
            onClick={() => onFavourite(bike.id)}
            title={bike.favourite ? 'Remove from favourites' : 'Add to favourites'}
          >
            {bike.favourite ? '⭐' : '☆'}
          </button>
        </div>
        <span className="badge bg-secondary mb-2">{bike.category}</span>

        {bike.price !== undefined && bike.price !== '' && (
          <p className="card-text mb-1"><strong>Price:</strong> ${parseFloat(bike.price).toLocaleString()}</p>
        )}
        {bike.engine !== undefined && bike.engine !== '' && (
          <p className="card-text mb-1"><strong>Engine:</strong> {bike.engine} cc</p>
        )}
        {bike.horsepower !== undefined && bike.horsepower !== '' && (
          <p className="card-text mb-1"><strong>Horsepower:</strong> {bike.horsepower} hp</p>
        )}
        {bike.topSpeed !== undefined && bike.topSpeed !== '' && (
          <p className="card-text mb-1"><strong>Top Speed:</strong> {bike.topSpeed} km/h</p>
        )}
        {bike.rating !== undefined && bike.rating !== '' && (
          <p className="card-text mb-1"><strong>Rating:</strong> {bike.rating} / 10</p>
        )}
        {bike.notes && (
          <p className="card-text text-muted small mt-1">{bike.notes.slice(0, 80)}{bike.notes.length > 80 ? '…' : ''}</p>
        )}
      </div>
      <div className="card-footer d-flex justify-content-end gap-2">
        <button className="btn btn-sm btn-outline-secondary" onClick={() => onView(bike.id)}>View</button>
        <button className="btn btn-sm btn-outline-primary" onClick={() => onEdit(bike.id)}>Edit</button>
        <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(bike.id)}>Delete</button>
      </div>
    </div>
  )
}