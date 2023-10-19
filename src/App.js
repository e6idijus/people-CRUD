import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Header from "./components/Header";
import ErrorPage from "./components/ErrorPage";
import Profile from "./components/Profile";
import People from "./components/People";
import Register from "./components/Register";
import ProfileDeleted from "./components/ProfileDeleted";
import RegistrationComplete from "./components/RegistrationComplete";

function App() {
  return (
    <>
      <Header />

      <div className="mt-4">
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/about"
            element={<About />}
          />
          <Route
            path="/profile/:id"
            element={<Profile />}
          />
          <Route
            path="/people"
            element={<People />}
          />
          <Route
            path="/deleted"
            element={<ProfileDeleted />}
          />
          <Route
            path="/complete"
            element={<RegistrationComplete />}
          />
          <Route
            path="*"
            element={<ErrorPage />}
          />
        </Routes>
      </div>
      {/* <footer>This is a footer</footer> */}
    </>
  );
}

export default App;
