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
type UpdatedDevice = {
  id: string; 
  software_version?: string;
  date_of_service?: string;
  state_type_id?: number;
  mac_address?: string;
  battery_capacity?: number;
  user_id?: number;
  comm_state?: boolean;
  type_id ? : number;
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
    },
      deleteDevice: async (deviceId: string) => {
      try
      {
        const res = await fetch(`${API_URL}/devices/${deviceId}`, {
          method: 'DELETE',
        });
        if (!res.ok) {
          throw new Error('Failed to delete device');
        }
        return await res.json();
      }
      catch (error) {
      
      }
      }
      ,
    blockCommunication: async (deviceId: string) => {
      try
      {
        const res = await fetch(`${API_URL}/devices/block_communication/${deviceId}`, {
          method: 'PATCH',
        });
        if (!res.ok) {
          throw new Error('Failed to delete device');
        }
        return await res.json();
      }
      catch (error) {
      
      }
      } ,
      updateDevice: async (deviceData: UpdatedDevice) => {
        const { id, ...updateData } = deviceData;
        console.log('devicee *************************************');
        console.log(deviceData);
        // Only include fields that match your UpdateDeviceDto
        const formattedData: any = {};
        
        // Add only the fields defined in your UpdateDeviceDto
        if (updateData.software_version !== undefined) formattedData.software_version = updateData.software_version;
        if (updateData.date_of_service !== undefined) formattedData.date_of_service = updateData.date_of_service;
        if (updateData.mac_address !== undefined) formattedData.mac_address = updateData.mac_address;
        if (updateData.comm_state !== undefined) formattedData.comm_state = updateData.comm_state;
        if (updateData.battery_capacity !== undefined) formattedData.battery_capacity = Number(updateData.battery_capacity);
        if (updateData.state_type_id !== undefined) formattedData.state_type_id = Number(updateData.state_type_id);
        if (updateData.type_id !== undefined) formattedData.type_id = Number(updateData.type_id);

        if (updateData.user_id !== undefined) formattedData.user_id = Number(updateData.user_id);
        console.log('formattedData *************************************');
        console.log(formattedData);
        const response = await fetch(`${API_URL}/devices/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formattedData),
        });
        
        if (!response.ok) {
          throw new Error('Submission failed');
        }
        
        return await response.json();
      }
      
};