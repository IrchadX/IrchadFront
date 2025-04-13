export async function fetchUsers(searchTerm = "", filters = {}) {
  try {
    const queryParams = new URLSearchParams();
    
    if (searchTerm) queryParams.append("search", searchTerm);
  
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value as string);
      }
    });
    

    const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/users?${queryParams.toString()}`;
    console.log(`Making request to: ${requestUrl}`);
    
    const response = await fetch(requestUrl);
    
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
      userType: user.userType ?? "N/A",
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

    const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/users/by-type?${queryParams.toString()}`;
    console.log(`Fetching aidant and malvoyant users from: ${requestUrl}`);

    const response = await fetch(requestUrl);

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
      userType: user.userType ?? "N/A",
      registrationDate: new Date(user.created_at).toLocaleDateString(),
    }));
  } catch (error) {
    console.error("Error fetching aidant and malvoyant users:", error);
    throw error;
  }
}

function calculateAge(birthDate: string): number {
  const birth = new Date(birthDate);
  const today = new Date();
  return today.getFullYear() - birth.getFullYear();
}