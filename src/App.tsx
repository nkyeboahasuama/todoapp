import Header from "./modules/components/header/Header";
import ItemComponent from "./modules/components/items/ItemComponent";

function App() {
  return (
    <div className="App">
      <div className="w-full h-screen text-black flex items-center justify-center ">
        <div className="overflow-auto w-full h-full  ">
          <Header />
          <ItemComponent />
        </div>
      </div>
    </div>
  );
}

export default App;
