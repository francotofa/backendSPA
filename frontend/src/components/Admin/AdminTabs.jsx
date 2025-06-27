import React from 'react';
import styles from './AdminTabs.module.css';

const AdminTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'services', label: 'Gestión de Servicios' },
    { id: 'appointments', label: 'Crear Turnos' },
    { id: 'reports-service', label: 'Reportes por Servicio' },
    { id: 'reports-professional', label: 'Reportes por Profesional' },
    { id: 'users', label: 'Gestión de Usuarios' }
  ];

  return (
    <div className={styles.adminTabs}>
      {tabs.map(tab => (
        <div
          key={tab.id}
          className={`${styles.adminTab} ${activeTab === tab.id ? styles.active : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
};

export default AdminTabs;