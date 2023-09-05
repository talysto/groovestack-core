import { faker } from '@faker-js/faker'

export function mockLockers(count = 15) {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    host: faker.word.adjective() + '_' + faker.word.noun(),
    pid: faker.number.int({ min: 9000, max: 15000 }),
    workers: faker.number.int({ min: 1, max: 6 }),
  }))
}

// "data": [
//   {
//       "id": "ActiveJob::QueueAdapters::QueAdapter::JobWrapper/ActionMailer::MailDeliveryJob",
//       "type": "que/view/stats",
//       "attributes": {
//           "job_class": "ActiveJob::QueueAdapters::QueAdapter::JobWrapper",
//           "sub_class": "ActionMailer::MailDeliveryJob",
//           "count": 1,
//           "count_working": 0,
//           "count_errored": 1,
//           "highest_error_count": 8,
//           "oldest_run_at": "2023-09-05T22:46:24.544Z"
//       },
//       "links": {
//           "self": {
//               "name": "self",
//               "options": {},
//               "block": {}
//           }
//       }
//   },
export function mockStats(count = 3) {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    job_class: `${faker.lorem.word()}::${faker.lorem.word()}`,
    sub_class: `${faker.lorem.word()}::${faker.lorem.word()}`,
    count: faker.number.int({ min: 1, max: 100_000 }),
    count_working: faker.number.int({ min: 1, max: 24 }),
    count_errored: faker.number.int({ min: 1, max: 24 }),
    highest_error_count: faker.number.int({ min: 1, max: 24 }),
    oldest_run_at: faker.date.past(),
  }))
}

export function mockJobs(count = 15) {
  return Array.from({ length: count }, () => ({
    // standard attributes
    id: faker.string.uuid(),
    created_at: faker.date.recent(),
    updated_at: faker.date.recent(),

    // Creation attributes
    type: faker.helpers.arrayElement([
      'Mailer::Welcome',
      'Notify::Slack',
      'Reports::EndOfMonth',
      'Payment:ProcessRefund',
    ]),
    job_class: faker.helpers.arrayElement([
      'ActiveJob::QueueAdapters::QueAdapter::JobWrapper',
    ]),

    // arguments: {},
    // "kwargs": {},
    run_at: faker.date.future(),

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

    expired_at: faker.date.recent(),

    // error metadata
    error_count: faker.helpers.arrayElement([0, 0, 0, 3]),
    last_error: {},
    last_error_backtrace:
      "/app/vendor/bundle/ruby/3.0.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:431:in `find_with_ids'\n/app/vendor/bundle/ruby/2.7.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:69:in `find'",
    last_error_message:
      "ActiveRecord::RecordNotFound: Couldn't find User without an ID",

    // completion metadata
    finished_at: faker.date.future(),

    actions: faker.helpers.arrayElement([['retry'], [], []]),

    // que-specific
    data: {},
    args: [
      {
        job_id: '2f11a80b-069f-4570-9a24-c3142acf8a87',
      },
    ],
  }))
}
