import { API_URL } from "@/config/api";

export async function fetchMonthlyRevenue(date: string) {
  try {
    const requestUrl = `${API_URL}/sales/monthly-revenue?date=${date}`;
    console.log(`Fetching monthly revenue for date ${date} from: ${requestUrl}`);

    const response = await fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}): ${errorText}`);
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }

    const revenue = await response.json();
    console.log(`Received monthly revenue:`, revenue);
    return revenue;
  } catch (error) {
    console.error("Error fetching monthly revenue:", error);
    throw error;
  }
}

export async function fetchDailySales(date: string) {
  try {
    const requestUrl = `${API_URL}/sales/daily-sales?date=${date}`;
    console.log(`Fetching daily sales for date ${date} from: ${requestUrl}`);

    const response = await fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}): ${errorText}`);
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }

    const sales = await response.json();
    console.log(`Received daily sales:`, sales);
    return sales;
  } catch (error) {
    console.error("Error fetching daily sales:", error);
    throw error;
  }
}

export async function fetchMonthlySales(date: number) {
  try {
    const requestUrl = `${API_URL}/sales/monthly-sales?date=${date}`;
    console.log(`Fetching monthly sales for date ${date} from: ${requestUrl}`);

    const response = await fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}): ${errorText}`);
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }

    const sales = await response.json();
    console.log(`Received monthly sales:`, sales);
    return sales;
  } catch (error) {
    console.error("Error fetching monthly sales:", error);
    throw error;
  }
}

export async function fetchYearlySales() {
  try {
    const requestUrl = `${API_URL}/sales/yearly-sales`;
    console.log(`Fetching yearly sales from: ${requestUrl}`);

    const response = await fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}): ${errorText}`);
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }

    const sales = await response.json();
    console.log(`Received yearly sales:`, sales);
    return sales;
  } catch (error) {
    console.error("Error fetching yearly sales:", error);
    throw error;
  }
}

export async function fetchSalesByDeviceType() {
  try {
    const requestUrl = `${API_URL}/sales/sales-by-device-type`;
    console.log(`Fetching sales by device type from: ${requestUrl}`);

    const response = await fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}): ${errorText}`);
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }

    const sales = await response.json();
    console.log(`Received sales by device type:`, sales);
    return sales;
  } catch (error) {
    console.error("Error fetching sales by device type:", error);
    throw error;
  }
}

export async function fetchSalesByRegion() {
  try {
    const requestUrl = `${API_URL}/sales/sales-by-region`;
    console.log(`Fetching sales by region from: ${requestUrl}`);

    const response = await fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}): ${errorText}`);
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }

    const sales = await response.json();
    console.log(`Received sales by region:`, sales);
    return sales;
  } catch (error) {
    console.error("Error fetching sales by region:", error);
    throw error;
  }
}

export async function fetchGrossMargin(date: string) {
  try {
    const requestUrl = `${API_URL}/sales/gross-margin?date=${date}`;
    console.log(`Fetching gross margin for date ${date} from: ${requestUrl}`);

    const response = await fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}): ${errorText}`);
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }

    const margin = await response.json();
    console.log(`Received gross margin:`, margin);
    return margin;
  } catch (error) {
    console.error("Error fetching gross margin:", error);
    throw error;
  }
}

export async function fetchNetMargin(date: string) {
  try {
    const requestUrl = `${API_URL}/sales/net-margin?date=${date}`;
    console.log(`Fetching net margin for date ${date} from: ${requestUrl}`);

    const response = await fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}): ${errorText}`);
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }

    const margin = await response.json();
    console.log(`Received net margin:`, margin);
    return margin;
  } catch (error) {
    console.error("Error fetching net margin:", error);
    throw error;
  }
}

export async function fetchMonthlyProductsSold(date: string) {
  try {
    const requestUrl = `${API_URL}/sales/monthly-products?date=${date}`;
    console.log(`Fetching monthly products sold for date ${date} from: ${requestUrl}`);

    const response = await fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}): ${errorText}`);
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    console.log(`Received monthly products sold:`, data);
    return data;
  } catch (error) {
    console.error("Error fetching monthly products sold:", error);
    throw error;
  }
}

export async function fetchMarketPenetration(date: string) {
  try {
    console.log('Fetching market penetration data for date:', date);
    const response = await fetch(`${API_URL}/sales/market-penetration?date=${date}`);
    if (!response.ok) {
      throw new Error('Failed to fetch market penetration data');
    }
    const data = await response.json();
    console.log('Market penetration data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching market penetration data:', error);
    throw error;
  }
}


