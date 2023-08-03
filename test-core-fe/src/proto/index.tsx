import { PropsWithChildren } from 'react'

const placeholderStyle = {
  border: 'solid 1px #aaa',
  margin: 20,
  padding: 20,
  height: '100%',
  fontFamily: 'sans-serif',
  color: '#666',
}

type PlaceholderProps = {
  name: string
}
export const Placeholder = (props: PropsWithChildren<PlaceholderProps>) => (
  <div className="wireframe-placeholder" style={placeholderStyle}>
    <h3>{props.name}</h3>
    {props.children}
  </div>
)
