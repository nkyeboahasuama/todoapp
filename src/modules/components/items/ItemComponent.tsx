import { useState } from "react";
import Navigation from "../navigation/Navigation";
import TodoItems from "./todo/TodoItems";

import CompletedTasks from "./completed/CompletedTasks";

const ItemComponent = () => {
  const [isShowCompletedTasks, setIsShowCompletedTasks] = useState(false);

  return (
    <>
      <div className="flex items-center w-full flex-col overflow-auto">
        <Navigation
          isShowCompletedTasks={isShowCompletedTasks}
          setIsShowCompletedTasks={setIsShowCompletedTasks}
        />
        {isShowCompletedTasks ? <CompletedTasks /> : <TodoItems />}
      </div>
    </>
  );
};

export default ItemComponent;
