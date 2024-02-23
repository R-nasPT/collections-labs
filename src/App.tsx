import { Routes, Route } from "react-router-dom";
import HeroList from "./pages/HeroList";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/heroes" element={<HeroList />} />
      </Routes>
    </>
  );
}

export default App;
