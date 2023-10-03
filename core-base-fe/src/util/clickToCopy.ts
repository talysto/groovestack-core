import './clickToCopy.css'

export const clickToCopy = {
  onClick: (element: React.MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(element.currentTarget.innerText)
  },
  className: 'copyable-content',
}
