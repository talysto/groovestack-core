import { Avatar } from '@mui/material';
import { get } from 'lodash';
import { ChipField, FieldProps, useRecordContext } from 'react-admin';

export const SourceField = (props: FieldProps) => {
  const record = useRecordContext(props);
  const { source } = props;

  if (!record || !source) return null;

  const value = get(record, source);
  const domain = domainFromSource(value);

  return (
    <ChipField
      avatar={<Avatar alt="value" src={`https://logo.clearbit.com/${domain}`} />}
      size='small'
      source='source'
      variant="outlined" />
  );
};
const domainFromSource = (source: string) => {
  const sourceMap: { [key: string]: string; } = {
    'totem': 'jointotem.com',
    'web': 'jointotem.com',
  };

  return sourceMap[source] || `${source}.com`;
};
