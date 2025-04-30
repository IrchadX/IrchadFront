import { API_URL } from "../../config/api";

export async function fetchAvailableDevices() {
    try { 
      const requestUrl = `${API_URL}/devices/user/null`;
      console.log(`Fetching available devices from: ${requestUrl}`);
  
      const response = await fetch(requestUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // this is needed for the cookie to be sent
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API Error (${response.status}): ${errorText}`);
        throw new Error(`API Error (${response.status}): ${errorText}`);
      }
  
      const devices = await response.json();
      // Map the devices to include the required fields
      const formattedDevices = devices.map((device: any) => ({
        id: device.id,
        type: device.device_type?.type ?? "Unknown", // Get the name of the type
        softwareVersion: device.software_version ?? "N/A",
        price: device.price ?? 0, // Include price if available
      }));
  
      console.log(`Received available devices:`, formattedDevices);
  
      return formattedDevices;
    }
    catch (error) {
      console.error("Error fetching available devices:", error);
      throw error;
    }
  }