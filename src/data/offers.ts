export async function fetchUserEnvironmentsWithPricing(userId: number) {
    try {
      const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/offers/user-environments-pricing/${userId}`;
      console.log(`Fetching environments with pricing for user ID ${userId} from: ${requestUrl}`);
  
      const response = await fetch(requestUrl);
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API Error (${response.status}): ${errorText}`);
        throw new Error(`API Error (${response.status}): ${errorText}`);
      }
  
      const environments = await response.json();
      console.log(`Received environments with pricing for user ID ${userId}:`, environments);
  
      return environments;
    } catch (error) {
      console.error("Error fetching environments with pricing:", error);
      throw error;
    }
  }
  
  export async function fetchUserDevice(userId: number) {
    try {
      const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/offers/user-device/${userId}`;
      console.log(`Fetching device for user ID ${userId} from: ${requestUrl}`);
  
      const response = await fetch(requestUrl);
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API Error (${response.status}): ${errorText}`);
        throw new Error(`API Error (${response.status}): ${errorText}`);
      }
  
      const device = await response.json();
      console.log(`Received device for user ID ${userId}:`, device);
  
      return device;
    } catch (error) {
      console.error("Error fetching user device:", error);
      throw error;
    }
  }

  export function calculateTotalPrice(environments: any[], device: any): number {
    const totalEnvironmentsPrice = environments.reduce((sum, env) => sum + parseFloat(env.price), 0);
    const devicePrice = device?.price ? parseFloat(device.price) : 0;
  
    return totalEnvironmentsPrice + devicePrice;
  }