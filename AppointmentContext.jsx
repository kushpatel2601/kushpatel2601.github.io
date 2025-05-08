
import React, { createContext, useState, useEffect } from 'react';

export const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState(() => {
    const localData = localStorage.getItem('appointments');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = (appointment) => {
    setAppointments(prevAppointments => [...prevAppointments, appointment]);
  };

  const updateAppointmentStatus = (id, status) => {
    setAppointments(prevAppointments => 
      prevAppointments.map(app => app.id === id ? { ...app, status } : app)
    );
  };
  
  const cancelAppointment = (id) => {
     setAppointments(prevAppointments => 
      prevAppointments.map(app => app.id === id ? { ...app, status: 'Cancelled' } : app)
    );
  };


  return (
    <AppointmentContext.Provider value={{ appointments, addAppointment, updateAppointmentStatus, cancelAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
};
