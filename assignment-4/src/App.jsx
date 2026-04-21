import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import HomeView from './views/HomeView'
import ListView from './views/ListView'
import DetailView from './views/DetailView'
import CreateEditView from './views/CreateEditView'
import { ItemsProvider } from './context/ItemsContext'

export default function App(){
  return (
    <ItemsProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeView />} />
          <Route path="list" element={<ListView />} />
          <Route path="item/:id" element={<DetailView />} />
          <Route path="new" element={<CreateEditView />} />
          <Route path="edit/:id" element={<CreateEditView />} />
          <Route path="*" element={<div className="alert alert-warning">Not Found</div>} />
        </Route>
      </Routes>
    </ItemsProvider>
  )
}
