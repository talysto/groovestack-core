const placeholderStyle = {
  border: 'solid 1px #aaa',
  margin: 20,
  padding: 20,
  height: '100%',
  fontFamily: 'sans-serif',
  color: '#666',
}

export const Placeholder = ({
  name,
  children,
}: {
  name: string
  children?: JSX.Element | JSX.Element[]
}) => (
  <div className="wireframe-placeholder" style={placeholderStyle}>
    <h3>{name}</h3>
    <div>{children}</div>
  </div>
)
