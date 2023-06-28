import React from "react";
import { useState } from "react";
import { ITodoTypes } from "../../utils/items";
import Navigation from "../navigation/Navigation";
import CompletedItems from "./completed/CompletedItems";
import TodoItems from "./todo/TodoItems";

interface IItemComponentProps {
  itemsArray: ITodoTypes[];
  setItemsArray: React.Dispatch<React.SetStateAction<ITodoTypes[]>>;
}

const ItemComponent: React.FC<IItemComponentProps> = ({
  itemsArray,
  setItemsArray,
}) => {
  const [isShowCompletedTasks, setIsShowCompletedTasks] = useState(false);

  return (
    <>
      <div className="flex items-center w-full flex-col overflow-auto">
        <Navigation
          isShowCompletedTasks={isShowCompletedTasks}
          setIsShowCompletedTasks={setIsShowCompletedTasks}
        />
        {isShowCompletedTasks ? (
          <CompletedItems
            itemsArray={itemsArray}
            setItemsArray={setItemsArray}
          />
        ) : (
          <TodoItems itemsArray={itemsArray} setItemsArray={setItemsArray} />
        )}
      </div>
    </>
  );
};

export default ItemComponent;
