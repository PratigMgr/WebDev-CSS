//Name: Pratig Thapa Magar
//Course Code: INFT 2202
//Date: 2025-04-20
//Description: This component is a form for creating or editing a bike item. 
// It uses the UserFormValidation hook to manage form state and validation. 
//  It validates the required fields and calls the onSave callback with the form data when submitted.

import React from 'react'
import InputField from './InputField'
import UserFormValidation from '../hooks/UserFormValidation'

const BIKE_TYPES = ['Sportbike', 'Cruiser', 'Naked', 'Touring', 'Supermoto', 'Dirt', 'Scooter']

const validators = {
  name:       (v) => { if (!v.trim()) return 'Brand/Model is required.'; if (v.trim().length < 2) return 'Must be at least 2 characters.'; return null },
  category:   (v) => { if (!v.trim()) return 'Bike type is required.'; return null },
  price:      (v) => { if (!v && v !== 0) return 'Price is required.'; if (isNaN(parseFloat(v)) || parseFloat(v) < 0) return 'Price must be a non-negative number.'; return null },
  engine:     (v) => { if (!v && v !== 0) return 'Engine size is required.'; if (isNaN(parseFloat(v)) || parseFloat(v) <= 0) return 'Engine size must be a positive number.'; return null },
  horsepower: (v) => { if (!v && v !== 0) return 'Horsepower is required.'; if (isNaN(parseFloat(v)) || parseFloat(v) <= 0) return 'Horsepower must be a positive number.'; return null },
  topSpeed:   (v) => { if (!v && v !== 0) return 'Top speed is required.'; if (isNaN(parseFloat(v)) || parseFloat(v) <= 0) return 'Top speed must be a positive number.'; return null },
  rating:     (v) => { if (!v && v !== 0) return 'Rating is required.'; if (isNaN(parseFloat(v)) || parseFloat(v) < 0 || parseFloat(v) > 10) return 'Rating must be between 0 and 10.'; return null },
}


export default function ItemForm({ initial, onSave, onCancel }){
  //validation hook for form state + other handlers
  const { values, errors, touched, handleChange, handleBlur, validateAll } =
    UserFormValidation({
      name:       initial?.name       || '',
      category:   initial?.category   || '',
      price:      initial?.price      ?? '',
      engine:     initial?.engine     ?? '',
      horsepower: initial?.horsepower ?? '',
      topSpeed:   initial?.topSpeed   ?? '',
      rating:     initial?.rating     ?? '',
      favourite:  initial?.favourite  || false,
      notes:      initial?.notes      || ''
    }, validators)

  function onSubmit(e){
    e.preventDefault()
     /*validate + save */
    const e2 = validateAll()
    if (Object.values(e2).every(v => !v)){
      onSave({
        name:       values.name.trim(),
        category:   values.category,
        price:      values.price      !== '' ? parseFloat(values.price)      : '',
        engine:     values.engine     !== '' ? parseFloat(values.engine)     : '',
        horsepower: values.horsepower !== '' ? parseFloat(values.horsepower) : '',
        topSpeed:   values.topSpeed   !== '' ? parseFloat(values.topSpeed)   : '',
        rating:     values.rating     !== '' ? parseFloat(values.rating)     : '',
         favourite:  values.favourite  || false,
        notes:      values.notes.trim()
      })
    }
  }
  return (
     <form className="row g-3" onSubmit={onSubmit} noValidate>
      {/* Brand/Model (required) */}
      <div className="col-12">
        <InputField label="Brand / Model *" value={values.name} onChange={v => handleChange('name', v)} onBlur={() => handleBlur('name')} error={touched.name && errors.name} placeholder="e.g. Yamaha R1, Kawasaki Z900"/>
      </div>

      {/* Bike Type dropdown (required) */}
      <div className="col-12">
        <label className="form-label">Bike Type *</label>
        <select
          className={'form-select' + (touched.category && errors.category ? ' is-invalid' : '')}
          value={values.category}
          onChange={e => handleChange('category', e.target.value)}
          onBlur={() => handleBlur('category')}
        >
          <option value="">Select bike type…</option>
          {BIKE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        {touched.category && errors.category && <div className="invalid-feedback">{errors.category}</div>}
      </div>

      {/* Price */}
      <div className="col-md-6">
        <InputField label="Price ($)*" type="number" value={values.price} onChange={v => handleChange('price', v)} onBlur={() => handleBlur('price')} error={touched.price && errors.price} placeholder="e.g. 15000"/>
      </div>

      {/* Engine */}
      <div className="col-md-6">
        <InputField label="Engine (cc)*" type="number" value={values.engine} onChange={v => handleChange('engine', v)} onBlur={() => handleBlur('engine')} error={touched.engine && errors.engine} placeholder="e.g. 998"/>
      </div>

      {/* Horsepower */}
      <div className="col-md-6">
        <InputField label="Horsepower (hp)*" type="number" value={values.horsepower} onChange={v => handleChange('horsepower', v)} onBlur={() => handleBlur('horsepower')} error={touched.horsepower && errors.horsepower} placeholder="e.g. 200"/>
      </div>

      {/* Top Speed */}
      <div className="col-md-6">
        <InputField label="Top Speed (km/h)*" type="number" value={values.topSpeed} onChange={v => handleChange('topSpeed', v)} onBlur={() => handleBlur('topSpeed')} error={touched.topSpeed && errors.topSpeed} placeholder="e.g. 299"/>
      </div>

      {/* Rating */}
      <div className="col-md-6">
        <InputField label="Rating (0–10)" type="number*" value={values.rating} onChange={v => handleChange('rating', v)} onBlur={() => handleBlur('rating')} error={touched.rating && errors.rating} placeholder="e.g. 9.0"/>
      </div>
      {/* Favourite */}
      <div className="col-12">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="favourite"
            checked={values.favourite || false}
            onChange={e => handleChange('favourite', e.target.checked)}
          />
          <label className="form-check-label" htmlFor="favourite">⭐ Mark as Favourite</label>
        </div>
      </div>


      {/* Notes */}
      <div className="col-12">
        <label className="form-label">Notes</label>
        <textarea
          className="form-control"
          rows={3}
          value={values.notes}
          onChange={e => handleChange('notes', e.target.value)}
          placeholder="e.g. Great handling, smooth throttle response…"
        />
      </div>

      <div className="col-12 d-flex gap-2">
        <button className="btn btn-primary" type="submit">Save</button>
        {onCancel && (
          <button className="btn btn-outline-secondary" type="button" onClick={onCancel}>Cancel</button>
        )}
      </div>
    </form>
  )
}