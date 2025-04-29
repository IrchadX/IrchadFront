export async function fetchSalesData(searchTerm = "", filters = {}) {
    try {
      const queryParams = new URLSearchParams();
  
      if (searchTerm) queryParams.append("search", searchTerm);
  
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, value as string);
        }
      });
  
      const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/sales/purchase-history?${queryParams.toString()}`;
      console.log(`Fetching sales data from: ${requestUrl}`);
  
      const response = await fetch(requestUrl);
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API Error (${response.status}): ${errorText}`);
        throw new Error(`API Error (${response.status}): ${errorText}`);
      }
  
      const sales = await response.json();
      console.log(`Received ${sales.length} sales from API`);
  
      return sales.map((sale: any) => ({
        id: sale.id.toString(),
        user_id : sale.user_id.toString(),
        type: sale.device?.device_type?.type ?? "N/A",
        saleDate: new Date(sale.date).toLocaleDateString(),
        //price: sale.price ? `${sale.price} €` : "N/A", 
        firstname: sale.user?.first_name ?? "N/A",
        lastname: sale.user?.family_name ?? "N/A",
        city: sale.user?.city ?? "N/A",
      }));
    } catch (error) {
      console.error("Error fetching sales data:", error);
      throw error;
    }
  }