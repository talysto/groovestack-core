import { List, RefreshButton, TopToolbar } from 'react-admin';
import { TypographyInput } from '../react-admin/inputs/TypographyInput';



export const JobReportChart = ({
  title, filter, children,
}: {
  title: string;
  filter: any;
  children: any;
}) => {
  return (
    <List
      title=''
      resource="JobReport"
      filter={filter}
      exporter={false}
      disableSyncWithLocation
      actions={<TopToolbar>
        <RefreshButton />
      </TopToolbar>}
      // empty={<>No data</>}
      empty={false}
      pagination={false}
      perPage={100}
      sx={{ '& .RaList-content': { boxShadow: 'none' } }}
      filters={<ChartFilters title={title} />}

    >
      {children}
    </List>
  );
};
const ChartFilters = ({ title }: { title: string; }) => [
  <TypographyInput key={'na_title'} source={'title'} alwaysOn>
    {title}
  </TypographyInput>,
  // <CheckboxGroupInput
  //   key={'statuses'}
  //   alwaysOn
  //   source="status"
  //   label={false}
  //   size="small"
  //   choices={jobStatuses}
  // />,
  // <DateRangeFilter key={'range'}
  //   defaultValue={CommonDateRanges.Today.getValue()}
  //   // namedFilters={cashFlowShortcuts}
  //   />
  // formatValueForSearchParams: formatDateRangeForSearchParams,
  // transformSearchParamsToVal: transformSearchParamsToDateRange,
];
