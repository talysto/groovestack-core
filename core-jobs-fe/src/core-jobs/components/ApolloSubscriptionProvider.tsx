import { DocumentNode, OperationVariables, useSubscription } from '@apollo/client';
import { useEffect } from 'react';

// export const JobsEditActions = () => {
//   const record = useRecordContext()
//   return (
//     <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//       {record.actions.includes('retry') && (
//         <UpdateButton label="Retry" data={{ instance_method: 'retry!' }} />
//       )}
//       {record.actions.includes('run_now') && (
//         <UpdateButton label="Run Now" data={{ instance_method: 'run_now!' }} />
//       )}
//       {record.actions.includes('delete') && <DeleteWithConfirmButton color="primary" label="" />}
//     </Box>
//   )
// }
interface ApolloSubscriptionProviderProps {
  Context: React.Context<any>;
  children: React.ReactNode;
  value: any;
  updateValue: (subscriptionData: any) => void;
  subscription: DocumentNode;
  variables: OperationVariables;
}
export const ApolloSubscriptionProvider = ({ Context, children, value, updateValue, subscription, variables }: ApolloSubscriptionProviderProps) => {
  const { data: subscriptionData } = useSubscription(
    subscription,
    {
      variables,
    }
  );

  useEffect(() => {
    updateValue(subscriptionData);
  }, [subscriptionData]);

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};
