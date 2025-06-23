import React from 'react';
import styles from './Services.module.css';
import fondoImage from '../../assets/images/fondoServiciosIndividuales.jpg';

const Services = () => {
  return (
    <main className={styles.services} id="servicios">
      <div className={`${styles.servicesContent} ${styles.container}`}>
        <h2>Servicios Individuales</h2>
        <div className={styles.servicesGroup}>
          <div className={styles.services1}>
            <img src="/images/iconMasaje1.png" alt="Icono de masajes" />
            <h3>Masajes</h3>
          </div>
          <div className={styles.services1}>
            <img src="/images/iconBelleza2.png" alt="Icono de belleza" />
            <h3>Belleza</h3>
          </div>
          <div className={styles.services1}>
            <img src="/images/iconTratamientoFacial3.png" alt="Icono de tratamientos faciales" />
            <h3>Tratamientos Faciales</h3>
          </div>
          <div className={styles.services1}>
            <img src="/images/iconTratamientoCorporal4.png" alt="Icono de tratamientos corporales" />
            <h3>Tratamientos Corporales</h3>
          </div>
        </div>
        <p>
          Sumérgete en una experiencia de cuidado y relajación diseñada exclusivamente para ti. Elige entre una selección de tratamientos individuales, desde masajes revitalizantes que alivian la tensión hasta tratamientos de belleza que realzan tu luminosidad natural, faciales que rejuvenecen tu piel y corporales que nutren tu cuerpo. Cada servicio es un momento dedicado a tu bienestar personal, brindándote la oportunidad de desconectar, revitalizarte y sentirte renovado de adentro hacia afuera. Descubre el tratamiento perfecto para consentirte.
        </p>
      </div>
    </main>
  );
};

export default Services;