import { useEffect, useState } from "react";

export type Item = {
  id: number;
  name: string;
  description: string;
};

type ApiResponse = Item[];

function useData() {
  const [items, setItems] = useState<Item[]>([]);

  async function fetchItems() {
    try {
      const response = await fetch(`${process.env.API_URL}/items`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Expected array but got " + typeof data);
      }

      setItems(data);
    } catch (err) {
      console.error("Failed to fetch items", err);
      setItems([]);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return items;
}

export default useData;
