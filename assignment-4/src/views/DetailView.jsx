import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ItemsContext } from '../context/ItemsContext'

export default function DetailView(){
  const { id } = useParams()
  const ctx = useContext(ItemsContext)
  // TODO: find by id
  return (
    <div>
      <div className="mb-3"><Link className="btn btn-sm btn-outline-secondary" to="/list">← Back to list</Link></div>
      <div className="alert alert-secondary">TODO: DetailView for id: {id}</div>
    </div>
  )
}
