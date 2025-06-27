import React, { useState } from "react";
import Home from "./components/Home";
import Result from "./components/Result";

const App = () => {
  const [people, setPeople] = useState([]);
  const [items, setItems] = useState([]);

  return (
    <div
      className="relative min-h-screen mb-4 bg-cover bg-center bg-fixed flex justify-center w-full overflow-hidden "
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40 pointer-events-none z-0 backdrop-blur-sm"></div>
      <div className="relative z-10 w-full max-w-8xl bg-white/80 rounded-lg p-4 m-10">
        <Home people={people} setPeople={setPeople} items={items} setItems={setItems} />
        <Result people={people} items={items} setItems={setItems} />
      </div>
    </div>
  );
};

export default App;
