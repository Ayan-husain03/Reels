import { useState } from "react";
import { PrimaryButton } from "../../component/Button";
import { Card } from "../../component/Card";
import { FooterLinks } from "../../component/FooterLinks";
import { PageWrapper } from "../../component/PageWrapper";
import { TextField } from "../../component/TextField";
import { useNavigate } from "react-router";
import api from "../../lib/axios";
import useAuthStore from "../../store/userAuthStore";

const UserLogin = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const {fetchUser} = useAuthStore()
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/user/login", {
        email: form.email,
        password: form.password,
      });
      await fetchUser()
      console.log(res.data);
      navigate("/");
    } catch (error) {
      console.log(error.response?.data || "error in login");
    } finally {
    }
  };
  return (
    <>
      <PageWrapper>
        <form onSubmit={handleSubmit}>
          <Card title="Welcome back" subtitle="Login to continue">
            <TextField
              type="email"
              placeholder="Email address"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <TextField
              type="password"
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />

            <PrimaryButton>Login</PrimaryButton>

            <FooterLinks
              leftText="Create a new account"
              leftTo="/user-register"
            />
          </Card>
        </form>
      </PageWrapper>
    </>
  );
};

export { UserLogin };
