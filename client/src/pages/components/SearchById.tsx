import { FC, useEffect, useState } from "react";
import { Item } from "../useData";
import debounce from "debounce";

type Props = {
  setFilteredItems: (items: Item[]) => void;
  sortedItems: Item[];
};

const debouncedFilter = debounce(
  (
    value: string,
    setFilteredItems: (items: Item[]) => void,
    sortedItems: Item[]
  ) => {
    setFilteredItems(
      value.length > 0
        ? sortedItems.filter((item) => item.id.toString() === value)
        : sortedItems
    );
  },
  300
);

const SearchById: FC<Props> = ({ setFilteredItems, sortedItems }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    return () => debouncedFilter.clear();
  }, []);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedFilter(value, setFilteredItems, sortedItems);
  };

  return (
    <input
      type="text"
      placeholder="Filter by ID"
      value={query}
      onChange={handleQueryChange}
    />
  );
};

export default SearchById;
