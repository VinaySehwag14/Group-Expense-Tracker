import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Layout from "./Layout.tsx";
import Expenses from "./pages/Expenses.tsx";
import Group from "./pages/Group.tsx";
import GroupPage from "./pages/GroupPage.tsx";
import Home from "./pages/Home.tsx";
import JoinGroup from "./pages/JoinGroup.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="groups" element={<Group />} />
      <Route path="/group/:id" element={<GroupPage />} />
      <Route path="/join/:id" element={<JoinGroup />} />
      <Route path="expenses" element={<Expenses />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
