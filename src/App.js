import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Header from "./components/Header";
import ErrorPage from "./components/ErrorPage";
import Profile from "./components/Profile";
import People from "./components/People";
import Register from "./components/Register";

function App() {
  return (
    <>
      <Header />

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
          path="*"
          element={<ErrorPage />}
        />
      </Routes>

      {/* <footer>This is a footer</footer> */}
    </>
  );
}

export default App;
