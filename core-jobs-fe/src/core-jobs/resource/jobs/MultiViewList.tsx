import { useListContext } from 'react-admin';

export const MultiViewList = ({
  children, views,
}: {
  children: React.ReactNode;
  views: { [key: string]: JSX.Element; };
}) => {
  const { filterValues } = useListContext();

  if (filterValues.view && views[filterValues.view])
    return views[filterValues.view];

  return children;
};
