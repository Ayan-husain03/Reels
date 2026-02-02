import { PrimaryButton } from "../../component/Button";
import { Card } from "../../component/Card";
import { FooterLinks } from "../../component/FooterLinks";
import { PageWrapper } from "../../component/PageWrapper";
import { TextField } from "../../component/TextField";

const FoodPartnerRegister = () => (
  <PageWrapper>
    <form>
      <Card title="Partner registration" subtitle="Join as a food partner">
        <TextField placeholder="Business / partner name" />
        <TextField type="email" placeholder="Business email" />
        <TextField type="text" placeholder="phone" />
        <TextField type="text" placeholder="address" />
        <TextField type="password" placeholder="Password" />

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

export { FoodPartnerRegister };
