import AddItemModal from "@/components/item-table/AddItemModal";
import ListRow from "@/components/item-table/ListRow";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import { useState } from "react";

const Items = () => {
  // SWR used for GET requests, and revalidates cache every 1 second
  const { data, error, isLoading } = useSWR(
    "/api/mongo/items/get-items",
    fetcher,
    { refreshInterval: 1000 }
  );

  const [isOpen, setIsOpen] = useState(false);
  
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  if (error) {
    console.log("error:", error);
    return <div>ERROR</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data) {
    return (
      <div className="flex justify-center pt-8 px-3">
        <AddItemModal isOpen={isOpen} closeModal={closeModal} />
        <div className="max-w-6xl overflow-auto">
          <div className="flex justify-between items-end pb-3">
            <div>
              <h2 className="px-3 font-bold">Items</h2>
              <p className="px-3 md:text-sm text-xs">
                Click on a field to edit it. Press Enter to save changes. Press
                Esc to cancel.
              </p>
            </div>
            <button className="mx-3 rounded bg-indigo-500 px-3 py-1 md:text-xs text-[10px] text-white h-8" onClick={openModal}>
              Add Item
            </button>
          </div>
          <table className="w-full min-w-[640px] py-3">
            <thead className="text-sm">
              <tr>
                <th className="text-left p-3">Item</th>
                <th className="text-left p-3">Description</th>
                <th className="text-left p-3">Price</th>
                <th className="text-left p-3" />
                <th className="text-left p-3" />
              </tr>
            </thead>
            <tbody className="text-sm">
              {data &&
                data.map((item, index) => (
                  <ListRow item={item} index={index} key={index}/>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Items;