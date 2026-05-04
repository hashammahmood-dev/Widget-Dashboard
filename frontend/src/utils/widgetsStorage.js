const STORAGE_KEY = "widgets-dashboard-list";

export const getStoredWidgets = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveStoredWidgets = (widgets) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(widgets));
};
