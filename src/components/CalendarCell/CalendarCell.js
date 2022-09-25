const Cell = ({ onClick, children, isActive }) => {
  return (
    <div
      onClick={onClick}
      className={`h-10 border-b border-r flex items-center justify-center select-none transition-colors 
        ${onClick ? "cursor-pointer hover:bg-black active:bg-gray-200": ""} ${isActive ? "font-bold text-white bg-blue-800" : ""}`}>
      {children}
    </div>
  );
};

export default Cell;