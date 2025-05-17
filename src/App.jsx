import { useState } from "react";
import Weather from "./Components/Weather";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen grid bg-[#e2d4ff]">
      <Weather />
    </div>
  );
}

export default App;

