import { Box, Stack, Typography } from '@mui/material';
import { Metric } from '../components/Metric';

export const Header = () => (
  <>
    <style>
      {`
tr > td > .show-on-hover {
  visibility: hidden;
}

tr:hover > td > .show-on-hover {
  visibility: visible;
}
`}
    </style>
    <Stack
      direction="row"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" sx={{}}>
        <span style={{ fontWeight: 700 }}>CORE</span>
        <span style={{ fontWeight: 200 }}>Jobs</span>
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: 'space-between',
          minWidth: '33%',
          m: 2,
          pr: 2,
          pl: 2,
        }}
      >
        <Box sx={{ flexBasis: '100%' }}>
          <Metric value="14" label="Queued" units="k" />
        </Box>
        <Box sx={{ flexBasis: '100%' }}>
          <Metric value="32" label="Latency" units="min" />
        </Box>
        <Box sx={{ flexBasis: '100%' }}>
          <Metric value="4" label="Errors" />
        </Box>
      </Stack>
    </Stack>
  </>
);
