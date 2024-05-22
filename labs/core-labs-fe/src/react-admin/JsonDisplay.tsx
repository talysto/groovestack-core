
export const JsonDisplay = (json: any) => {
  return (
    <code style={{ whiteSpace: 'nowrap' }}>
      {JSON.stringify(json, null, 2)}
    </code>
  );
};
