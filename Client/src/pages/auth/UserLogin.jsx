import { PrimaryButton } from "../../component/Button";
import { Card } from "../../component/Card";
import { FooterLinks } from "../../component/FooterLinks";
import { PageWrapper } from "../../component/PageWrapper";
import { TextField } from "../../component/TextField";

const UserLogin = () => (
  <PageWrapper>
    <Card title="Welcome back" subtitle="Login to continue">
      <TextField type="email" placeholder="Email address" />
      <TextField type="password" placeholder="Password" />

      <PrimaryButton>Login</PrimaryButton>

      <FooterLinks leftText="Create a new account" leftTo="/user-register" />
    </Card>
  </PageWrapper>
);

export { UserLogin };
