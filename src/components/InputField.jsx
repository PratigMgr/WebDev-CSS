//Name: Pratig Thapa Magar
//Course Code: INFT 2202
//Date: 2025-04-20
//Description: This component is a reusable input field that can be used in forms. It takes in props for the label, value, onChange handler, onBlur handler, error message, and placeholder text. 
// It displays the label and input field, and if there is an error message, it displays it below the input field.

import React from 'react'

export default function InputField({ label, value, onChange, onBlur, error, placeholder }) {
  return (<div className="mb-3">
    <label className="form-label">{label}</label>
    <input className={'form-control' + (error ? ' is-invalid' : '')}
           value={value} onChange={e => onChange(e.target.value)} onBlur={onBlur} placeholder={placeholder}/>
    {error && <div className="invalid-feedback">{error}</div>}
  </div>)
}