import "./App.css";
import Mockman from "mockman-js";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<>This is HomePage</>} />
        <Route path="/mockman" element={<Mockman />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
