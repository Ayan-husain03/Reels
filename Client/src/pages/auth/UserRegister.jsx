import { useState } from "react";
import { PrimaryButton } from "../../component/Button";
import { Card } from "../../component/Card";
import { FooterLinks } from "../../component/FooterLinks";
import { PageWrapper } from "../../component/PageWrapper";
import { TextField } from "../../component/TextField";
import api from "../../lib/axios";
import { useNavigate } from "react-router";

const UserRegister = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await api.post("/user/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      console.log("success: ", res.data);
        navigate("/")
    } catch (error) {
      console.error(error.response?.data || "error creating user");
    } finally {
      setLoading(false);
      setForm({
        name: "",
        email: "",
        password: "",
      });
    }
  };
  return (
      <PageWrapper>
          {/* {loading && <h1>Loading...</h1>} */}
      <form action="" onSubmit={handleSubmit}>
        <Card title="Create account" subtitle="Register as a user">
          <TextField
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full name"
          />
          <TextField
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email address"
          />
          <TextField
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
          />

          <PrimaryButton>Create account</PrimaryButton>

          <FooterLinks
            leftText="Already have an account? Login"
            leftTo="/user-login"
            rightText="Register as Food Partner"
            rightTo="/foodPartner-register"
          />
        </Card>
      </form>
    </PageWrapper>
  );
};

export { UserRegister };
