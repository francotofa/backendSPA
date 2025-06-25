import React from 'react';
import styles from './ServiciosScreen.module.css';
import { FaClock, FaCartPlus, FaCheck } from 'react-icons/fa';

const ServicioCard = ({ servicio, esGrupal = false, reverse = false }) => {
  const [agregado, setAgregado] = React.useState(false);
  
  const handleAgregar = () => {
    // Aquí iría la lógica para agregar al carrito
    setAgregado(true);
    // Simulamos un timeout para que el botón vuelva a su estado original
    setTimeout(() => setAgregado(false), 2000);
  };

  if (esGrupal) {
    return (
      <div className={styles.grupoCard}>
        <div 
          className={styles.grupoImagen} 
          style={{ backgroundImage: `url(${servicio.imagen})` }}
        />
        <div className={styles.grupoContenido}>
          <h3>{servicio.nombre}</h3>
          <ul>
            {servicio.descripcion.split(',').map((item, index) => (
              <li key={index}>
                <span>•</span> {item.trim()}
              </li>
            ))}
          </ul>
          <div className={styles.grupoInfo}>
            <div className={styles.grupoPrecio}>${servicio.precio.toLocaleString()}</div>
            <div className={styles.grupoDuracion}>
              <FaClock /> {servicio.duracion}
            </div>
          </div>
          <div className={styles.grupoBtn}>
            <button 
              className={styles.btnAgregar} 
              onClick={handleAgregar}
              disabled={agregado}
            >
              {agregado ? (
                <>
                  <FaCheck /> Agregado
                </>
              ) : (
                <>
                  <FaCartPlus /> Agregar al carrito
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={styles.servicioCard} 
      style={{ flexDirection: reverse ? 'row-reverse' : 'row' }}
    >
      <div 
        className={styles.servicioImagen} 
        style={{ backgroundImage: `url(${servicio.imagen})` }}
      />
      <div className={styles.servicioContenido}>
        <h3>{servicio.nombre}</h3>
        <ul>
          {servicio.descripcion.split(',').map((item, index) => (
            <li key={index}>
              <span>•</span> {item.trim()}
            </li>
          ))}
        </ul>
        <div className={styles.servicioInfo}>
          <div className={styles.servicioPrecio}>${servicio.precio.toLocaleString()}</div>
          <div className={styles.servicioDuracion}>
            <FaClock /> {servicio.duracion}
          </div>
        </div>
        <button 
          className={styles.btnAgregar} 
          onClick={handleAgregar}
          disabled={agregado}
        >
          {agregado ? (
            <>
              <FaCheck /> Agregado
            </>
          ) : (
            <>
              <FaCartPlus /> Agregar al carrito
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ServicioCard;

