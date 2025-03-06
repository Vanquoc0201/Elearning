import './App.scss'
import { BrowserRouter, Routes } from 'react-router-dom'
import { routes,renderRoutes } from './routes'

function App() {


  return (
     <BrowserRouter>
      <Routes>
        {renderRoutes(routes)}
      </Routes>
     </BrowserRouter>
  )
}

export default App
