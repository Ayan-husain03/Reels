import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { UserRegister } from "../pages/auth/UserRegister";
import { UserLogin } from "../pages/auth/UserLogin";
import { FoodPartnerLogin } from "../pages/auth/FoodPartnerLogin";
import { FoodPartnerRegister } from "../pages/auth/FoodPartenerRegister";

function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Hello hi</h1>} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/user-register" element={<UserRegister />} />
          <Route
            path="//foodPartner-register"
            element={<FoodPartnerRegister />}
          />
          <Route path="/foodPartner-login" element={<FoodPartnerLogin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;
