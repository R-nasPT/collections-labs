import { Routes, Route } from "react-router-dom";
import HeroList from "./pages/HeroList";
import Homepage from "./pages/Homepage";
import Test from "./pages/Test";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/heroes" element={<HeroList />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </>
  );
}

export default App;
