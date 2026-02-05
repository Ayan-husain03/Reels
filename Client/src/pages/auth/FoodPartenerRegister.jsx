import { useState } from "react";
import { PrimaryButton } from "../../component/Button";
import { Card } from "../../component/Card";
import { FooterLinks } from "../../component/FooterLinks";
import { PageWrapper } from "../../component/PageWrapper";
import { TextField } from "../../component/TextField";
import { useNavigate } from "react-router";
import api from "../../lib/axios";
import toast from "react-hot-toast";

const FoodPartnerRegister = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });
  const navigate = useNavigate();
  // * handlechange function
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }
  // * handlesubmit function
  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(form);
    try {
      const res = await api.post("/user/register-food-partner", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        password: form.password,
      });
      console.log("success", res.data);
      toast.success(res.data?.message || "created successfully");
      // navigate("/")
    } catch (error) {
      console.error(error.response?.data || "error creating user");
      toast.error(
        error.response?.data?.message || "foodPartner is not created",
      );
    } finally {
      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
      });
    }
  }
  return (
    <PageWrapper>
      <form onSubmit={handleSubmit}>
        <Card title="Partner registration" subtitle="Join as a food partner">
          <TextField
            placeholder="Business / partner name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            type="email"
            name="email"
            placeholder="Business email"
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            type="text"
            name="phone"
            placeholder="phone"
            value={form.phone}
            onChange={handleChange}
          />
          <TextField
            type="text"
            name="address"
            placeholder="address"
            value={form.address}
            onChange={handleChange}
          />
          <TextField
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <PrimaryButton>Register as partner</PrimaryButton>

          <FooterLinks
            leftText="Already a partner? Login"
            leftTo="/foodPartner-login"
            rightText="Register as User"
            rightTo="/user-register"
          />
        </Card>
      </form>
    </PageWrapper>
  );
};

export { FoodPartnerRegister };
