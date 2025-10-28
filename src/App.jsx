import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./store";

import ToasterComponent from "./components/ToasterComponent";
import { routes } from "./routes/routes";


const router = createBrowserRouter(routes);

function AppContent() {
  return (
    <>
      <RouterProvider router={router} />
      <ToasterComponent />
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
}
