import React, { useState } from 'react'
import InputField from './InputField'
import UserFormValidation from '../hooks/UserFormValidation'

const validators = {
  name:     (v) => { if (!v.trim()) return 'Name is required.'; if (v.trim().length < 2) return 'Name must be at least 2 characters.'; return null },
  category: (v) => { if (!v.trim()) return 'Category is required.'; return null },
  price:    (v) => { if (v === '' || v === undefined) return null; if (isNaN(parseFloat(v)) || parseFloat(v) < 0) return 'Price must be a non-negative number.'; return null },
  rating:   (v) => { if (v === '' || v === undefined) return null; if (isNaN(parseFloat(v)) || parseFloat(v) < 0 || parseFloat(v) > 10) return 'Rating must be between 0 and 10.'; return null },
}

export default function ItemForm({ initial, onSave, onCancel }){
  //validation hook for form state + other handlers
  const { values, errors, touched, handleChange, handleBlur, validateAll } =
    UserFormValidation({
      name:        initial?.name        || '',
      category:    initial?.category    || '',
      price:       initial?.price       ?? '',
      rating:      initial?.rating      ?? '',
      description: initial?.description || ''
    }, validators)

  function onSubmit(e){
    e.preventDefault()
     /*validate + save */
    const e2 = validateAll()
    if (Object.values(e2).every(v => !v)){
      onSave({
        name:        values.name.trim(),
        category:    values.category.trim(),
        price:       values.price  !== '' ? parseFloat(values.price)  : '',
        rating:      values.rating !== '' ? parseFloat(values.rating) : '',
        description: values.description.trim()
      })
    }
  }
  return (
    <form className="row g-3" onSubmit={onSubmit} noValidate>
      {/* TODO: name/title (required) */}
      <div className="col-12">
        <InputField label="Name *" value={values.name} onChange={v => handleChange('name', v)} onBlur={() => handleBlur('name')} error={touched.name && errors.name} placeholder="Item name"/>
      </div>
      {/*category (required) */}
     <div className="col-12">
        <InputField label="Category *" value={values.category} onChange={v => handleChange('category', v)} onBlur={() => handleBlur('category')} error={touched.category && errors.category} placeholder="e.g. Electronics, Books…"/>
      </div>
      {/*numeric fields like price with validation */}
      <div className="col-md-6">
        <InputField label="Price ($)" type="number" value={values.price} onChange={v => handleChange('price', v)} onBlur={() => handleBlur('price')} error={touched.price && errors.price} placeholder="0.00"/>
      </div>
      {/* numeric fields like Rating with validation*/}
      <div className="col-md-6">
        <InputField label="Rating (0–10)" type="number" value={values.rating} onChange={v => handleChange('rating', v)} onBlur={() => handleBlur('rating')} error={touched.rating && errors.rating} placeholder="e.g. 8.5"/>
      </div>
      {/*description */}
      <div className="col-12">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          rows={3}
          value={values.description}
          onChange={e => handleChange('description', e.target.value)}
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
