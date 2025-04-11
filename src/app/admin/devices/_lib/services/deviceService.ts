import {API_URL} from '@/config/api';

type Device = {
  type_id: string;
  software_version: string;
  date_of_service: string;
  state_type_id: string;
  mac_address: string;
  battery_capacity: string;
  user_id?: string;
  comm_state: boolean;
  optionalProperty?: boolean;
};



export const DeviceService = {
  fetchDeviceTypes: async () => {
    try {
      const res = await fetch(`${API_URL}/devices/types`);
      return await res.json();
    } catch (error) {
      console.error("Error fetching device types:", error);
      return [];
    }
  },
  
  fetchDeviceStates: async () => {
    try {
      const res = await fetch(`${API_URL}/devices/stateTypes/all`);
      return await res.json();
    } catch (error) {
      console.error("Error fetching device states:", error);
      return [];
    }
  },
  
  addDevice: async (deviceData:Device) => {
    const response = await fetch(`${API_URL}/devices`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(deviceData),
    });
    
    if (!response.ok) {
      throw new Error('Submission failed');
    }
    
    return await response.json();
  },
  fetchUsers: async () => {
    try {
      const res = await fetch(`${API_URL}/devices/users/all`);
      return await res.json();
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  },
};