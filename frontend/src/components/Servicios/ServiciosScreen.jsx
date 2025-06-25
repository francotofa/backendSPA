import React from 'react';
import styles from './ServiciosScreen.module.css';
import ServicioCard from './ServicioCard';

const ServiciosScreen = () => {
  // Datos de servicios individuales completos
  const serviciosIndividuales = [
    {
      nombre: "Masajes",
      imagen: "images/masaje1.png",
      descripcion: "Anti-stress, Descontracturantes, Piedras calientes, Circulatorios",
      precio: 4500,
      duracion: "60 min"
    },
    {
      nombre: "Belleza",
      imagen: "images/belleza1.jpg",
      descripcion: "Lifting de pestaña, Depilación facial, Belleza de manos y pies",
      precio: 3800,
      duracion: "45 min",
      reverse: true // Esta tarjeta tendrá la imagen a la derecha
    },
    {
      nombre: "Tratamientos Faciales",
      imagen: "images/tratamientofacial1.jpg",
      descripcion: "Punta de Diamante, Limpieza + Hidratación, Crio frecuencia facial",
      precio: 5200,
      duracion: "75 min"
    },
    {
      nombre: "Tratamientos Corporales",
      imagen: "images/tratamientos-corporales.webp",
      descripcion: "VelaSlim, DermoHealth, Criofrecuencia, Ultracavitación",
      precio: 6800,
      duracion: "90 min",
      reverse: true // Esta tarjeta tendrá la imagen a la derecha
    }
  ];

  // Datos de servicios grupales
  const serviciosGrupales = [
    {
      nombre: "Hidromasajes",
      imagen: "images/hidromasajes.jpg",
      descripcion: "Sesiones grupales, Aromaterapia opcional, Hasta 8 personas",
      precio: 8500,
      duracion: "60 min"
    },
    {
      nombre: "Yoga Grupal",
      imagen: "images/yoga1.jpg",
      descripcion: "Vinyasa & Hatha, Máx. 10 personas, Incluye materiales",
      precio: 7200,
      duracion: "90 min"
    }
  ];

  return (
    <div className={styles.serviciosSection}>
      <div className="container">
        {/* Título Servicios Individuales */}
        <h2 style={{ 
          textAlign: 'center', 
          fontSize: '36px', 
          color: '#5a6f80', 
          marginBottom: '50px', 
          textTransform: 'uppercase'
        }}>
          Servicios Individuales
        </h2>

        {/* Mapeo de servicios individuales */}
        {serviciosIndividuales.map((servicio, index) => (
          <ServicioCard 
            key={servicio.nombre}
            servicio={servicio}
            reverse={index % 2 !== 0} // Alternar el orden para cada tarjeta
          />
        ))}

        {/* Título Servicios Grupales */}
        <h2 style={{ 
          textAlign: 'center', 
          fontSize: '36px', 
          color: '#5a6f80', 
          margin: '60px 0 30px', 
          textTransform: 'uppercase'
        }}>
          Servicios Grupales
        </h2>

        {/* Contenedor de servicios grupales */}
        <div className={styles.serviciosGrupales}>
          {serviciosGrupales.map(servicio => (
            <ServicioCard 
              key={servicio.nombre}
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