import React, { createContext } from 'react'

export const ItemsContext = createContext(null)

export function ItemsProvider({ children }) {
  //initialize state and handlers (consider a custom useItems hook)
  //expose items, derived list, filter state, CRUD handlers
    const value = useItems()
   

  return <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
}
