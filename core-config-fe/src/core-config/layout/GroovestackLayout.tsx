import { AppBar, Layout,
  // AppBarProps, LayoutProps
} from 'react-admin'

// type GroovestackLayoutProps = {
//   AppBarProps?: AppBarProps
//   LayoutProps?: LayoutProps
// }

export const GroovestackLayout = (
  { AppBarProps, LayoutProps }: any, //TODO solve error TS2321: Excessive stack depth comparing types
  // GroovestackLayoutProps
) => {
  if (AppBarProps) {
    const GroovestackAppBar = () => <AppBar {...AppBarProps} />

    return <Layout {...LayoutProps} appBar={GroovestackAppBar} />
  }

  return <Layout {...LayoutProps} />
}
