// src/components/AddUpdateButton.tsx
import PrimaryButton from './PrimaryButton'

export default function AddUpdateButton({ onClick }: { onClick: () => void }) {
  return <PrimaryButton onClick={onClick}>+ Add Update</PrimaryButton>
}
