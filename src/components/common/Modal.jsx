const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-7 min-w-[500px] min-h-[200px] max-h-[80vh] overflow-y-auto">
        {children}
        <button
          onClick={onClose}
          className="mt-6 border-1 border-black/60 rounded-md p-2 px-4 cursor-pointer bg-gray-300 hover:bg-gray-400"
        >
          닫기
        </button>
      </div>
    </div>
  );
};
export default Modal;
