import React, { useState, useEffect } from 'react';
import styles from './UserManagementTab.module.css';

const UserManagementTab = () => {
  const [users, setUsers] = useState([]);

  // Cargar usuarios al montar
  useEffect(() => {
    fetch('http://localhost:8080/api/usuarios') // Ajustá la URL si usás proxy
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Error al obtener usuarios:', err));
  }, []);

  // Cambiar estado activo/inactivo
  const toggleUserStatus = async (userId) => {
    try {
      await fetch(`http://localhost:8080/api/usuarios/${userId}/estado`, {
        method: 'PUT',
      });

      // Actualizar localmente el estado
      setUsers(users.map(user =>
        user.id === userId ? { ...user, active: !user.active } : user
      ));
    } catch (error) {
      console.error('Error al cambiar el estado del usuario:', error);
    }
  };

  // Eliminar usuario con confirmación
  const handleDeleteUser = async (userId) => {
    const confirmar = window.confirm('¿Está seguro que desea eliminar este usuario permanentemente?');
    if (!confirmar) return;

    try {
      await fetch(`http://localhost:8080/api/usuarios/${userId}`, {
        method: 'DELETE',
      });

      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
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
