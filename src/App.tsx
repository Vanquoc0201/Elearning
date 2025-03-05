import { Suspense } from 'react'
import './App.scss'
import { BrowserRouter, Routes } from 'react-router-dom'
import { routes,renderRoutes } from './routes'

function App() {


  return (
    <Suspense fallback={<div>Loading...</div>}>
     <BrowserRouter>
      <Routes>
        {renderRoutes(routes)}
      </Routes>
     </BrowserRouter>
    </Suspense>
  )
}

export default App
