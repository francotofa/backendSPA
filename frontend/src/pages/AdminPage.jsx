import React, { useState } from 'react';
import AdminHeader from '../components/Admin/AdminHeader';
import AdminTabs from '../components/Admin/AdminTabs';
import Footer from '../components/Footer/Footer';
import ServicesTab from '../components/Admin/ServicesTab';
import AppointmentsTab from '../components/Admin/AppointmentsTab';
import ServiceReportsTab from '../components/Admin/ServiceReportsTab';
import ProfessionalReportsTab from '../components/Admin/ProfessionalReportsTab';
import UserManagementTab from '../components/Admin/UserManagementTab';
import styles from './AdminPage.module.css';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('services');

  return (
    <div className={styles.adminPage}>
      <AdminHeader professionalName="Dra. Ana Felicidad" />
      
      <div className={styles.container}>
        <AdminTabs 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        <div className={styles.tabContent}>
          {activeTab === 'services' && <ServicesTab />}
          {activeTab === 'appointments' && <AppointmentsTab />}
          {activeTab === 'reports-service' && <ServiceReportsTab />}
          {activeTab === 'reports-professional' && <ProfessionalReportsTab />}
          {activeTab === 'users' && <UserManagementTab />}
        </div>
      </div>
      
      
    </div>
  );
};

export default AdminPage;