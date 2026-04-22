//Name: Pratig Thapa Magar
//Course Code: INFT 2202
//Date: 2025-04-20
//Description: This component displays a list of bike items with various filters and sorting options. 
// It uses the ItemsContext to access the list of items and the filter/sort state.

import React, { useContext } from 'react'
import ItemCard from '../components/ItemCard'
import { ItemsContext } from '../context/ItemsContext'
import { useNavigate } from 'react-router-dom'


export default function ListView(){
  const ctx = useContext(ItemsContext)
  const navigate = useNavigate()
  //use ctx.derived and filters
const {
    derived,
    search, setSearch,
    bikeType, setBikeType,  
    minValue, setMinValue,
    maxValue, setMaxValue,
    sortKey, setSortKey,
    sortDir, setSortDir,
    favOnly, setFavOnly,
    deleteItem, toggleFavourite
  } = ctx

  function handleDelete(id){
    if (window.confirm('Delete this bike?')) deleteItem(id)
  }
  return (
    <div>
      <div className="row g-2 align-items-end mb-3">
        <div className="col-md-3">
          <label className="form-label small mb-1">Search</label>
          <input className="form-control form-control-sm" placeholder="Search brand or notes…" value={search} onChange={e => setSearch(e.target.value)}/>
        </div>
        <div className="col-md-2">
        <label className="form-label small mb-1">Bike Type</label>
        <select className="form-select form-select-sm" value={bikeType} onChange={e => setBikeType(e.target.value)}>
          <option value="">All</option>
          <option value="Sportbike">Sportbike</option>
          <option value="Cruiser">Cruiser</option>
          <option value="Naked">Naked</option>
          <option value="Touring">Touring</option>
          <option value="Supermoto">Supermoto</option>
          <option value="Dirt">Dirt</option>
          <option value="Scooter">Scooter</option>
        </select>
      </div>
        <div className="col-md-2">
          <label className="form-label small mb-1">Min Price ($)</label>
          <input type="number" min="0" className="form-control form-control-sm" placeholder="0" value={minValue} onChange={e => setMinValue(e.target.value)}/>
        </div>
        <div className="col-md-2">
          <label className="form-label small mb-1">Max Price ($)</label>
          <input type="number" min="0" className="form-control form-control-sm" placeholder="any" value={maxValue} onChange={e => setMaxValue(e.target.value)}/>
        </div>
        <div className="col-md-2">
          <label className="form-label small mb-1">Sort By</label>
          <select className="form-select form-select-sm" value={sortKey} onChange={e => setSortKey(e.target.value)}>
            <option value="name">Name</option>
            <option value="category">Type</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
            <option value="engine">Engine</option>
            <option value="horsepower">Horsepower</option>
            <option value="topSpeed">Top Speed</option>
          </select>
        </div>
        <div className="col-md-1">
          <label className="form-label small mb-1">Dir</label>
          <select className="form-select form-select-sm" value={sortDir} onChange={e => setSortDir(e.target.value)}>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
        <div className="col-12">
          <button
            className={'btn btn-sm ' + (favOnly ? 'btn-warning' : 'btn-outline-warning')}
            onClick={() => setFavOnly(!favOnly)}
          >
            ⭐ {favOnly ? 'Showing Favourites' : 'Show Favourites Only'}
          </button>
        </div>
      </div>

      {derived.length === 0 && (
        <div className="alert alert-info">No bikes found. Try adjusting your filters or <a href="#/new">add a new bike</a>.</div>
      )}

      <div className="row g-3">
        {derived.map(bike => (
          <div key={bike.id} className="col-sm-6 col-md-4 col-lg-3">
            <ItemCard
              bike={bike}
              onView={id => navigate(`/item/${id}`)}
              onEdit={id => navigate(`/edit/${id}`)}
              onDelete={handleDelete}
              onFavourite={toggleFavourite}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
