import { PrimaryButton } from "../../component/Button";
import { Card } from "../../component/Card";
import { FooterLinks } from "../../component/FooterLinks";
import { PageWrapper } from "../../component/PageWrapper";
import { TextField } from "../../component/TextField";

const UserRegister = () => (
  <PageWrapper>
    <Card title="Create account" subtitle="Register as a user">
      <TextField placeholder="Full name" />
      <TextField type="email" placeholder="Email address" />
      <TextField type="password" placeholder="Password" />

      <PrimaryButton>Create account</PrimaryButton>

      <FooterLinks
        leftText="Already have an account? Login"
        leftTo="/user-login"
        rightText="Register as Food Partner"
        rightTo="/foodPartner-register"
      />
    </Card>
  </PageWrapper>
);

export { UserRegister };
