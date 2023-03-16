import { faker } from '@faker-js/faker'

export const mockLockers = ({ count = 15 }) =>
  Array.from({ length: count }, () => ({
    id: faker.datatype.uuid(),
    host: faker.word.adjective() + '_' + faker.word.noun(),
    pid: 12332,
    wokers: faker.random.numeric()
  })
)

export const mockJobs = ({ count = 15 }) =>
  Array.from({ length: count }, () => ({
    // standard attributes
    id: faker.datatype.uuid(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),

    // Creation attributes
    type: faker.helpers.arrayElement([
      'Mailer::Welcome',
      'Notify::Slack',
      'Reports::EndOfMonth',
      'Payment:ProcessRefund',
    ]),
    jobClass: faker.helpers.arrayElement([
      'ActiveJob::QueueAdapters::QueAdapter::JobWrapper',
    ]),

    // arguments: {},
    // "kwargs": {},
    runAt: faker.date.future(),

    // job options
    queue: faker.helpers.arrayElement([
      'default',
      'high',
      'low',
      'long-running',
    ]),
    priority: faker.helpers.arrayElement([1, 50, 100]),
    status: faker.helpers.arrayElement([
      'scheduled',
      'running',
      'error',
      'failed',
      'complete',
    ]),

    expiredAt: faker.date.recent(),

    // error metadata
    errorCount: faker.helpers.arrayElement([0, 0, 0, 3]),
    lastError: {},
    lastErrorBacktrace:
      "/app/vendor/bundle/ruby/3.0.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:431:in `find_with_ids'\n/app/vendor/bundle/ruby/2.7.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:69:in `find'",
    lastErrorMessage:
      "ActiveRecord::RecordNotFound: Couldn't find User without an ID",

    // completion metadata
    finishedAt: faker.date.future(),

    actions: faker.helpers.arrayElement([['retry'], [], []]),

    // que-specific
    data: {},
    args: [
      {
        job_id: '2f11a80b-069f-4570-9a24-c3142acf8a87',
      },
    ],
  }))
