export async function fetchUsers() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
    if (!response.ok) throw new Error("Failed to fetch users");
    const users = await response.json();

    return users.map((user: any) => ({
      id: user.id,
      lastname: user.family_name,
      firstname: user.first_name,
      age: user.age ?? "N/A",
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
    return [];
  }
}
