const API_URL = "http://127.0.0.1:8000/api/buses/search";

export async function searchBuses({ source, destination, journeyDate }) {
  const params = new URLSearchParams({
    source,
    destination,
    journey_date: journeyDate,
  });

  const response = await fetch(`${API_URL}?${params}`);

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.detail || "Unable to search buses.");
  }

  return response.json();
}