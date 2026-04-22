import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ItemsContext } from '../context/ItemsContext'
import { useNavigate } from 'react-router-dom'

export default function DetailView(){
  const { id } = useParams()
  const navigate = useNavigate()
  const { items, deleteItem } = useContext(ItemsContext)
  const item = items.find(i => i.id === id)
    // find by id
  if (!item) {
    return (
      <div>
        <div className="mb-3"><Link className="btn btn-sm btn-outline-secondary" to="/list">← Back to list</Link></div>
        <div className="alert alert-warning">Item not found.</div>
      </div>
    )
  }
  function handleDelete(){
    if (window.confirm('Delete this item?')) {
      deleteItem(item.id)
      navigate('/list')
    }
  }

  return (
    <div>
      <div className="mb-3"><Link className="btn btn-sm btn-outline-secondary" to="/list">← Back to list</Link></div>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title h5">{item.name}</h2>
          <span className="badge bg-secondary mb-3">{item.category}</span>
          {item.price !== '' && item.price !== undefined && (
            <p className="mb-1"><strong>Price:</strong> ${parseFloat(item.price).toFixed(2)}</p>
          )}
          {item.rating !== '' && item.rating !== undefined && (
            <p className="mb-1"><strong>Rating:</strong> {item.rating} / 10</p>
          )}
          {item.description && (
            <p className="mt-2 mb-0">{item.description}</p>
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
