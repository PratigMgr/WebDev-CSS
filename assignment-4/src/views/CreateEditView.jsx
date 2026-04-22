//Name: Pratig Thapa Magar
//Course Code: INFT 2202
//Date: 2025-04-20
//Description: This component handles both the creation and editing of bike items. 
// It uses the useParams hook to determine if an ID is present in the URL, which indicates whether the form is in create or edit mode.


import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ItemForm from '../components/ItemForm'
import { ItemsContext } from '../context/ItemsContext'

export default function CreateEditView(){
  const { id } = useParams()
  const navigate = useNavigate()
  const { items, addItem, updateItem } = useContext(ItemsContext)
  //initial if editing; onSave add/update then navigate
    const existing = id ? items.find(i => i.id === id) : null

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
