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
      const res = await fetch("http://localhost:5000/devices/types");
      console.log(`${API_URL}/devices/types`)
      return await res.json();
    } catch (error) {
      console.error("Error fetching device types:", error);
      return [];
    }
  },
  
  fetchDeviceStates: async () => {
    try {
      const res = await fetch("http://localhost:5000/devices/stateTypes/all");
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
      const res = await fetch("http://localhost:5000/devices/users/all");
      return await res.json();
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  },
  fetchUnassignedDevices: async () => {
    try {
      const res = await fetch(`${API_URL}/devices/notAssigned`);
      return await res.json();
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  },
  fetchAssignedDevices: async () => {
    try {
      const res = await fetch(`${API_URL}/devices/assigned`);
      return await res.json();
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  } ,
  getUserByDeviceId : async(id : string)=>
  {
    try {
      const res = await fetch(`${API_URL}/devices/users/${id}`);
      const user= await res.json();
      console.log(user) ;
      return user;
    } catch (error) {
      console.error("Error fetching users:", error);
      return null;
    }
  } ,
  getStateTypeById : async(id : string)=>
    {
      try {
        const res = await fetch(`${API_URL}/devices/state/${id}`);
        const state= await res.json();
        console.log(state) ;
        return state;
      } catch (error) {
        console.error("Error fetching state:", error);
        return null;
      }
    } ,
    getTypeByTypeId : async(id : string)=>
      {
        try {
          const res = await fetch(`${API_URL}/devices/device_type/${id}`);
          const type= await res.json();
          console.log(type) ;
          return type;
        } catch (error) {
          console.error("Error fetching state:", error);
          return null;
        }
      }
};