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
        className={`p-2 bg-gray-500 text-gray-400 ${
          isShowCompletedTasks && "bg-orange-800 text-white"
        } `}
        onClick={() => setIsShowCompletedTasks(false)}
      >
        Todo
      </button>
      <button
        className={`p-2 bg-gray-500 text-gray-400 ${
          !isShowCompletedTasks && "bg-orange-800 text-white"
        } `}
        onClick={() => setIsShowCompletedTasks(true)}
      >
        Completed
      </button>
    </div>
  );
};

export default Navigation;
