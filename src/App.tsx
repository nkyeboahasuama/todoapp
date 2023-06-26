import React from "react";
import Input from "./modules/components/input/Input";
import ItemsListComponent from "./modules/components/items/ItemsListComponent";
import Header from "./modules/components/header/Header";

function App() {
  return (
    <div className="App">
      <div className="w-full h-screen text-black flex items-center justify-center">
        <div className="border border-slate-950 w-3/5 h-4/5  ">
          {/* <Input /> */}
          <Header />
          <ItemsListComponent />
        </div>
      </div>
    </div>
  );
}

export default App;
