//Name: Pratig Thapa Magar
//Course Code: INFT 2202
//Date: 2025-04-20
//Description: This custom hook manages the state of the bike items, including loading and saving to localStorage, 
// and providing handlers for adding, updating, deleting, and toggling favourites.

import { useEffect, useMemo, useState } from 'react'
const STORAGE_KEY = 'a4_bikes'

export default function useItems(){
  const [items, setItems] = useState([])
  const [search, setSearch] = useState('')
  const [bikeType, setBikeType] = useState('')
  const [sortKey, setSortKey] = useState('name')
  const [sortDir, setSortDir] = useState('asc')
  const [minValue, setMinValue] = useState('')
  const [maxValue, setMaxValue] = useState('')
  const [favOnly, setFavOnly] = useState(false)

  // load from localStorage on mount
   useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setItems(JSON.parse(stored))
    } catch {
      // ignore parse errors
    }
  }, [])


  //persist to localStorage when items change
    useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function addItem(data){
        const newItem = { ...data, id: Date.now().toString(), favourite: false }
    setItems(prev => [...prev, newItem])
    return newItem
  }
  function updateItem(id, patch){
         setItems(prev => prev.map(item => item.id === id ? { ...item, ...patch } : item))
  }
  function deleteItem(id){ 
        setItems(prev => prev.filter(item => item.id !== id))
  }
    function toggleFavourite(id){
    setItems(prev => prev.map(item => item.id === id ? { ...item, favourite: !item.favourite } : item))
  }


  const derived = useMemo(() => {
      // apply search, type, min/max and sort
    let result = [...items]

     if (favOnly) {
      result = result.filter(i => i.favourite)
    }

    // search filter (name + description)
    if (search.trim()) {
      const term = search.trim().toLowerCase()
      result = result.filter(i =>
        (i.name || '').toLowerCase().includes(term) ||
        (i.notes || '').toLowerCase().includes(term)
      )
    }
    // bike type filter
    if (bikeType) {
      result = result.filter(i => i.category === bikeType)
    }
    
    // min/max price filter
    if (minValue !== '') {
      result = result.filter(i => parseFloat(i.price) >= parseFloat(minValue))
    }
    if (maxValue !== '') {
      result = result.filter(i => parseFloat(i.price) <= parseFloat(maxValue))
    }
        // sort
    result.sort((a, b) => {
      let aVal = a[sortKey] ?? ''
      let bVal = b[sortKey] ?? ''
      if (!isNaN(parseFloat(aVal)) && !isNaN(parseFloat(bVal))) {
        aVal = parseFloat(aVal)
        bVal = parseFloat(bVal)
      } else {
        aVal = String(aVal).toLowerCase()
        bVal = String(bVal).toLowerCase()
      }
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1
      return 0
    })

    return result
  }, [items, search, bikeType, minValue, maxValue, sortKey, sortDir, favOnly])

  return {
    items, setItems,
    search, setSearch,
    sortKey, setSortKey,
    sortDir, setSortDir,
    minValue, setMinValue,
    maxValue, setMaxValue,
    favOnly, setFavOnly,
    bikeType, setBikeType,
    derived,
    addItem, updateItem, deleteItem, toggleFavourite
  }
}
