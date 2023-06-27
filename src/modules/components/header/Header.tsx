import React from "react";
import AddNewItemModal from "../../modal/AddNewItemModal";
import { useState } from "react";
import { ITodoTypes } from "../../utils/items";
import { GrAdd } from "react-icons/gr";
interface IHeaderProps {
  itemsArray: ITodoTypes[];
  setItemsArray: React.Dispatch<React.SetStateAction<ITodoTypes[]>>;
}

const Header: React.FC<IHeaderProps> = ({ setItemsArray, itemsArray }) => {
  const [addItemModal, setAddItemModal] = useState(false);

  const closeModal = () => {
    setAddItemModal(false);
  };

  return (
    <>
      <div className="w-full h-24 bg-orange-700 mb-5 flex justify-center">
        <div className="flex items-center justify-between h-full w-11/12 px-3">
          <div className="text-white text-xl font-bold">Todo App</div>
          <div className="bg-white rounded-full w-8 h-8 text-xl flex justify-center items-center">
            <button
              className="flex items-center justify-center"
              onClick={() => setAddItemModal(true)}
            >
              <GrAdd />
            </button>
          </div>
        </div>
      </div>
      {addItemModal && (
        <AddNewItemModal
          closeModal={closeModal}
          setItemsArray={setItemsArray}
          itemsArray={itemsArray}
        />
      )}
    </>
  );
};

export default Header;
