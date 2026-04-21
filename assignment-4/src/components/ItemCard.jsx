import React from 'react'
export default function ItemCard( { item, onView, onEdit, onDelete }){
  return (
    <div className="card h-100">
      <div className="card-body">
        {/* Show fields */}
        <h5 className="card-title">{item.name}</h5>
        <span className="badge bg-secondary mb-2">{item.category}</span>  
        {item.price !== undefined && item.price !== '' && (
          <p className="card-text mb-1"><strong>Price:</strong> ${parseFloat(item.price).toFixed(2)}</p>
        )}
        {item.rating !== undefined && item.rating !== '' && (
          <p className="card-text mb-1"><strong>Rating:</strong> {item.rating} / 10</p>
        )}
        {item.description && (
          <p className="card-text text-muted small">{item.description.slice(0, 80)}{item.description.length > 80 ? '…' : ''}</p>
        )}
        <div className="text-muted">TODO: ItemCard</div>
      </div>
      <div className="card-footer d-flex justify-content-end gap-2">
        {/* Buttons */}
        <button className="btn btn-sm btn-outline-secondary" onClick={() => onView(item.id)}>View</button>
        <button className="btn btn-sm btn-outline-primary" onClick={() => onEdit(item.id)}>Edit</button>
        <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(item.id)}>Delete</button>
      </div>
    </div>
  )
}
