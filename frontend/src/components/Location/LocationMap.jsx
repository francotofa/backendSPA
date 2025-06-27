import React from 'react';
import styles from './LocationMap.module.css';

const LocationMap = () => {
  return (
    <div className={styles.mapContainer}>
      <h2 className={styles.mapTitle}>Nuestra Ubicación</h2>
      <div className={styles.mapWrapper}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1770.2913118002436!2d-58.981392401605234!3d-27.451115399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94450cf0c80be0d3%3A0xc9f9278c74810912!2sUTN%20-%20Facultad%20Regional%20Resistencia!5e0!3m2!1ses-419!2sar!4v1747882435490!5m2!1ses-419!2sar"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación de SPA Sentirse Bien"
          className={styles.mapIframe}
        ></iframe>
      </div>
      <div className={styles.locationInfo}>
        <p><strong>Dirección:</strong> C. French 414, Resistencia, Chaco</p>
        <p><strong>Horario:</strong> Lunes a Sabados: 9:00 - 17:00 </p>
      </div>
    </div>
  );
};

export default LocationMap;