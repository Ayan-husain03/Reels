import { PrimaryButton } from "../../component/Button";
import { Card } from "../../component/Card";
import { FooterLinks } from "../../component/FooterLinks";
import { PageWrapper } from "../../component/PageWrapper";
import { TextField } from "../../component/TextField";
const FoodPartnerLogin = () => (
  <PageWrapper>
    <Card title="Partner login" subtitle="Access your dashboard">
      <TextField type="email" placeholder="Email address" />
      <TextField type="password" placeholder="Password" />

      <PrimaryButton>Login</PrimaryButton>

      <FooterLinks
        leftText="Create partner account"
        leftTo="/foodPartner-register"
      />
    </Card>
  </PageWrapper>
);

export { FoodPartnerLogin };
