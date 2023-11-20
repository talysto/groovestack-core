import { SaveButton, SaveButtonProps } from 'react-admin'

export const SaveOnlyToolbar = (props: SaveButtonProps) => (
  <div
    style={{
      backgroundColor: 'transparent',
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '16px',
    }}
  >
    <SaveButton {...props} />
  </div>
)
