import React, { useContext } from 'react'
import ItemCard from '../components/ItemCard'
import { ItemsContext } from '../context/ItemsContext'

export default function ListView(){
  const ctx = useContext(ItemsContext) // TODO: use ctx.derived and filters

  return (
    <div>
      <div className="row g-2 align-items-end mb-3">
        {/* TODO: search */}
        {/* TODO: category filter */}
        {/* TODO: min/max */}
        {/* TODO: sort key/dir */}
      </div>

      {/* TODO: empty state */}

      <div className="row g-3">
        {/* TODO: map ctx.derived to ItemCard */}
        <div className="col-12"><div className="alert alert-info">TODO: derived list</div></div>
      </div>
    </div>
  )
}
