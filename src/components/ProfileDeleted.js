import { useNavigate } from "react-router";

export default function ProfileDeleted() {
  let navigate = useNavigate();

  setTimeout(() => navigate("/people"), 2000);

  return <h6>Profile deleted!</h6>;
}
