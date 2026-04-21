import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ItemForm from '../components/ItemForm'
import { ItemsContext } from '../context/ItemsContext'

export default function CreateEditView(){
  const { id } = useParams()
  const navigate = useNavigate()
  const ctx = useContext(ItemsContext)
  // TODO: initial if editing; onSave add/update then navigate

  return (
    <div>
      <h2 className="h5 mb-3">{id ? 'Edit Item' : 'Add Item'}</h2>
      <ItemForm /* initial={{}} onSave={(data)=>{}} onCancel={()=>navigate(-1)} */ />
    </div>
  )
}
