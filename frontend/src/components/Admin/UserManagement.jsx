// components/Admin/UserManagement.jsx
import React, { useState, useEffect } from 'react';
import styles from './UserManagement.module.css';

const UserManagement = () => {
  // Estados del componente
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'professional'
  });
  const [editingUserId, setEditingUserId] = useState(null);

  // Roles disponibles
  const availableRoles = [
    { value: 'admin', label: 'Administrador' },
    { value: 'professional', label: 'Profesional' },
    { value: 'reception', label: 'Recepción' }
  ];

  // Cargar usuarios (simulando API)
  useEffect(() => {
    // En una app real, esto vendría de tu backend
    const mockUsers = [
      { id: 1, name: 'Ana Felicidad', email: 'ana@spa.com', role: 'professional', active: true },
      { id: 2, name: 'Carlos Bienestar', email: 'carlos@spa.com', role: 'professional', active: false },
      { id: 3, name: 'María Recepción', email: 'maria@spa.com', role: 'reception', active: true }
    ];
    setUsers(mockUsers);
  }, []);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Validar formulario
  const validateForm = () => {
    if (!formData.name.trim()) {
      alert('El nombre es requerido');
      return false;
    }
    if (!formData.email.trim()) {
      alert('El email es requerido');
      return false;
    }
    if (!editingUserId && !formData.password) {
      alert('La contraseña es requerida');
      return false;
    }
    return true;
  };

  // Crear o actualizar usuario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingUserId) {
      // Actualizar usuario existente
      setUsers(users.map(user => 
        user.id === editingUserId ? { ...user, ...formData } : user
      ));
    } else {
      // Crear nuevo usuario (en una app real, esto generaría un ID único)
      const newUser = {
        id: Math.max(...users.map(u => u.id), 0) + 1,
        ...formData,
        active: true
      };
      setUsers([...users, newUser]);
    }

    // Limpiar formulario
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'professional'
    });
    setEditingUserId(null);
  };

  // Editar usuario
  const handleEdit = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role
    });
    setEditingUserId(user.id);
  };

  // Cambiar estado activo/inactivo
  const toggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, active: !user.active } : user
    ));
  };

  return (
    <div className={styles.userManagement}>
      <h2>Gestión de Usuarios</h2>
      
      <div className={styles.formContainer}>
        <h3>{editingUserId ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nombre Completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password">
              {editingUserId ? 'Nueva Contraseña (dejar en blanco para no cambiar)' : 'Contraseña'}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required={!editingUserId}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="role">Rol</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
            >
              {availableRoles.map(role => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton}>
              {editingUserId ? 'Actualizar Usuario' : 'Crear Usuario'}
            </button>
            {editingUserId && (
              <button 
                type="button" 
                onClick={() => {
                  setFormData({
                    name: '',
                    email: '',
                    password: '',
                    role: 'professional'
                  });
                  setEditingUserId(null);
                }}
                className={styles.cancelButton}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>
      
      <div className={styles.usersList}>
        <h3>Listado de Usuarios</h3>
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
                  {availableRoles.find(r => r.value === user.role)?.label || user.role}
                </td>
                <td>
                  <span className={`${styles.status} ${user.active ? styles.active : styles.inactive}`}>
                    {user.active ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className={styles.actions}>
                  <button 
                    onClick={() => handleEdit(user)}
                    className={styles.editButton}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => toggleUserStatus(user.id)}
                    className={`${styles.statusButton} ${user.active ? styles.deactivate : styles.activate}`}
                  >
                    {user.active ? 'Desactivar' : 'Activar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;