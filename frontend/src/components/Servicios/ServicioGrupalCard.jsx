import React from 'react';
import styles from './ServiciosScreen.module.css';
import { FaClock, FaCartPlus } from 'react-icons/fa';

const ServicioGrupalCard = ({ servicio, onAgregarAlCarrito }) => {
  return (
    <div className={styles.tarjetaServicioGrupal}>
      <div 
        className={styles.imagenServicioGrupal}
        style={{ backgroundImage: `url(${servicio.imagen})` }}
      ></div>
      
      <div className={styles.contenidoServicioGrupal}>
        <h3>{servicio.nombre}</h3>
        <ul>
          {servicio.descripcion.split(',').map((item, index) => (
            <li key={index}>
              <span>•</span> {item.trim()}
            </li>
          ))}
        </ul>
        
        <div className={styles.infoServicioGrupal}>
          <div className={styles.precioServicioGrupal}>${servicio.precio.toLocaleString()}</div>
          <div className={styles.duracionServicioGrupal}>
            <FaClock /> {servicio.duracion}
          </div>
        </div>
        
        <button 
          className={styles.botonAgregar}
          onClick={() => onAgregarAlCarrito(servicio)}
        >
          <FaCartPlus /> Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ServicioGrupalCard;