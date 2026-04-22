//Name: Pratig Thapa Magar
//Course Code: INFT 2202
//Date: 2025-04-20
//Description: This custom hook manages the state and validation of a user form. It takes in initial values and a set of validators for each field. 
// It provides handlers for changing field values, blurring fields (marking them as touched), and validating all fields at once.
//  The hook returns the current values, errors, touched state, and the handlers for use in a form component.

import { useState } from 'react'

export default function UserFormValidation(initialValues, validators) {
  const [values, setValues]   = useState(initialValues)
  const [errors, setErrors]   = useState({})
  const [touched, setTouched] = useState({})

  function handleChange(field, value) {
    setValues(v => ({ ...v, [field]: value }))
    const msg = validators[field] ? validators[field](value) : null
    setErrors(e => ({ ...e, [field]: msg }))
  }

  function handleBlur(field) {
    setTouched(t => ({ ...t, [field]: true }))
  }

  function validateAll() {
    const es = {}
    Object.keys(validators).forEach(field => {
      es[field] = validators[field](values[field] ?? '')
    })
    setErrors(es)
    const allTouched = {}
    Object.keys(validators).forEach(field => { allTouched[field] = true })
    setTouched(allTouched)
    return es
  }

  return { values, errors, touched, handleChange, handleBlur, validateAll }
}