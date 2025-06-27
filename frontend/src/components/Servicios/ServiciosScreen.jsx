import React from 'react';
import styles from './ServiciosScreen.module.css';
import ServicioCard from './ServicioCard';

const ServiciosScreen = () => {
  // Datos de servicios individuales completos con id y duracion fija 60
  const serviciosIndividuales = [
    {
      id: 1,
      nombre: "Masajes",
      imagen: "images/masaje1.png",
      descripcion: "Anti-stress, Descontracturantes, Piedras calientes, Circulatorios",
      precio: 4500,
      duracion: 60 // minutos
    },
    {
      id: 2,
      nombre: "Belleza",
      imagen: "images/belleza1.jpg",
      descripcion: "Lifting de pestaña, Depilación facial, Belleza de manos y pies",
      precio: 3800,
      duracion: 60,
      reverse: true
    },
    {
      id: 3,
      nombre: "Tratamientos Faciales",
      imagen: "images/tratamientofacial1.jpg",
      descripcion: "Punta de Diamante, Limpieza + Hidratación, Crio frecuencia facial",
      precio: 5200,
      duracion: 60
    },
    {
      id: 4,
      nombre: "Tratamientos Corporales",
      imagen: "images/tratamientos-corporales.webp",
      descripcion: "VelaSlim, DermoHealth, Criofrecuencia, Ultracavitación",
      precio: 6800,
      duracion: 60,
      reverse: true
    }
  ];

  // Datos de servicios grupales con id y duracion 60
  const serviciosGrupales = [
    {
      id: 5,
      nombre: "Hidromasajes",
      imagen: "images/hidromasajes.jpg",
      descripcion: "Sesiones grupales, Aromaterapia opcional, Hasta 8 personas",
      precio: 8500,
      duracion: 60
    },
    {
      id: 6,
      nombre: "Yoga Grupal",
      imagen: "images/yoga1.jpg",
      descripcion: "Vinyasa & Hatha, Máx. 10 personas, Incluye materiales",
      precio: 7200,
      duracion: 60
    }
  ];

  return (
    <div className={styles.serviciosSection}>
      <div className="container">
        <h2 style={{ 
          textAlign: 'center', 
          fontSize: '36px', 
          color: '#5a6f80', 
          marginBottom: '50px', 
          textTransform: 'uppercase'
        }}>
          Servicios Individuales
        </h2>

        {serviciosIndividuales.map((servicio, index) => (
          <ServicioCard 
            key={servicio.id}
            servicio={servicio}
            reverse={index % 2 !== 0}
          />
        ))}

        <h2 style={{ 
          textAlign: 'center', 
          fontSize: '36px', 
          color: '#5a6f80', 
          margin: '60px 0 30px', 
          textTransform: 'uppercase'
        }}>
          Servicios Grupales
        </h2>

        <div className={styles.serviciosGrupales}>
          {serviciosGrupales.map(servicio => (
            <ServicioCard 
              key={servicio.id}
              servicio={servicio}
              esGrupal={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiciosScreen;
