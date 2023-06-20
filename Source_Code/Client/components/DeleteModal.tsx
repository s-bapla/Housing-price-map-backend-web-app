interface prop {
  setShouldDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteModal = ({ setShouldDelete, setShowDeleteModal }: prop) => {
  const onDeleteSelected = () => {
    setShowDeleteModal(false);
  };

  const onCancelSelected = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="fixed h-screen w-screen flex items-center justify-center ">
      <div className="bg-white px-8 py-8 z-20 rounded flex flex-col items-center">
        Are you sure you want to delete this item ?
        <div className="flex mt-8 justify-end text-right w-full">
          <button
            className="px-4 py-2 bg-white text-slate-700 rounded mr-2 hover:text-black hover:underline active:scale-95"
            onClick={onCancelSelected}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-rose-500 text-white rounded  hover:bg-black active:scale-95"
            onClick={onDeleteSelected}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="fixed inset-0 bg-black opacity-50 "></div>
    </div>
  );
};

export default DeleteModal;
