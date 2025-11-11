import { Routes, Route } from "react-router-dom";
import HeroList from "./pages/HeroList";
import Homepage from "./pages/Homepage";
import Test from "./pages/Test";
import MutiApi from "./pages/mutiApi";
import TextAnimate from "./pages/TextAnimate";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/heroes" element={<HeroList />} />
        <Route path="/test" element={<Test />} />
        <Route path="/muti-api" element={<MutiApi />} />
        <Route path="/text-animate" element={<TextAnimate />} />
      </Routes>
  );
}

export default App;
