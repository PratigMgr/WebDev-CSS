import React, { useContext } from 'react'
import ItemCard from '../components/ItemCard'
import { ItemsContext } from '../context/ItemsContext'

export default function ListView(){
  const ctx = useContext(ItemsContext)
  const navigate = useNavigate()
  //use ctx.derived and filters
    const {
    derived, categories,
    search, setSearch,
    category, setCategory,
    minValue, setMinValue,
    maxValue, setMaxValue,
    sortKey, setSortKey,
    sortDir, setSortDir,
    deleteItem
  } = ctx

  function handleDelete(id){
    if (window.confirm('Delete this item?')) deleteItem(id)
  }
  return (
    <div>
      <div className="row g-2 align-items-end mb-3">
        {/* search */}
        <div className="col-md-3">
          <label className="form-label small mb-1">Search</label>
          <input
            className="form-control form-control-sm"
            placeholder="Search name or description…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* category filter */}
        <div className="col-md-2">
          <label className="form-label small mb-1">Category</label>
          <select className="form-select form-select-sm" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">All</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        {/* min/max price */}
        <div className="col-md-2">
          <label className="form-label small mb-1">Min Price</label>
          <input
            type="number" min="0" step="0.01"
            className="form-control form-control-sm"
            placeholder="0"
            value={minValue}
            onChange={e => setMinValue(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <label className="form-label small mb-1">Max Price</label>
          <input
            type="number" min="0" step="0.01"
            className="form-control form-control-sm"
            placeholder="any"
            value={maxValue}
            onChange={e => setMaxValue(e.target.value)}
          />
        </div>

        {/* sort key / dir */}
        <div className="col-md-2">
          <label className="form-label small mb-1">Sort By</label>
          <select className="form-select form-select-sm" value={sortKey} onChange={e => setSortKey(e.target.value)}>
            <option value="name">Name</option>
            <option value="category">Category</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
        </div>
        <div className="col-md-1">
          <label className="form-label small mb-1">Dir</label>
          <select className="form-select form-select-sm" value={sortDir} onChange={e => setSortDir(e.target.value)}>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
      </div>

      {/* empty state */}
      {derived.length === 0 && (
        <div className="alert alert-info">No items found. Try adjusting your filters or <a href="#/new">add a new item</a>.</div>
      )}

      <div className="row g-3">
        {/*map ctx.derived to ItemCard */}
        {derived.map(item => (
          <div key={item.id} className="col-sm-6 col-md-4 col-lg-3">
            <ItemCard
              item={item}
              onView={id => navigate(`/item/${id}`)}
              onEdit={id => navigate(`/edit/${id}`)}
              onDelete={handleDelete}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

