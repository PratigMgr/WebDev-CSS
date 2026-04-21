import { useEffect, useMemo, useState } from 'react'
const STORAGE_KEY = 'a4_items'

export default function useItems(){
  const [items, setItems] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [sortKey, setSortKey] = useState('name')
  const [sortDir, setSortDir] = useState('asc')
  const [minValue, setMinValue] = useState('')
  const [maxValue, setMaxValue] = useState('')

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
        const newItem = { ...data, id: Date.now().toString() }
    setItems(prev => [...prev, newItem])
    return newItem
  }
  function updateItem(id, patch){
         setItems(prev => prev.map(item => item.id === id ? { ...item, ...patch } : item))
  }
  function deleteItem(id){ 
        setItems(prev => prev.filter(item => item.id !== id))
  }

  const categories = useMemo(() => {
    const cats = [...new Set(items.map(i => i.category).filter(Boolean))]
    return cats.sort()
  }, [items])


  const derived = useMemo(() => {
      // apply search, category, min/max and sort
    let result = [...items]

    // search filter (name + description)
    if (search.trim()) {
      const term = search.trim().toLowerCase()
      result = result.filter(i =>
        (i.name || '').toLowerCase().includes(term) ||
        (i.description || '').toLowerCase().includes(term)
      )
    }
    
    // category filter
    if (category) {
      result = result.filter(i => i.category === category)
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
  }, [items, search, category, minValue, maxValue, sortKey, sortDir])

  return {
    items, setItems,
    search, setSearch,
    category, setCategory,
    sortKey, setSortKey,
    sortDir, setSortDir,
    minValue, setMinValue,
    maxValue, setMaxValue,
    categories: [],
    derived,
    addItem, updateItem, deleteItem
  }
}
