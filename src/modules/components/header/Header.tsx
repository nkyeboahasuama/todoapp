import AddNewItemModal from "../../modal/AddNewItemModal";
import { useState } from "react";
import { GrAdd } from "react-icons/gr";

const Header = () => {
  const [addItemModal, setAddItemModal] = useState(false);

  const closeModal = () => {
    setAddItemModal(false);
  };

  return (
    <>
      <div className="w-full h-24 bg-orange-700  flex justify-center">
        <div className="flex items-center justify-between h-full w-11/12 px-3">
          <div className="text-white text-xl font-bold">Todo App</div>
          <div className="bg-white rounded-full w-6 h-6 text-xl flex justify-center items-center">
            <button
              className="flex items-center justify-center w-4"
              onClick={() => setAddItemModal(true)}
            >
              <GrAdd />
            </button>
          </div>
        </div>
      </div>
      {addItemModal && <AddNewItemModal closeModal={closeModal} />}
    </>
  );
};

export default Header;
