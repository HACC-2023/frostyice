# next-app-template

# Table of Contents
1. [Getting Started](#getting-started)
2. [File Structure](#file-structure)
3. [Routing](#routing) 
4. [Forms and Form Validation](#forms-and-form-validation)
5. [Fetching Data from Database](#fetching-data-from-database)
# Getting Started

1. Change into the `my-app` directory and run `npm install`
2. Create a `.env.local` file inside the `my-app` directory
3. The `.env.local` file should contain the following:
   ```
   MONGO_DB_URI=<your MongoDB Atlas URI>
   NEXTAUTH_SECRET=<generate secret>
   NEXTAUTH_URL=http://localhost:3000
   ```
4. Run `npm run dev` to start the development server

## Next-Auth Secret

1. Generate secret by running: `openssl rand -base64 32`
2. For more information: https://next-auth.js.org/configuration/options#nextauth_secret

## MongoDB Atlas

1. Create a MongoDB Atlas account
2. Create a new Project
3. Create a new Deployment using the free tier
4. Create a user (can use default or make your own password). Save your password somewhere, you will need it later.
5. For IP address, add `0.0.0.0/0`, which means that it can be accessed from anywhere
6. Finish and close
7. Click on "Connect" and click "MongoDB with VSCode"
8. Copy the URI and paste it into the `.env.local` file, make sure to add the password where indicated

# File Structure

The main folder is `src`. Inside `src` are the following folders:

- `components`: contains all the React components
- `lib`: contains the function that connects to MongoDB
- `pages`: is where the client router is located as well as the API endpoints. The `pages/api` folder contains the API endpoints.
- `models`: contains all of the schema for the MongoDB collections
- `styles`: contains the global styles for the app
- `utils`: contains the utility functions
- `middleware.js`: contains the middleware for Next-Auth

# Routing

## Backend Routing

The backend routing is done through the `pages/api` folder. Each file in this folder is an API endpoint. For example, the `pages/api/mongo/items/get-items.js` file is the endpoint for getting all items from the `items` collection in MongoDB. The endpoint is `/api/mongo/items/get-items`. In development, this would look like: `http://localhost:3000/api/mongo/items/get-items`.

### Accessing MongoDB

To access MongoDB, the `connectDB()` function in `lib/mongodb.js` is used. This function is an async function that returns a promise. The promise resolves to the MongoDB connection. This function is used in the API endpoints to connect to MongoDB. For example, let's take a look at `pages/api/mongo/items/get-items.js`:

```js
import connectDB from "@/lib/mongodb";
import Item from "@/models/item";

export default async function handler(req, res) {
  try {
    await connectDB();
    const items = await Item.find({});
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch items." });
  }
}
```

### Dynamic Routing

For dynamic routes, the file name of routes within `pages/api/` must include the square brackets. For example, let's take a look at `pages/api/mongo/items/get-item-by-id/[_id].js`

The code in this file is as follows:

```js
import connectDB from "@/lib/mongodb";
import Item from "@/models/item";

export default async function handler(req, res) {
  try {
    // get the id from the query
    const { _id } = req.query;
    console.log("id: ", _id);
    await connectDB();
    const item = await Item.findById(_id);
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch item." });
  }
}
```

For example, let's use route `/api/mongo/items/get-item-by-id/12345`. The `_id` will be `12345`. **NOTE**: The name of the file can be anything, but it must be in brackets for dynamic routing to work. Additionally,

## Client Routing

The client routing is also done through the `pages` folder. Each file in this folder is a page. For example, the `pages/index.jsx` file is the home page. The route for this page is `/`. In development, this would look like: `http://localhost:3000/`.

Another example is the `pages/items/index.jsx` file. This is the page that displays all of the items. The route for this page is `/items`. In development, this would look like: `http://localhost:3000/items`.

### Dynamic Routing
Dynamic routing on the client side is similar to the server. The file in the client route must have brackets and a name. For example, let's take a look at the file `pages/items/item/[_id].jsx`. The code in this file is as follows:

```jsx
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
```

# Forms and Form Validation
To deal with forms and form validation, [react-hook-form](https://react-hook-form.com/) is used. There is a `useForm()` hook that is used to register inputs and validate them. There are also more utilities that this hook can provide, and they can be accessed in the documentation.

## Example from the Documentation
```js
import { useForm } from "react-hook-form"

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => console.log(data)

  console.log(watch("example")) // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input defaultValue="test" {...register("example")} />

      {/* include validation with required or other standard HTML validation rules */}
      <input {...register("exampleRequired", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

      <input type="submit" />
    </form>
  )
}
```
# Fetching Data from Database

To fetch data from the database, [SWR](https://swr.vercel.app/) is used. SWR is a React Hooks library for remote data fetching. The following is an example of how to use SWR:

```js
import AddItemModal from "@/components/item-table/AddItemModal";
import ListRow from "@/components/item-table/ListRow";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import { useState } from "react";

const Items = () => {
  /**
   * SWR used for GET requests, and revalidates cache every 1 second
   * The first parameter of the useSWR hook is the API route, followed by the fetcher.
   * data: the data returned from the API
   * error: the error returned from the API
   * isLoading: boolean that indicates if the data is loading
   * All these three properties can be used to conditionally render components 
   */
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
```

