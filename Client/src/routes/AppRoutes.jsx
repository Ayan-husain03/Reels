import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { UserRegister } from "../pages/auth/UserRegister";
import { UserLogin } from "../pages/auth/UserLogin";
import { FoodPartnerLogin } from "../pages/auth/FoodPartnerLogin";
import { FoodPartnerRegister } from "../pages/auth/FoodPartenerRegister";
import Home from "../pages/home/Home";
import NotFound from "../pages/NotFound";
import { FoodPartnerDashboard } from "../pages/home/FoodPartnerDashboard";
import FoodPartnerProfile from "../pages/profile/FoodPartnerProfile";

function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/user-register" element={<UserRegister />} />
          <Route
            path="/foodPartner-register"
            element={<FoodPartnerRegister />}
          />
          <Route path="/foodPartner-login" element={<FoodPartnerLogin />} />
          <Route path="/create-food" element={<FoodPartnerDashboard />} />
          <Route path="/foodPartner/:id" element={<FoodPartnerProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;
