// // import { BrowserRouter, Routes, Route } from "react-router-dom";

// // //import Login from "./pages/login";
// // //import Signup from "./pages/signup";
// // import Dashboard from "./pages/dashboard";
// // import MyWidgets from "./pages/myWidgets";

// // function App() {
// //   return (
// //     <BrowserRouter>
// //       <Routes>
         
// //         {/* <Route path="/" element={<Login />} />
// //         <Route path="/signup" element={<Signup />} /> */}
// //         <Route path="/dashboard" element={<Dashboard />} />
// //         <Route path="/my-widgets" element={<MyWidgets />} />
       
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }

// // export default App;

// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import Dashboard from "./pages/dashboard";
// import MyWidgets from "./pages/myWidgets";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* Redirect root to dashboard */}
//         <Route path="/" element={<Navigate to="/dashboard" />} />

//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/my-widgets" element={<MyWidgets />} />
//         <Route path="/login" element={<login />} />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/dashboard";
import MyWidgets from "./pages/myWidgets";
import Login from "./pages/login";   // 👈 add back

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default → Dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" />} />

        {/* Pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-widgets" element={<MyWidgets />} />
        <Route path="/login" element={<Login />} />  {/* 👈 needed */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;