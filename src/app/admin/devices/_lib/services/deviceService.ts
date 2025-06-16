import { API_URL } from '@/config/api';

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
  type_id?: number;
};

export const DeviceService = {
  fetchDeviceTypes: async () => {
    try {
      const res = await fetch(`${API_URL}/devices/types`, {
        credentials: 'include',
      });
      return await res.json();
    } catch (error) {
      console.error("Error fetching device types:", error);
      return [];
    }
  },

  fetchDeviceStates: async () => {
    try {
      const res = await fetch(`${API_URL}/devices/stateTypes/all`, {
        credentials: 'include',
      });
      return await res.json();
    } catch (error) {
      console.error("Error fetching device states:", error);
      return [];
    }
  },

  addDevice: async (deviceData: Device) => {
    const response = await fetch(`${API_URL}/devices`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(deviceData),
    });

    if (!response.ok) {
      throw new Error('Submission failed');
    }

    return await response.json();
  },

  fetchUsers: async () => {
    try {
      const res = await fetch(`${API_URL}/devices/users/all`, {
        credentials: 'include',
      });
      return await res.json();
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  },

  fetchUnassignedDevices: async () => {
    try {
      const res = await fetch(`${API_URL}/devices/notAssigned`, {
        credentials: 'include',
      });
      return await res.json();
    } catch (error) {
      console.error("Error fetching unassigned devices:", error);
      return [];
    }
  },

  fetchAssignedDevices: async () => {
    try {
      const res = await fetch(`${API_URL}/devices/assigned`, {
        credentials: 'include',
      });
      return await res.json();
    } catch (error) {
      console.error("Error fetching assigned devices:", error);
      return [];
    }
  },

  getUserByDeviceId: async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/devices/users/${id}`, {
        credentials: 'include',
      });
      return await res.json();
    } catch (error) {
      console.error("Error fetching user by device ID:", error);
      return null;
    }
  },

  getStateTypeById: async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/devices/state/${id}`, {
        credentials: 'include',
      });
      return await res.json();
    } catch (error) {
      console.error("Error fetching state by ID:", error);
      return null;
    }
  },

  getTypeByTypeId: async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/devices/device_type/${id}`, {
        credentials: 'include',
      });
      return await res.json();
    } catch (error) {
      console.error("Error fetching device type by ID:", error);
      return null;
    }
  },

  deleteDevice: async (deviceId: string) => {
    try {
      const res = await fetch(`${API_URL}/devices/${deviceId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Failed to delete device');
      }

      return await res.json();
    } catch (error) {
      console.error("Error deleting device:", error);
    }
  },

  blockCommunication: async (deviceId: string) => {
    try {
      const res = await fetch(`${API_URL}/devices/block_communication/${deviceId}`, {
        method: 'PATCH',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Failed to block communication');
      }

      return await res.json();
    } catch (error) {
      console.error("Error blocking communication:", error);
    }
  },

  updateDevice: async (deviceData: UpdatedDevice) => {
    const { id, ...updateData } = deviceData;

    const formattedData: any = {};

    if (updateData.software_version !== undefined)
      formattedData.software_version = updateData.software_version;
    if (updateData.date_of_service !== undefined)
      formattedData.date_of_service = updateData.date_of_service;
    if (updateData.mac_address !== undefined)
      formattedData.mac_address = updateData.mac_address;
    if (updateData.comm_state !== undefined)
      formattedData.comm_state = updateData.comm_state;
    if (updateData.battery_capacity !== undefined)
      formattedData.battery_capacity = Number(updateData.battery_capacity);
    if (updateData.state_type_id !== undefined)
      formattedData.state_type_id = Number(updateData.state_type_id);
    if (updateData.type_id !== undefined)
      formattedData.type_id = Number(updateData.type_id);
    if (updateData.user_id !== undefined)
      formattedData.user_id = Number(updateData.user_id);
    
      console.log("Formatted data for update:", formattedData);
    const response = await fetch(`${API_URL}/devices/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(formattedData),
    });

    if (!response.ok) {
      throw new Error('Submission failed');
    }

    return await response.json();
  },
};
