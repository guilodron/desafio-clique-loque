import { BrowserRouter } from 'react-router'
import './global.css'
import { AppRoutes } from './Routes'
import {Toaster} from 'sonner'
import  LoggerContextProvider  from './hooks/loggedContext'

function App() {

  return (
    <LoggerContextProvider>
      <BrowserRouter>
        <Toaster position='top-center' expand richColors />
        <AppRoutes />
      </BrowserRouter>
    </LoggerContextProvider>
  )
}

export default App
