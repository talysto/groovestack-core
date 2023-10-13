import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Stack,
  Typography,
} from '@mui/material'

// const stack = [
//   { name: 'React Admin' },
//   { name: 'MUI' },
//   { name: 'Typescript / React' },
//   { name: 'GraphQL' },
//   { name: 'Ruby / Rails' },
//   { name: 'PostgreSQL' },
// ]

export const DemoWelcome = ({ modules }: { modules?: any[] }) => {
  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h4">Welcome to Groovestack</Typography>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <Typography>
                Groovestack is an opinionated full-stack framework for building
                modern, API-enabled applications with rich user interfaces. This
                is a live demo of CORE modules built on Groovestack. Feel free
                to play around with any of the buttons or forms. There's nothing
                here that can't be undone.
              </Typography>

              <Stack direction={'row'} gap={2} sx={{ mt: 5 }}>
                <Button
                  variant="outlined"
                  href="https://talysto.com/groovestack"
                >
                  Learn More...
                </Button>
                <Button
                  variant="outlined"
                  href="https://talysto.com/groovestack#install"
                >
                  Try Groovestack
                </Button>
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack direction={'column-reverse'} gap={1} sx={{}}>
                <Chip
                  avatar={
                    <Avatar
                      alt="PostgreSQL"
                      src="https://logo.clearbit.com/postgresql.com"
                    />
                  }
                  label="Postgres"
                  variant="outlined"
                />
                <Chip
                  avatar={
                    <Avatar
                      alt="Ruby on Rails"
                      src="https://logo.clearbit.com/rubyonrails.org"
                    />
                  }
                  label="Ruby on Rails"
                  variant="outlined"
                />
                <Chip
                  avatar={
                    <Avatar
                      alt="GraphQL"
                      src="https://logo.clearbit.com/graphql.org"
                    />
                  }
                  label="GraphQL"
                  variant="outlined"
                />
                {/* <Chip
                avatar={
                  <Avatar alt="React" src="https://logo.clearbit.com/react.dev" />
                }
                label="React"
                variant="outlined"
              /> */}
                <Chip
                  avatar={
                    <Avatar
                      alt="MUI"
                      src="https://logo.clearbit.com/marmelab.com"
                    />
                  }
                  label="React Admin"
                  variant="outlined"
                />
                {/* <Chip
                avatar={
                  <Avatar alt="MUI" src="https://logo.clearbit.com/mui.com" />
                }
                label="MUI"
                variant="outlined"
              /> */}
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ mt: 3, columns: 2 }}>
        {modules?.map((module) => (
          <Card
            key={module.name}
            style={{ breakInside: 'avoid' }}
            sx={{
              mb: 2,
              ':hover': {
                boxShadow: 6, // theme.shadows[20]
              },
            }}
          >
            <CardHeader
              title={module.title}
              subheader={module.name}
              action={<Chip label={module.version}></Chip>}
            />
            <CardContent>
              <Typography>{module.description}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                Docs
              </Button>
            </CardActions>
          </Card>
        ))}

        {/* <Card
          style={{ breakInside: 'avoid' }}
          sx={{
            ':hover': {
              boxShadow: 6, // theme.shadows[20]
            },
          }}
        >
          <CardHeader title="CORE Jobs" />
          <CardContent>
            <Typography>
              A higher performance alternative to Sidekiq that is built on
              PostgreSQL and Ruby on Rails. It integrates fully with ActiveJob
              and includes a full administrative UI for monitoring and job
              management.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Docs
            </Button>
          </CardActions>
        </Card> */}
      </Box>
    </>
  )
}
