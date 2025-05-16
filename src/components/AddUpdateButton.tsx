type AddUpdateButtonProps = {
    onClick: () => void
  }
  
  export default function AddUpdateButton({ onClick }: AddUpdateButtonProps) {
    return (
      <button
        onClick={onClick}
        className="bg-gradient-to-r from-blue-700 to-blue-400 text-white px-4 py-2 rounded hover:brightness-110 transition"
      >
        + Add Update
      </button>
    )
  }
  