import Select from "react-select";
import EmptyView from "./EmptyView";
import { useMemo, useState } from "react";
import { useItemsStore } from "../stores/itemsStore";

const sortingOptions = [
  { value: "default", label: "Sort by default" },
  { value: "packed", label: "Sort by packed" },
  { value: "unpacked", label: "Sort by unpacked" },
];

function ItemList() {
  const items = useItemsStore((state) => state.items);
  const deleteItem = useItemsStore((state) => state.deleteItem);
  const toggleItem = useItemsStore((state) => state.toggleItem);
  const [sortBy, setSortBy] = useState("default");


  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      if (sortBy === "packed") {
        return b.packed - a.packed;
      }

      if (sortBy === "unpacked") {
        return a.packed - b.packed;
      }

      return;
    });
  }, [items, sortBy]);

  return (
    <ul className="item-list">
      {items.length === 0 && <EmptyView />}

      {items.length > 0 ? (
        <section className="sorting">
          <Select
            onChange={(option) => setSortBy(option.value)}
            options={sortingOptions}
            defaultValue={sortingOptions[0]}
          />
        </section>
      ) : null}

      {sortedItems.map((item) => (
        <Item
          key={item.id}
          item={item}
          onDeleteItem={deleteItem}
          onToggleItem={toggleItem}
        />
      ))}
    </ul>
  );
}

export default ItemList;

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li className="item">
      <label>
        <input
          onChange={() => onToggleItem(item.id)}
          checked={item.packed}
          type="checkbox"
        />
        {item.name}
      </label>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
