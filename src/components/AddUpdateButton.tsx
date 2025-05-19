// src/components/AddUpdateButton.tsx
import PrimaryButton from './PrimaryButton'

export default function AddUpdateButton({ onClick }: { onClick: () => void }) {
  return <PrimaryButton onClick={onClick} className="text-sm px-3 py-1">+ Add Update</PrimaryButton>
}
