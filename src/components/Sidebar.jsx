import AddItemForm from "./AddItemForm";
import ButtonGroup from "./ButtonGroup";

import { useItemsStore } from "../stores/itemsStore";

function Sidebar() {
  const addItem = useItemsStore((state) => state.addItem);

  return (
    <div className="sidebar">
      <AddItemForm onAddItem={addItem}/>
      <ButtonGroup />
    </div>
  );
}

export default Sidebar;
