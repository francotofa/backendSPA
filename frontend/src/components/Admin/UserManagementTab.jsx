import React, { useState } from 'react';
import styles from './UserManagementTab.module.css';

const UserManagementTab = () => {
  // Datos de ejemplo
  const [users, setUsers] = useState([
    { id: 1, name: 'Admin Principal', email: 'admin@spa.com', role: 'admin', active: true },
    { id: 2, name: 'Dra. Ana Felicidad', email: 'ana@spa.com', role: 'professional', active: true },
    { id: 3, name: 'Cliente Ejemplo', email: 'cliente@spa.com', role: 'client', active: false },
    { id: 4, name: 'Dr. Carlos Bienestar', email: 'carlos@spa.com', role: 'professional', active: true }
  ]);

  // Cambiar estado activo/inactivo
  const toggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, active: !user.active } : user
    ));
  };

  // Eliminar usuario con confirmación
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