import './clickToCopy.css'

export const clickToCopy = {
  onClick: (element: React.MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(element.currentTarget.innerText)
    // TODO
    // Change the mouse cursor for .5s to 'progress' to indicate that the text has been copied
  },
  className: 'copyable-content',
}
