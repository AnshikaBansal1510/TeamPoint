import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FiSettings } from 'react-icons/fi'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Ecommerce, Orders, Calendar, Employees, Stacked, Pyramid, Customers, Kanban, Line, Area, Bar, Pie, Financial, ColorMapping, Editor } from './pages';
import { useStateContext } from './contexts/ContextProvider';
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import './App.css'

function App() {
  const { activeMenu, themeSettings, setThemeSettings, currentColor, currentMode } = useStateContext()

  return (
    <AuthProvider>
      <div className={currentMode === 'Dark'? 'dark' : ''}>
        <BrowserRouter>
          <Routes>
            {/* Login page */}
            <Route path="/login" element={<Login />} />

            {/* Protected Dashboard Routes */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <div className="flex relative dark:bg-secondary-dark-bg">
                    <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
                      <TooltipComponent content="Settings" position="Top">
                        <button
                          type="button"
                          className='text-3xl p-3 hover:drop-shadow-xl hover:bg-gray-100 text-white'
                          style={{ background: currentColor, borderRadius: '50%' }}
                          onClick={() => setThemeSettings(true)}
                        >
                          <FiSettings />
                        </button>
                      </TooltipComponent>
                    </div>

                    { activeMenu ? (
                      <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'>
                        <Sidebar />
                      </div>
                    ) : (
                      <div className='w-0 dark:bg-dark-gray'>
                        <Sidebar />
                      </div>
                    )}

                    <div className={`dark:bg-main-bg bg-main-bg min-h-screen w-full ${activeMenu ? 'md:ml-72' : 'flex-2'}`}>
                      <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                        <Navbar />
                      </div>
                    
                      <div>
                        {themeSettings && <ThemeSettings />}
                        <Routes>
                          {/* Dashboard */}
                          <Route path="/" element={<Ecommerce />} />
                          <Route path="/ecommerce" element={<Ecommerce/>} />

                          {/* Pages */}
                          <Route path="/orders" element={<Orders/>} />
                          <Route path="/employees" element={<Employees/>} />
                          <Route path="/customers" element={<Customers/>} />

                          {/* Apps */}
                          <Route path="/kanban" element={<Kanban/>} />
                          <Route path="/editor" element={<Editor/>} />
                          <Route path="/calendar" element={<Calendar/>} />

                          {/* Charts */}
                          <Route path="/line" element={<Line/>} />
                          <Route path="/area" element={<Area/>} />
                          <Route path="/bar" element={<Bar/>} />
                          <Route path="/pie" element={<Pie/>} />
                          <Route path="/financial" element={<Financial/>} />
                          <Route path="/color-mapping" element={<ColorMapping/>} />
                          <Route path="/pyramid" element={<Pyramid/>} />
                          <Route path="/stacked" element={<Stacked/>} />
                        </Routes>
                      </div>
                    </div>  
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  )
}

export default App
