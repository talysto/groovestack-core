import { AppBar, AppBarProps, Layout, LayoutProps } from 'react-admin'

type GroovestackLayoutProps = {
  AppBarProps?: AppBarProps
  LayoutProps?: LayoutProps
}

export const GroovestackLayout = ({ AppBarProps, LayoutProps}: GroovestackLayoutProps) => {
  if (AppBarProps) {

    const GroovestackAppBar = () => <AppBar {...AppBarProps} />

    return <Layout {...LayoutProps} 
    appBar={GroovestackAppBar}
     />
  }

  return <Layout {...LayoutProps} />
}
