import React from 'react';
import styles from './MissionVision.module.css';
import hidromasajesImage from '../../assets/images/hidromasajes.jpg'; // Asegúrate de tener esta imagen
import yogaImage from '../../assets/images/yoganazi.jpg'; // Asegúrate de tener esta imagen

const MissionVision = () => {
  return (
    <>
      {/* Sección Objetivos */}
      <section className={styles.general}>
        <div className={styles.general1}>
          <h2>Objetivos</h2>
          <p>
            Nuestro objetivo primordial en 'SPA Sentirse Bien' es establecer un santuario 
            de bienestar integral líder y preferido en Resistencia y la región, donde cada 
            persona encuentre un espacio dedicado a la relajación profunda y la revitalización completa
          </p>
          <p>
            Aspiramos a ofrecer experiencias personalizadas y de excelencia a través de una cuidada selección 
            de tratamientos terapéuticos y holísticos, brindados por un equipo comprometido con el bienestar individual. 
          </p>
          <p>
            Buscamos promover activamente la importancia del autocuidado y el equilibrio entre cuerpo y mente 
            en nuestra comunidad, contribuyendo positivamente a una vida más saludable y consciente. 
            A largo plazo, nuestro objetivo es consolidarnos como un referente de bienestar y armonía, 
            donde cada visita sea un paso significativo hacia el sentirse bien.
          </p>
        </div>
        <div 
          className={styles.general2} 
          style={{ backgroundImage: `url(${hidromasajesImage})` }}
        ></div>
      </section>

      {/* Sección Visión */}
      <section className={styles.general}>
        <div 
          className={styles.general3} 
          style={{ backgroundImage: `url(${yogaImage})` }}
        ></div>
        <div className={styles.general1}>
          <h2>Visión</h2>
          <p>
            Nuestra visión para 'SPA Sentirse Bien' es convertirnos en el destino líder y preferido en Resistencia y la región para aquellos
            que buscan un bienestar integral y una experiencia de relajación excepcional.
          </p>
          <p>
            Aspiramos a ser reconocidos por nuestra excelencia
            en la calidad de nuestros servicios, la atención personalizada de nuestro equipo y la creación de un ambiente de profunda calma y
            armonía.
          </p>
          <p>
            Buscamos expandir nuestros servicios y llegar a un público cada vez mayor, promoviendo la importancia del autocuidado y
            contribuyendo positivamente al bienestar de la comunidad.
          </p>
          <p>
            A largo plazo, visualizamos a 'SPA Sentirse Bien' como un símbolo de equilibrio,
            salud y renovación, un lugar donde cada visita sea un paso hacia una vida más plena y consciente.
          </p>
        </div>
      </section>
    </>
  );
};

export default MissionVision;