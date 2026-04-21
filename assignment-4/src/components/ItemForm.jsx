import React from 'react'

export default function ItemForm(/* { initial, onSave, onCancel } */){
  function onSubmit(e){ e.preventDefault(); /* TODO: validate + save */ }
  return (
    <form className="row g-3" onSubmit={onSubmit} noValidate>
      {/* TODO: name/title (required) */}
      {/* TODO: category (required) */}
      {/* TODO: numeric fields like price/rating with validation */}
      {/* TODO: description */}
      <div className="col-12 d-flex gap-2">
        <button className="btn btn-primary" type="submit">Save</button>
        {/* TODO: Cancel button in edit mode */}
      </div>
    </form>
  )
}
