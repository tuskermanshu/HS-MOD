import { BrowserRouter, Routes, Route } from "react-router-dom"
import { MainLayout } from "./layouts/MainLayout"
import { Settings } from "./pages/settings"
import { Logs } from "./pages/Logs"
import { Shortcuts } from "./pages/Shortcuts"

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Settings />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/shortcuts" element={<Shortcuts />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
