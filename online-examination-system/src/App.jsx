import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import SignIn from "./pages/SignIn.jsx";
import Instructions from "./pages/Instructions.jsx";
import Examination from "./pages/Examination.jsx";
import Marksheet from "./pages/Marksheet.jsx";
import NotFound from "./pages/NotFound.jsx";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/examination" element={<Examination />} />
          <Route path="/marksheet" element={<Marksheet />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;