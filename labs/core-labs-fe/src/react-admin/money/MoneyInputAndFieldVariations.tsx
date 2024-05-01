import { Paper } from '@mui/material';
import { MoneyField } from './MoneyField';



export const MoneyInputAndFieldVariations = () => {
  const listA = useList({ data: recordsA, isLoading: false });
  const listB = useList({ data: recordsB, isLoading: false });

  return (
    <Paper>
      <Stack spacing={3} sx={{ p: 2 }}>
        <Typography variant="h5">MoneyInput</Typography>
        {/* <MoneyInputLocaleByCurrencyTable /> */}

        <Typography variant="h5">MoneyField</Typography>
        <ListContextProvider value={listA}>
          <Datagrid bulkActionButtons={false}>
            <TextField source="title" />
            <MoneyField source="price" currency="USD" />
            <WrapperField label="MoneyInput (GS Base)">
              <SimpleForm toolbar={false} sx={{ p: 0 }}>
                <MoneyInput source="price" helperText={false} currency="USD" />
              </SimpleForm>
            </WrapperField>
            <FunctionField
              label="Data Shape"
              render={(record) => <code>{JSON.stringify(record)}</code>} />
          </Datagrid>
        </ListContextProvider>

        <ListContextProvider value={listB}>
          <Datagrid bulkActionButtons={false}>
            <TextField source="title" />
            <MoneyField source="price.amount" currencySource="price.code" />
            <WrapperField label="MoneyInput (GS Base)">
              <SimpleForm toolbar={false} sx={{ p: 0 }}>
                <MoneyInput source="price" helperText={false} currency="USD" />
              </SimpleForm>
            </WrapperField>
            <FunctionField
              label="Data Shape"
              render={(record) => <code>{JSON.stringify(record)}</code>} />
          </Datagrid>
        </ListContextProvider>

      </Stack>
    </Paper>
  );
};
const recordsA = [
  { id: '1', title: 'Integer Price', price: 1000 },
  { id: '2', title: 'Decimal Price', price: 1000.5 },
  { id: '3', title: 'String/Integer Price', price: '1000' },
  { id: '4', title: 'String/Decimal Price', price: '1000.50' },
];
const recordsB = [
  {
    id: '5',
    title: 'ISO 4217 Integer',
    price: { code: 'USD', amount: 1000, display: '$1000' },
  },
  {
    id: '6',
    title: 'ISO 4217 Float',
    price: { code: 'USD', amount: 1000.5, display: '$1000.00' },
  },
  {
    id: '7',
    title: 'ISO 4217 String',
    price: { code: 'USD', amount: '1000.5' },
  },
];
