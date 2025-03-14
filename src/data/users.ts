export async function fetchUsers(searchTerm = "", filters = {}) {
  try {
    const queryParams = new URLSearchParams();
    
    // Add search term if provided
    if (searchTerm) queryParams.append("search", searchTerm);
    
    // Add filters to query params
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        // Directly add as query parameter
        queryParams.append(key, value as string);
      }
    });
    
    // Full URL for debugging
    const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/users?${queryParams.toString()}`;
    console.log(`Making request to: ${requestUrl}`);
    
    // Make the request
    const response = await fetch(requestUrl);
    
    // Handle errors
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}): ${errorText}`);
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }
    
    // Parse the response
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
    throw error; // Re-throw to handle in the component
  }
}

function calculateAge(birthDate: string): number {
  const birth = new Date(birthDate);
  const today = new Date();
  return today.getFullYear() - birth.getFullYear();
}