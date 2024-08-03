import NavFooter from "../common/NavFooter.jsx";
import DonationButton from "../common/DonationButton.jsx";

const Footer = () => {
  return (
    <footer>
      <p>© 2024 Tweet Code. All rights reserved.</p>
      <h3>Developers</h3>
      <h3>Support</h3>
      <h3>FAQ</h3>
      <NavFooter />
      <DonationButton />
    </footer>
  );
};

export default Footer;
