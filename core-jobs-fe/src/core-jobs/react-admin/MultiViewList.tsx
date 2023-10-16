import { useListContext } from 'react-admin'

interface MultiViewListProps {
  children: React.ReactNode
  views: { [key: string]: React.ReactNode }
}

export const MultiViewList = ({ children, views }: MultiViewListProps) => {
  const { filterValues } = useListContext()

  if (filterValues.view && views[filterValues.view])
    return <>{views[filterValues.view]}</>

  return <>{children}</>
}