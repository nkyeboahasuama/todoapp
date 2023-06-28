import React from "react";

interface INavigationProps {
  setIsShowCompletedTasks: React.Dispatch<React.SetStateAction<boolean>>;
  isShowCompletedTasks: boolean;
}

const Navigation: React.FC<INavigationProps> = ({
  setIsShowCompletedTasks,
  isShowCompletedTasks,
}) => {
  return (
    <div className="w-full my-3 flex items-center justify-center text-white font-medium">
      <button
        className={`p-2 ${
          isShowCompletedTasks ? "bg-green-500" : "bg-gray-500 text-gray-400"
        } `}
        onClick={() => setIsShowCompletedTasks(false)}
      >
        Todo
      </button>
      <button
        className={`p-2 ${
          isShowCompletedTasks ? "bg-gray-500 text-gray-400" : "bg-green-500"
        } `}
        onClick={() => setIsShowCompletedTasks(true)}
      >
        Completed
      </button>
    </div>
  );
};

export default Navigation;
