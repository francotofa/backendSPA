import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Origen from './components/Origen/Origen';
import Services from './components/Services/Services';
import MissionVision from './components/MissionVision/MissionVision';
import AuthScreen from './components/Auth/AuthScreen';
import RegistroScreen from './components/Auth/RegistroScreen';
import ServiciosScreen from './components/Servicios/ServiciosScreen';
import ReservaPage from './pages/ReservaPage';
import Profile from './components/Profile/Profile'; // Importa el componente Profile
import Footer from './components/Footer/Footer';
import ProfessionalPage from './pages/ProfessionalPage';
import AdminPage from './pages/AdminPage';
import './App.css';
import PrivateRoute from './components/Auth/PrivateRoute'; // Importa el componente PrivateRoute

import { CarritoProvider } from './components/Context/CarritoContext'; // Importa el contexto del carrito

// Componente wrapper modificado para mostrar Header en todas las páginas
function LayoutWrapper({ children }) {
  return (
    <>
      <Header /> {/* Header siempre visible */}
      {children}
    </>
  );
}

function App() {
  return (
    <CarritoProvider>
      <Router>
        <div className="App">
          <Routes>
          <Route path="/" element={
            <LayoutWrapper>
              <>
                <Origen />
                <Services />
                <MissionVision />
                <Footer />
              </>
            </LayoutWrapper>
          } />

          <Route path="/login" element={
            <LayoutWrapper>
              <AuthScreen />
            </LayoutWrapper>
          } />

          <Route path="/servicios" element={
            <LayoutWrapper>
              <ServiciosScreen />
            </LayoutWrapper>
          } />

            <Route path="/perfil" element={
          <PrivateRoute>
            <LayoutWrapper>
              <Profile />
            </LayoutWrapper>
          </PrivateRoute>
          } />

          <Route path="/registro" element={
            <LayoutWrapper>
              <RegistroScreen />
            </LayoutWrapper>
          } />

          <Route path="/reserva" element={
          <PrivateRoute>
            <LayoutWrapper>
              <ReservaPage />
            </LayoutWrapper>
          </PrivateRoute>
          } />

// En tu App.jsx, agrega esta nueva ruta junto a las demás
<Route path="/professional" element={<ProfessionalPage />} />

<Route path="/admin" element={<AdminPage />} />
          
        </Routes>
        </div>
      </Router>
    </CarritoProvider>
  ); 
}

export default App;