// api.ts
const API_BASE_URL = 'https://vivenza.adminmahaspice.in/api';

export const fetchBookingPackages = async () => {
  const response = await fetch(`${API_BASE_URL}/booking-packages/index.php`);
  return await response.json();
};

export const fetchFoodCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/food-categories/index.php`);
  return await response.json();
};

export const fetchFoodPackages = async () => {
  const response = await fetch(`${API_BASE_URL}/food-packages/index.php`);
  return await response.json();
};

export const fetchFoodItems = async () => {
  const response = await fetch(`${API_BASE_URL}/food-items/index.php`);
  return await response.json();
};

export const fetchAdditionalServices = async () => {
  const response = await fetch(`${API_BASE_URL}/additional-services/index.php`);
  return await response.json();
};

export const fetchCuisineTypes = async () => {
  const response = await fetch(`${API_BASE_URL}/food-cuisine-types/index.php`);
  return await response.json();
};