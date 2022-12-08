const placeholderStyle = {
  border: 'solid 1px #aaa',
  margin: 20,
  padding: 20,
  height: '100%',
  fontFamily: 'sans-serif',
  color: '#666',
}

export const Placeholder = ({ name, props }: { name: any; props?: any }) => (
  <div className="wireframe-placeholder" style={placeholderStyle}>
    <h3>{name}</h3>
    {props && (
      <div>
        <h4>Properties</h4>
        {props}
      </div>
    )}
  </div>
)
