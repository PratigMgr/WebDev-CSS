import React, { createContext } from 'react'

export const ItemsContext = createContext(null)

export function ItemsProvider({ children }) {
  // TODO: initialize state and handlers (consider a custom useItems hook)

  const value = {
    // TODO: expose items, derived list, filter state, CRUD handlers
  }

  return <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
}
