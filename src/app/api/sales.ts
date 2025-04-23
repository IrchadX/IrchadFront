import { API_URL } from "@/config/api";
import { fetchTotalPrice } from "./offers"; // Import the fetchTotalPrice function

export async function fetchSalesData(searchTerm = "", filters = {}) {
  try {
    const queryParams = new URLSearchParams();

    if (searchTerm) queryParams.append("search", searchTerm);

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value as string);
      }
    });

    const requestUrl = `${API_URL}/sales/purchase-history?${queryParams.toString()}`;
    console.log(`Fetching sales data from: ${requestUrl}`);

    // Fetch data from the API
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

    const sales = await response.json();
    console.log(`Received ${sales.length} sales from API`);

    // Fetch total price for each user asynchronously
    const salesWithPrices = await Promise.all(
      sales.map(async (sale: any) => {
        const totalPrice = await fetchTotalPrice(sale.user_id); // Fetch total price for the user
        return {
          id: sale.id.toString(),
          user_id: sale.user_id.toString(),
          type: sale.device?.device_type?.type ?? "N/A",
          saleDate: new Date(sale.date).toLocaleDateString(),
          price: totalPrice ? `${totalPrice} DA` : "N/A", // Include the price
          firstname: sale.user?.first_name ?? "N/A",
          lastname: sale.user?.family_name ?? "N/A",
          city: sale.user?.city ?? "N/A",
        };
      })
    );

    return salesWithPrices;
  } catch (error) {
    console.error("Error fetching sales data:", error);
    throw error;
  }
}