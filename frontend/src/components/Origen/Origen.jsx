import React from 'react';
import styles from './Origen.module.css';

const Origen = () => {
  return (
    <section className={styles.origen}>
      <div className={styles.origenContent}>
        <h2>Origen</h2>
        <p className={styles.txtP}>
          'SPA Sentirse Bien' brotó de un anhelo profundo por compartir la dicha del bienestar integral en Resistencia. 
          Con la firme creencia en la armonía de cuerpo, mente y espíritu, soñamos con un refugio de paz. 
          Así nacieron nuestros tres pilares: Bienestar Integral, Experiencia Personalizada y un Refugio de Calma y Conexión, 
          la esencia de cada experiencia que ofrecemos para que cada persona simplemente... se sienta bien.
        </p>

        {/* Texto que se desplaza horizontalmente */}

        <div className={styles.pilaresGroup}>
          <div className={styles.pilar}>
            <img src="/images/iconpilar2.png" alt="Bienestar Integral" />
            <h3>Bienestar Integral</h3>
            <p>
              Buscamos la armonía entre salud física, claridad mental y serenidad emocional. 
              Cada experiencia está diseñada para abordar estas dimensiones de forma holística.
            </p>
          </div>

          <div className={styles.pilar}>
            <img src="/images/iconpilar3.png" alt="Experiencia Personalizada" />
            <h3>Experiencia Personalizada</h3>
            <p>
              Reconocemos la singularidad de cada cliente. Adaptamos nuestros servicios para ofrecer 
              experiencias que resuenen profundamente con sus necesidades individuales.
            </p>
          </div>

          <div className={styles.pilar}>
            <img src="/images/iconpilar1.png" alt="Refugio de Calma" />
            <h3>Refugio de Calma y Conexión</h3>
            <p>
              Creamos un ambiente de tranquilidad y desconexión. Cada detalle está pensado para ofrecer 
              un espacio donde los clientes puedan reconectar consigo mismos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Origen;