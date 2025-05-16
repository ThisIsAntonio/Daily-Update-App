type AddUpdateButtonProps = {
    onClick: () => void
  }
  
  export default function AddUpdateButton({ onClick }: AddUpdateButtonProps) {
    return (
      <button
        onClick={onClick}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Add Update
      </button>
    )
  }
  