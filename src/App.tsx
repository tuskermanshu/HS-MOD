import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { Logs } from './pages/logs/index'
import { Settings } from './pages/settings'
import { Shortcuts } from './pages/Shortcuts'

function App() {
  return (
    <div className="h-screen overflow-y-auto">
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Settings />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/shortcuts" element={<Shortcuts />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </div>
  )
}

export default App
