type RandomiseButtonProps = {
  onClick: () => void
}

export function RandomiseButton({ onClick }: RandomiseButtonProps) {
  return (
    <button type="button" className="randomise" onClick={onClick}>
      Randomise meals
    </button>
  )
}
