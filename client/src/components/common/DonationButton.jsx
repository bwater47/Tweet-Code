import useDonationButton from "../../hooks/useDonationButton";

const DonationButton = () => {
  const handleDonation = useDonationButton();

  return <button onClick={handleDonation}>Donate</button>;
};

export default DonationButton;
