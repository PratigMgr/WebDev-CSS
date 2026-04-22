//Name: Pratig Thapa Magar
//Course Code: INFT 2202
//Date: 2025-04-20
//Description: This component displays the details of a specific bike item.
//It uses the useParams hook to get the ID of the item from the URL, and then finds the corresponding item from the context.

import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ItemsContext } from '../context/ItemsContext'
import { useNavigate } from 'react-router-dom'

export default function DetailView(){
  const { id } = useParams()
  const navigate = useNavigate()
  const { items, deleteItem, toggleFavourite } = useContext(ItemsContext)
  const item = items.find(i => i.id === id)
    // find by id
  if (!item) {
    return (
      <div>
        <div className="mb-3"><Link className="btn btn-sm btn-outline-secondary" to="/list">← Back to list</Link></div>
        <div className="alert alert-warning">Bike not found.</div>
      </div>
    )
  }
  function handleDelete(){
    if (window.confirm('Delete this Bike?')) {
      deleteItem(item.id)
      navigate('/list')
    }
  }

  return (
    <div>
      <div className="mb-3"><Link className="btn btn-sm btn-outline-secondary" to="/list">← Back to list</Link></div>
      <div className={'card' + (item.favourite ? ' border-warning' : '')}>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h2 className="card-title h5 mb-0">{item.name}</h2>
            <button className="btn btn-sm p-0 border-0 bg-transparent fs-4" onClick={() => toggleFavourite(item.id)} title="Toggle favourite">
              {item.favourite ? '⭐' : '☆'}
            </button>
          </div>
          <span className="badge bg-secondary mb-3">{item.category}</span>
          <div className="row g-2 mt-1">
            {item.price !== '' && item.price !== undefined && (
              <div className="col-6"><strong>Price:</strong> ${parseFloat(item.price).toLocaleString()}</div>
            )}
            {item.engine !== '' && item.engine !== undefined && (
              <div className="col-6"><strong>Engine:</strong> {item.engine} cc</div>
            )}
            {item.horsepower !== '' && item.horsepower !== undefined && (
              <div className="col-6"><strong>Horsepower:</strong> {item.horsepower} hp</div>
            )}
            {item.topSpeed !== '' && item.topSpeed !== undefined && (
              <div className="col-6"><strong>Top Speed:</strong> {item.topSpeed} km/h</div>
            )}
            {item.rating !== '' && item.rating !== undefined && (
              <div className="col-6"><strong>Rating:</strong> {item.rating} / 10</div>
            )}
          </div>
          {item.notes && (
            <p className="mt-3 mb-0 text-muted">{item.notes}</p>
          )}
        </div>
        <div className="card-footer d-flex gap-2">
          <button className="btn btn-sm btn-outline-primary" onClick={() => navigate(`/edit/${item.id}`)}>Edit</button>
          <button className="btn btn-sm btn-outline-danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  )
}