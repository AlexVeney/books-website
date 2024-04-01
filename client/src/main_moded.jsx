import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Books, { booksLoader } from "./pages/Books";
//import Add, { addLoader } from "./pages/Add";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Books />,
    loader: booksLoader,
    children: [
      {
        path: "/add",
        element: <Books />,
        loader: booksLoader,
      },
      {
        path: "/update",
        element: <Books />,
        loader: booksLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);