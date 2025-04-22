import {API_URL} from "../config/api";

export async function fetchUserEnvironmentsWithPricing(userId: number) {
    try {
      const requestUrl = `${API_URL}/offers/user-environments-pricing/${userId}`;
      console.log(`Fetching environments with pricing for user ID ${userId} from: ${requestUrl}`);
  
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
  
      const environments = await response.json();
      console.log(`Received environments with pricing for user ID ${userId}:`, environments);
  
      return environments;
    } catch (error) {
      console.error("Error fetching environments with pricing:", error);
      throw error;
    }
  }

  export async function fetchUserPublicEnvironmentsPricing(userId: number) {
    try { 
      const requestUrl = `${API_URL}/offers/user-public-access/${userId}`;
      console.log(`Fetching public environments pricing for user ID ${userId} from: ${requestUrl}`);
  
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
  
      const price = await response.json();
      console.log(`Received public environments pricing for user ID ${userId}:`, price);
  
      return price;
    }
    catch (error) {
      console.error("Error fetching public environments:", error);
      throw error;
    }
  }
  
  export async function fetchUserDevice(userId: number) {
    try {
      const requestUrl = `${API_URL}/offers/user-device/${userId}`;
      console.log(`Fetching device for user ID ${userId} from: ${requestUrl}`);
  
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
  
      const device = await response.json();
      console.log(`Received device for user ID ${userId}:`, device);
  
      return device;
    } catch (error) {
      console.error("Error fetching user device:", error);
      throw error;
    }
  }

  export function calculateTotalPrice(environments: any[], device: any, public_access : any): number {
    const totalEnvironmentsPrice = environments.reduce((sum, env) => sum + parseFloat(env.price), 0);
    const devicePrice = device?.price ? parseFloat(device.price) : 0;

  
    return totalEnvironmentsPrice + devicePrice + parseFloat(public_access);
  }

  /*export async function fetchTotalPrice(userId: number): Promise<number> {
    try {
      // Fetch environments with pricing
      const environments = await fetchUserEnvironmentsWithPricing(userId);
  
      // Fetch the user's device
      const device = await fetchUserDevice(userId);

      // Fetch public access pricing
      const public_access = await fetchUserPublicEnvironmentsPricing(userId);
  
      // Calculate the total price
      const totalPrice = await calculateTotalPrice(environments, device[0], public_access); 
  
      //console.log(`Total price for user ID ${userId}: ${totalPrice}`);
      return public_access;
    } catch (error) {
      console.error(`Error fetching total price for user ID ${userId}:`, error);
      throw error;
    }
  }*/

    export async function fetchTotalPrice(userId: number): Promise<number> {
      try {
        // Fetch environments with pricing
        const environments = await fetchUserEnvironmentsWithPricing(userId);
    
        // Fetch the user's device
        const device = await fetchUserDevice(userId);
    
        // Fetch public access pricing
        const public_access = await fetchUserPublicEnvironmentsPricing(userId);
    
        // Calculate the total price
        const totalEnvironmentsPrice = environments.length > 0
          ? environments.reduce((sum : number, env : {price : string}) => sum + parseFloat(env.price), 0)
          : 0;
    
        const devicePrice = device?.price ? parseFloat(device.price) : 0;
    
        const totalPrice = totalEnvironmentsPrice + devicePrice + parseFloat(public_access || "0");
    
        console.log(`Total price for user ID ${userId}: ${totalPrice}`);
        return totalPrice;
      } catch (error) {
        console.error(`Error fetching total price for user ID ${userId}:`, error);
        return 0; // Return 0 in case of an error
      }
    }