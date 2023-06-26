import React from "react";
import { useState } from "react";
import { ITodoTypes } from "../utils/items";

interface IItemModalProps {
  closeModal: () => void;
  selectedItem: ITodoTypes;
}

const ItemModal: React.FC<IItemModalProps> = ({ closeModal, selectedItem }) => {
  return (
    <div className="w-full h-screen bg-black bg-opacity-30 flex justify-center absolute top-0 left-0 items-center">
      <div className="w-2/5 h-2/5 bg-white text-black px-5">
        <div className=" h-4/5">
          <div>
            {selectedItem.id}-{selectedItem.title}
          </div>
          <button className="bg-blue-500">Edit</button>
        </div>
        <div className="w-full h-1/5 flex justify-center items-center">
          <button onClick={closeModal} className="bg-red-500 w-full h-3/5">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
