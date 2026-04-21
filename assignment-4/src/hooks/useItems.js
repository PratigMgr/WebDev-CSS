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

  // TODO: load from localStorage on mount

  // TODO: persist to localStorage when items change

  function addItem(/* data */){ /* TODO */ }
  function updateItem(/* id, patch */){ /* TODO */ }
  function deleteItem(/* id */){ /* TODO */ }

  // const categories = useMemo(() => { /* TODO */ }, [items])

  const derived = useMemo(() => {
    // TODO: apply search, category, min/max and sort
    return items
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
