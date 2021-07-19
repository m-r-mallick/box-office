const API_BASE_URL = 'https://api.tvmaze.com';

export async function apiGet(query) {
   const rawData = await fetch(`${API_BASE_URL}${query}`);
   const jsonData = await rawData.json();
   return jsonData;
}
