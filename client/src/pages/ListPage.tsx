import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from "react";
import { ListItem } from "./components";
import useData, { Item } from "./useData";
import useSort from "./useSort";
import SearchById from "./components/SearchById";
import { FixedSizeList as List } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";

const SubTitle: FC<PropsWithChildren> = ({ children }) => (
  <h2 className={"list-subtitle"}>Active Item ID: {children}</h2>
);

const ListContext = createContext<{
  activeItemId?: string;
  filteredItems: Item[];
  setActiveItemId: (id: string) => void;
}>({ filteredItems: [], setActiveItemId: () => {} });

const Row = 
  ({
    index,
    style
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const { activeItemId, filteredItems, setActiveItemId } = useContext(ListContext);
    const item = filteredItems[index];
    return (
      <div style={{...style}} onClick={() => setActiveItemId(item.id.toString())}>
        <ListItem
          {...item}
          isactive={activeItemId}
        />
      </div>
    );
  }
function ListPage() {
  const items = useData();
  const [sortedItems, sortBy, handleSortClick] = useSort(items);
  const [activeItemId, setActiveItemId] = useState<string>();
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);

  const activeItemText = activeItemId || "Empty";

  useEffect(() => {
    setFilteredItems(sortedItems);
  }, [sortedItems]);

  return (
    <ListContext.Provider value={{ activeItemId, filteredItems, setActiveItemId }}>
    <div className="list-wrapper">
      <div className="list-header">
        <h1 className="list-title">Items List</h1>
        <SubTitle>{activeItemText}</SubTitle>
        <button onClick={handleSortClick}>
          Sort ({sortBy === "ASC" ? "ASC" : "DESC"})
        </button>
        <SearchById setFilteredItems={setFilteredItems} sortedItems={sortedItems}/>
      </div>
      <div className="list-container" style={{ height: 'calc(100vh - 150px)' }}>
        {filteredItems.length === 0 ? (
          <span>Loading...</span>
        ) : (
          <AutoSizer>
            {({ height, width }: { height: number; width: number }) => (
              <List
                height={height}
                width={width}
                itemCount={filteredItems.length}
                itemSize={120}
              >
                {Row}
              </List>
            )}
          </AutoSizer>
        )}
      </div>
    </div>
    </ListContext.Provider>
  );
}

export default ListPage;
