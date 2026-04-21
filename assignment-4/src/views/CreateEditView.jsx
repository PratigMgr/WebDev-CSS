import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ItemForm from '../components/ItemForm'
import { ItemsContext } from '../context/ItemsContext'

export default function CreateEditView(){
  const { id } = useParams()
  const navigate = useNavigate()
  const ctx = useContext(ItemsContext)
  //initial if editing; onSave add/update then navigate
    function handleSave(data){
    if (id) {
      updateItem(id, data)
      navigate(`/item/${id}`)
    } else {
      const newItem = addItem(data)
      navigate(`/item/${newItem.id}`)
    }
  }
  return (
    <div>
      <h2 className="h5 mb-3">{id ? 'Edit Item' : 'Add Item'}</h2>
      <ItemForm 
        initial={existing || {}}
        onSave={handleSave}
        onCancel={id ? () => navigate(`/item/${id}`) : () => navigate('/list')} />
    </div>
  )
}
