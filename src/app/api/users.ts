import {API_URL} from "@/config/api";

export async function fetchUsers(searchTerm = "", filters = {}) {
  try {
    const queryParams = new URLSearchParams();
    
    if (searchTerm) queryParams.append("search", searchTerm);
  
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value as string);
      }
    });

    const requestUrl = `${API_URL}/users?${queryParams.toString()}`;
    console.log(`Making request to: ${requestUrl}`);
    
    const response = await fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Ajout du paramètre credentials
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}): ${errorText}`);
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }
    
    const users = await response.json();
    console.log(`Received ${users.length} users from API`);
    
    return users.map((user: any) => ({
      id: user.id,
      lastname: user.family_name,
      firstname: user.first_name,
      age: user.birthDate ? calculateAge(user.birthDate) : "N/A",
      sex: user.sex ?? "N/A",
      city: user.city ?? "N/A",
      street: user.street ?? "N/A",
      phone: user.phone_number,
      email: user.email,
      userType: user.user_type.type ?? "N/A",
      registrationDate: new Date(user.created_at).toLocaleDateString(),
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; 
  }
}

export async function fetchAidantAndClientUsers(searchTerm = "", filters = {}) {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("type", "aidant,malvoyant"); // Pass multiple types

    if (searchTerm) queryParams.append("search", searchTerm);

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value as string);
      }
    });

    const requestUrl = `${API_URL}/users/by-type?${queryParams.toString()}`;
    console.log(`Fetching aidant and malvoyant users from: ${requestUrl}`);

    const response = await fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // this is needed for the cookie to be sent
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error: ${errorText}`);
      throw new Error("Failed to fetch aidant and malvoyant users.");
    }

    const users = await response.json();

    console.log(`Received ${users.length} users (aidant + malvoyant)`);

    return users.map((user: any) => ({
      id: user.id,
      lastname: user.family_name,
      firstname: user.first_name,
      age: user.birthDate ? calculateAge(user.birthDate) : "N/A",
      sex: user.sex ?? "N/A",
      city: user.city ?? "N/A",
      street: user.street ?? "N/A",
      phone: user.phone_number,
      email: user.email,
      userType: user.user_type.type ?? "N/A",
      registrationDate: new Date(user.created_at).toLocaleDateString(),
    }));
  } catch (error) {
    console.error("Error fetching aidant and malvoyant users:", error);
    throw error;
  }
}

export async function fetchMalvoyantUsers() {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("type", "malvoyant"); // Pass multiple types

    const requestUrl = `${API_URL}/users/by-type?${queryParams.toString()}`;
    console.log(`Fetching aidant and malvoyant users from: ${requestUrl}`);

    const response = await fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // this is needed for the cookie to be sent
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error: ${errorText}`);
      throw new Error("Failed to fetch aidant and malvoyant users.");
    }

    const users = await response.json();

    console.log(`Received ${users.length} users (aidant + malvoyant)`);

    return users.map((user: any) => ({
      id: user.id,
      lastname: user.family_name,
      firstname: user.first_name,
      age: user.birthDate ? calculateAge(user.birthDate) : "N/A",
      sex: user.sex ?? "N/A",
      city: user.city ?? "N/A",
      street: user.street ?? "N/A",
      phone: user.phone_number,
      email: user.email,
      userType: user.user_type.type ?? "N/A",
      registrationDate: new Date(user.created_at).toLocaleDateString(),
    }));
  } catch (error) {
    console.error("Error fetching aidant and malvoyant users:", error);
    throw error;
  }
}


export async function fetchUserById(userId: number) {
  try { 
    const requestUrl = `${API_URL}/users/${userId}`;
    console.log(`Fetching user by ID from: ${requestUrl}`);

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

    const user = await response.json();
    console.log(`Received user by ID:`, user);

    return user;
  } catch (error : any) {
    console.error("Error fetching user by ID:", error);
    if (error.message.includes("404")) {
      return null; 
    }
    throw error;
  }
}

function calculateAge(birthDate: string): number {
  const birth = new Date(birthDate);
  const today = new Date();
  return today.getFullYear() - birth.getFullYear();
}

export async function fetchUserByName(first_name: string, family_name: string) {
  try {
    const requestUrl = `${API_URL}/users/by-name/${first_name},${family_name}`;
    console.log(`Fetching user by name from: ${requestUrl}`);

    const response = await fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // this is needed for the cookie to be sent
    });

    if (response.status === 404) {
      console.warn("User not found.");
      return null; // Retourne null si l'utilisateur n'est pas trouvé
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}): ${errorText}`);
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }

    const user = await response.json();
    console.log(`Received user by name:`, user);

    return user;
  } catch (error) {
    console.error("Error fetching user by name:", error);
    throw error; 
  }
}

export async function createUser(userData: any) {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}): ${errorText}`);
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }

    // Vérifiez si la réponse contient un JSON valide
    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      const user = await response.json();
      console.log(`User created successfully:`, user);
      return user;
    } else {
      console.error("Response does not contain JSON.");
      throw new Error("Invalid response format from server.");
    }
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function updateUser(userId: number, userData: any) {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}): ${errorText}`);
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }

    // Vérifiez si la réponse contient un JSON valide
    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      const user = await response.json();
      console.log(`User updated successfully:`, user);
      return user;
    } else {
      console.error("Response does not contain JSON.");
      throw new Error("Invalid response format from server.");
    }
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}
