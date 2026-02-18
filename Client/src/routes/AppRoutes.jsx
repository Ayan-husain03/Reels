import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { UserRegister } from "../pages/auth/UserRegister";
import { UserLogin } from "../pages/auth/UserLogin";
import { FoodPartnerLogin } from "../pages/auth/FoodPartnerLogin";
import { FoodPartnerRegister } from "../pages/auth/FoodPartenerRegister";
import Home from "../pages/home/Home";
import NotFound from "../pages/NotFound";
import { FoodPartnerDashboard } from "../pages/home/FoodPartnerDashboard";
import FoodPartnerProfile from "../pages/profile/FoodPartnerProfile";
import { useState } from "react";
import BottomBar from "../pages/home/BottomBar";
import UserProfile from "../pages/profile/UserProfile";
import ProtectedRoute from "./ProtectedRoute";
import useAuthStore from "../store/userAuthStore";
import SavedFoods from "../pages/home/SavedFoods";

function AppRoutes() {
  const [active, setActive] = useState("home");
  const { fetchUser } = useAuthStore();
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/user-register" element={<UserRegister />} />
          <Route
            path="/foodPartner-register"
            element={<FoodPartnerRegister />}
          />
          <Route path="/foodPartner-login" element={<FoodPartnerLogin />} />
          <Route path="/create-food" element={<FoodPartnerDashboard />} />
          <Route path="/foodPartner/:id" element={<FoodPartnerProfile />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-food"
            element={
              <ProtectedRoute>
                <SavedFoods />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BottomBar active={active} setActive={setActive} />
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;
