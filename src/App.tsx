import { useState } from "react";
import Header from "./modules/components/header/Header";
import { todos } from "./modules/utils/items";
import ItemComponent from "./modules/components/items/ItemComponent";

function App() {
  const [itemsArray, setItemsArray] = useState(todos);

  return (
    <div className="App">
      <div className="w-full h-screen text-black flex items-center justify-center ">
        <div className="border overflow-auto border-slate-950 w-full h-full  ">
          <Header itemsArray={itemsArray} setItemsArray={setItemsArray} />
          <ItemComponent
            itemsArray={itemsArray}
            setItemsArray={setItemsArray}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
