import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import BottomBar from "./pages/home/BottomBar";


function App() {
 
  return (
    <>
      <Toaster />
      <AppRoutes />
    </>
  );
}

export default App;
