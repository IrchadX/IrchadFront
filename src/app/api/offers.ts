import { API_URL } from "@/config/api";

export async function fetchUserEnvironmentsWithPricing(userId: number) {
  try {
    const requestUrl = `${API_URL}/offers/user-environments-pricing/${userId}`;
    console.log(
      `Fetching environments with pricing for user ID ${userId} from: ${requestUrl}`
    );

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
    console.log(
      `Received environments with pricing for user ID ${userId}:`,
      environments
    );

    return environments;
  } catch (error) {
    console.error("Error fetching environments with pricing:", error);
    throw error;
  }
}

export async function fetchUserPublicEnvironmentsPricing(userId: number) {
  try {
    const requestUrl = `${API_URL}/offers/user-public-access/${userId}`;
    console.log(
      `Fetching public environments pricing for user ID ${userId} from: ${requestUrl}`
    );

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
    console.log(
      `Received public environments pricing for user ID ${userId}:`,
      price
    );

    return price;
  } catch (error) {
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

export function calculateTotalPrice(
  environments: any[],
  device: any,
  public_access: any
): number {
  const totalEnvironmentsPrice = environments.reduce(
    (sum, env) => sum + parseFloat(env.price),
    0
  );
  const devicePrice = device?.price ? parseFloat(device.price) : 0;

  return totalEnvironmentsPrice + devicePrice + parseFloat(public_access);
}

export async function fetchTotalPrice(userId: number): Promise<number> {
  try {
    // Fetch environments with pricing
    const environments = await fetchUserEnvironmentsWithPricing(userId);

    // Fetch the user's device
    const device = await fetchUserDevice(userId);

    // Fetch public access pricing
    const public_access = await fetchUserPublicEnvironmentsPricing(userId);

    // Prepare data for estimateTotalPrice
    const surfaces = environments.map((env: { surface: string }) => ({
      surface: parseFloat(env.surface) || 0,
    }));
    // Call estimateTotalPrice
    const totalPrice = await estimateTotalPrice(
      surfaces,
      !!public_access,
      device[0]
    );

    console.log(`Total price for user ID ${userId}: ${totalPrice}`);
    return totalPrice;
  } catch (error) {
    console.error(`Error fetching total price for user ID ${userId}:`, error);
    return 0; // Return 0 in case of an error
  }
}

export async function estimateTotalPrice(
  environments: { surface: number }[],
  includePublicAccess: boolean,
  device: { price?: number }
): Promise<number> {
  try {
    const requestUrl = `${API_URL}/offers/estimate-total-price`;
    console.log(`Estimating total price from: ${requestUrl}`);

    const response = await fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ environments, includePublicAccess, device }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}): ${errorText}`);
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }

    const totalPrice = await response.json();
    console.log(`Estimated total price: ${totalPrice}`);

    return totalPrice;
  } catch (error) {
    console.error("Error estimating total price:", error);
    throw error;
  }
}

export async function createBasicEnvironment(
  name: string,
  description: string,
  address: string,
  userId: number,
  isPublic: boolean,
  surface: number
): Promise<any> {
  try {
    const requestUrl = `${API_URL}/environments/create-basic-environment`;
    console.log(`Creating basic environment from: ${requestUrl}`);

    const response = await fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // this is needed for the cookie to be sent
      body: JSON.stringify({
        name,
        description,
        address,
        userId,
        isPublic,
        surface,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}): ${errorText}`);
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }

    const newEnvironment = await response.json();
    console.log(`Created new environment:`, newEnvironment);

    return newEnvironment;
  } catch (error) {
    console.error("Error creating basic environment:", error);
    throw error;
  }
}

export async function updateDeviceUser(
  deviceId: number,
  userId: number
): Promise<any> {
  try {
    const requestUrl = `${API_URL}/devices/${deviceId}/set-user`;
    console.log(
      `Updating device ID ${deviceId} with user ID ${userId} at: ${requestUrl}`
    );
    console.log();
    const response = await fetch(requestUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies if needed
      body: JSON.stringify({ user_id: userId }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}): ${errorText}`);
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }

    const updatedDevice = await response.json();
    console.log(`Device updated successfully:`, updatedDevice);

    return updatedDevice;
  } catch (error) {
    console.error("Error updating device user:", error);
    throw error;
  }
}

export async function createPurchaseHistory(
  userId: number,
  deviceId: number,
  hasPublicAccess: boolean
): Promise<any> {
  try {
    const requestUrl = `${API_URL}/sales/add-purchase`;
    console.log(
      `Creating purchase history for user ID ${userId}, device ID ${deviceId}, public access: ${hasPublicAccess}`
    );

    const response = await fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies if needed
      body: JSON.stringify({
        userId,
        deviceId,
        hasPublicAccess,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}): ${errorText}`);
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }

    const purchaseHistory = await response.json();
    console.log(`Purchase history created successfully:`, purchaseHistory);

    return purchaseHistory;
  } catch (error) {
    console.error("Error creating purchase history:", error);
    throw error;
  }
}
