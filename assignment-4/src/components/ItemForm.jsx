import React from 'react'

export default function ItemForm({ initial, onSave, onCancel }){
  const [name, setName] = useState(initial?.name || '')
  const [category, setCategory] = useState(initial?.category || '')
  const [price, setPrice] = useState(initial?.price ?? '')
  const [rating, setRating] = useState(initial?.rating ?? '')
  const [description, setDescription] = useState(initial?.description || '')
  const [errors, setErrors] = useState({})

  function validate(){
    const e = {}
    if (!name.trim()) e.name = 'Name is required.'
    if (!category.trim()) e.category = 'Category is required.'
    if (price !== '' && (isNaN(parseFloat(price)) || parseFloat(price) < 0))
      e.price = 'Price must be a non-negative number.'
    if (rating !== '' && (isNaN(parseFloat(rating)) || parseFloat(rating) < 0 || parseFloat(rating) > 10))
      e.rating = 'Rating must be between 0 and 10.'
    return e
  }
  function onSubmit(e){
    e.preventDefault()
     /*validate + save */
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }
    setErrors({})
    onSave({
      name: name.trim(),
      category: category.trim(),
      price: price !== '' ? parseFloat(price) : '',
      rating: rating !== '' ? parseFloat(rating) : '',
      description: description.trim()
    })
  }
  return (
    <form className="row g-3" onSubmit={onSubmit} noValidate>
      {/* TODO: name/title (required) */}
        <div className="col-12">
        <label className="form-label">Name <span className="text-danger">*</span></label>
        <input
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Item name"
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>
      {/*category (required) */}
        <div className="col-12">
        <label className="form-label">Category <span className="text-danger">*</span></label>
        <input
          className={`form-control ${errors.category ? 'is-invalid' : ''}`}
          value={category}
          onChange={e => setCategory(e.target.value)}
          placeholder="e.g. Electronics, Books…"
        />
        {errors.category && <div className="invalid-feedback">{errors.category}</div>}
      </div>
      {/*numeric fields like price with validation */}
      <div className="col-md-6">
        <label className="form-label">Price ($)</label>
        <input
          type="number"
          min="0"
          step="0.01"
          className={`form-control ${errors.price ? 'is-invalid' : ''}`}
          value={price}
          onChange={e => setPrice(e.target.value)}
          placeholder="0.00"
        />
        {errors.price && <div className="invalid-feedback">{errors.price}</div>}
      </div>
      {/* numeric fields like Rating with validation*/}
      <div className="col-md-6">
        <label className="form-label">Rating (0–10)</label>
        <input
          type="number"
          min="0"
          max="10"
          step="0.1"
          className={`form-control ${errors.rating ? 'is-invalid' : ''}`}
          value={rating}
          onChange={e => setRating(e.target.value)}
          placeholder="e.g. 8.5"
        />
        {errors.rating && <div className="invalid-feedback">{errors.rating}</div>}
      </div>
      {/*description */}
      <div className="col-12">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          rows={3}
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Optional description"
        />
      </div>

      <div className="col-12 d-flex gap-2">
        <button className="btn btn-primary" type="submit">Save</button>
        {/* Cancel button in edit mode */}
        {onCancel && (
          <button className="btn btn-outline-secondary" type="button" onClick={onCancel}>Cancel</button>
        )}
      </div>
    </form>
  )
}
