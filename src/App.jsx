import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState({});
  console.log(user);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
      </Routes>
    </div>
  );
}

export default App;
