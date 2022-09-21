const Cell = ({ onClick, children, isActive }) => {
  return (
    <div
      onClick={!isActive ? onClick : undefined}
      className={`h-10 border-b border-r flex items-center justify-center select-none transition-colors 
        ${!isActive && onClick ? "cursor-pointer hover:bg-gray-100 active:bg-gray-200": ""} ${isActive ? "font-bold text-white bg-blue-600" : ""}`}
    >
      {children}
    </div>
  );
};

export default Cell;