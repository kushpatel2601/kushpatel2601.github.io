
import { generateId } from '@/lib/utils';

const SALON_SERVICES_KEY = 'salonServices';
const STYLISTS_KEY = 'stylists';
const APPOINTMENTS_KEY = 'appointments';

const initialSalonServices = [
  { id: generateId(), name: "Women's Haircut & Style", category: "Haircuts", price: 65, duration: 60, description: "Consultation, shampoo, cut, and blow-dry style." },
  { id: generateId(), name: "Men's Haircut", category: "Haircuts", price: 40, duration: 45, description: "Precision cut, shampoo, and style." },
  { id: generateId(), name: "Blowout / Styling", category: "Haircuts", price: 50, duration: 45, description: "Shampoo, blow-dry, and heat styling." },
  { id: generateId(), name: "Updo / Special Occasion", category: "Haircuts", price: 85, duration: 75, description: "Elegant styling for weddings, proms, or events." },
  { id: generateId(), name: "All-Over Color", category: "Coloring", price: 120, duration: 120, description: "Single process color application from roots to ends." },
  { id: generateId(), name: "Partial Highlights / Lowlights", category: "Coloring", price: 150, duration: 150, description: "Highlights or lowlights on part of your head." },
  { id: generateId(), name: "Full Highlights / Lowlights", category: "Coloring", price: 200, duration: 180, description: "Highlights or lowlights throughout all your hair." },
  { id: generateId(), name: "Balayage / Ombre", category: "Coloring", price: 250, duration: 180, description: "Hand-painted color for a natural, graduated effect." },
  { id: generateId(), name: "Color Correction", category: "Coloring", price: 0, duration: 240, description: "Corrective service to fix undesired color results. Price upon consultation." },
  { id: generateId(), name: "Deep Conditioning Treatment", category: "Treatments", price: 45, duration: 30, description: "Intensive mask to restore moisture and shine." },
  { id: generateId(), name: "Scalp Treatment", category: "Treatments", price: 55, duration: 45, description: "Exfoliating and nourishing treatment for a healthy scalp." },
  { id: generateId(), name: "Keratin Smoothing Treatment", category: "Treatments", price: 300, duration: 180, description: "Reduces frizz and curl for smoother, manageable hair." },
  { id: generateId(), name: "Gloss / Toner", category: "Treatments", price: 60, duration: 45, description: "Enhances shine and tone, perfect for refreshing color." },
  { id: generateId(), name: "Eyebrow Shaping", category: "Beauty", price: 25, duration: 20, description: "Waxing or tweezing to create the perfect brow shape." },
  { id: generateId(), name: "Makeup Application", category: "Beauty", price: 75, duration: 60, description: "Professional makeup for any occasion." },
];

const initialStylists = [
  { id: generateId(), name: "Alice Wonderland", specialties: ["Creative Cuts", "Vivid Colors"], imageKey: "Stylist Alice" },
  { id: generateId(), name: "Bob The Hairstyler", specialties: ["Balayage", "Color Correction"], imageKey: "Stylist Bob" },
  { id: generateId(), name: "Carol Shears", specialties: ["Precision Cuts", "Styling"], imageKey: "Stylist Carol" },
];

const initializeLocalStorageItem = (key, defaultValue) => {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
  }
};

const initializeSalonData = () => {
  initializeLocalStorageItem(SALON_SERVICES_KEY, initialSalonServices);
  initializeLocalStorageItem(STYLISTS_KEY, initialStylists);
  initializeLocalStorageItem(APPOINTMENTS_KEY, []);
};

initializeSalonData();

const getLocalStorageItem = (key) => {
  return JSON.parse(localStorage.getItem(key) || '[]');
};

const setLocalStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getSalonServices = () => getLocalStorageItem(SALON_SERVICES_KEY);
export const getStylists = () => getLocalStorageItem(STYLISTS_KEY);
export const getAppointments = () => getLocalStorageItem(APPOINTMENTS_KEY);

export const addAppointment = (appointment) => {
  const appointments = getAppointments();
  const newAppointment = {
    ...appointment,
    id: generateId(),
    status: "Pending" 
  };
  appointments.push(newAppointment);
  setLocalStorageItem(APPOINTMENTS_KEY, appointments);
  return newAppointment;
};

export const updateAppointmentStatus = (id, status) => {
  const appointments = getAppointments();
  const index = appointments.findIndex(app => app.id === id);
  if (index !== -1) {
    appointments[index].status = status;
    setLocalStorageItem(APPOINTMENTS_KEY, appointments);
    return appointments[index];
  }
  return null;
};

export const cancelAppointment = (id) => {
  return updateAppointmentStatus(id, "Cancelled");
};

export const getServiceById = (id) => {
  const services = getSalonServices();
  return services.find(service => service.id === id);
};

export const getStylistById = (id) => {
  const stylists = getStylists();
  return stylists.find(stylist => stylist.id === id);
};
