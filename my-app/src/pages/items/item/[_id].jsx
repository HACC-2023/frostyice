import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Item = () => {
  const router = useRouter();
  const [item, setItem] = useState(null);
  // gets the ID from the URL sends request, and updates component with item
  const getItem = async (_id) => {
    const res = await fetch(`/api/mongo/items/get-item-by-id/${_id}`);
    const item = await res.json();
    console.log("item:", item);
    setItem(item);
  };
  
  useEffect(() => {
    const _id = router.query._id;
    // if there's an id, then fetch the data
    if (_id) {
      getItem(_id);
    }
  }, [router.query._id]);

  if (!item) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>{item.name}</h1>
    </div>
  );
};

export default Item;
