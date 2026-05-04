import { BrowserRouter, Routes, Route } from "react-router-dom";

//import Login from "./pages/login";
//import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import MyWidgets from "./pages/myWidgets";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-widgets" element={<MyWidgets />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;