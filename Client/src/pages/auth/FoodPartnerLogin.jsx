import { useState } from "react";
import { PrimaryButton } from "../../component/Button";
import { Card } from "../../component/Card";
import { FooterLinks } from "../../component/FooterLinks";
import { PageWrapper } from "../../component/PageWrapper";
import { TextField } from "../../component/TextField";
import { useNavigate } from "react-router";
import api from "../../lib/axios";
const FoodPartnerLogin = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/user/login-food-partner", {
        email: form.email,
        password: form.password,
      });
      console.log(res.data);
      // navigate("/");
    } catch (error) {
      console.log(error.response?.data || "error in login");
    } finally {
    }
  };
  return (
    <>
      <PageWrapper>
        <form onSubmit={handleSubmit}>
          <Card title="Partner login" subtitle="Access your dashboard">
            <TextField
              type="email"
              placeholder="Email address"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <TextField
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />

            <PrimaryButton type="submit">Login</PrimaryButton>

            <FooterLinks
              leftText="Create partner account"
              leftTo="/foodPartner-register"
            />
          </Card>
        </form>
      </PageWrapper>
    </>
  );
};

export { FoodPartnerLogin };
