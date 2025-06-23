const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      {" "}
      <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"></div>
      <span className="ml-2">Loading</span>
    </div>
  );
};

export default Loading;
