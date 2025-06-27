import React, { useState } from 'react';
import styles from './UserManagementTab.module.css';

const UserManagementTab = () => {
  // Datos de usuarios reales
  const [users, setUsers] = useState([
    { id: 14, name: 'Dra Ana', email: 'AnaSpa@example.com', role: 'admin', active: true },
    { id: 11, name: 'Martín Pérez', email: 'martin.perez@example.com', role: 'professional', active: true },
    { id: 12, name: 'Silvia Gómez', email: 'silvia.gomez@example.com', role: 'professional', active: true },
    { id: 13, name: 'Lucia Asselborn', email: 'lucia.a@example.com', role: 'professional', active: true },
    { id: 4, name: 'Lucho Frias', email: 'lfk@example.com', role: 'client', active: false },
    { id: 10, name: 'Juan Jesus', email: 'jesus@example.com', role: 'client', active: true },
    { id: 14, name: 'Ramiro Ramirez', email: 'ramiroRR@example.com', role: 'client', active: true },
    { id: 14, name: 'Gabriel Klein', email: 'ayrton@hotmail.com', role: 'client', active: true },
    { id: 15, name: 'Franco Gonzales', email: 'francoG@example.com', role: 'client', active: true }
    
  ]);

  const toggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, active: !user.active } : user
    ));
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('¿Está seguro que desea eliminar este usuario permanentemente?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  return (
    <div className={styles.userManagement}>
      <h2>Gestión de Usuarios</h2>

      <table className={styles.usersTable}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.role === 'admin' && 'Administrador'}
                {user.role === 'professional' && 'Profesional'}
                {user.role === 'client' && 'Cliente'}
              </td>
              <td>
                <span className={`${styles.status} ${user.active ? styles.active : styles.inactive}`}>
                  {user.active ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td className={styles.actions}>
                <button 
                  onClick={() => toggleUserStatus(user.id)}
                  className={user.active ? styles.deactivateBtn : styles.activateBtn}
                >
                  {user.active ? 'Desactivar' : 'Activar'}
                </button>
                <button 
                  onClick={() => handleDeleteUser(user.id)}
                  className={styles.deleteBtn}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagementTab;
