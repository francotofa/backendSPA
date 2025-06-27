import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Origen from './components/Origen/Origen';
import Services from './components/Services/Services';
import MissionVision from './components/MissionVision/MissionVision';
import AuthScreen from './components/Auth/AuthScreen';
import RegistroScreen from './components/Auth/RegistroScreen';
import ServiciosScreen from './components/Servicios/ServiciosScreen';
import ReservaPage from './pages/ReservaPage';
import Profile from './components/Profile/Profile';
import Footer from './components/Footer/Footer';
import ProfessionalPage from './pages/ProfessionalPage';
import AdminPage from './pages/AdminPage';
import './App.css';
import PrivateRoute from './components/Auth/PrivateRoute';
import RecuperarScreen from './components/Auth/RecuperarScreen';
import { CarritoProvider } from './components/Context/CarritoContext';

import PromoVideo from './components/PromoVideo/PromoVideo';
import ReviewsSection from './components/Reviews/ReviewsSection';
import Location from './components/Location/LocationMap';
// Componente wrapper modificado para mostrar Header y Footer en todas las páginas
function LayoutWrapper({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer /> {/* Footer siempre visible */}
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
                  <PromoVideo /> 
                  <ReviewsSection />
                  <Location /> 
                </>
              </LayoutWrapper>
            } />
            
            <Route path="/recuperar" element={
              <LayoutWrapper>
                <RecuperarScreen />
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

            <Route path="/professional" element={
              <LayoutWrapper>
                <ProfessionalPage />
              </LayoutWrapper>
            } />

            <Route path="/admin" element={
              <LayoutWrapper>
                <AdminPage />
              </LayoutWrapper>
            } />
          </Routes>
        </div>
      </Router>
    </CarritoProvider>
  ); 
}

export default App;