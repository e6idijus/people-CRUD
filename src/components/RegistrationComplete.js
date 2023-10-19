import { useNavigate } from "react-router";

export default function RegistrationComplete() {
  let navigate = useNavigate();

  setTimeout(() => navigate("/people"), 2000);

  return <h6>A new profile was created!</h6>;
}
