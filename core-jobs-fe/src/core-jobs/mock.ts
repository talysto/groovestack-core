import { faker } from '@faker-js/faker'
import dayjs, { Dayjs, ManipulateType } from 'dayjs'
import { jobStatuses } from './resource/jobs/jobsStatuses'

function dayjsRange(start: Dayjs, end: Dayjs, unit: ManipulateType) {
  const range = []
  let current = start
  while (!current.isAfter(end)) {
    range.push(current)
    current = current.add(1, unit)
  }
  return range
}

export function mockLockers(count = 15) {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    host: faker.word.adjective() + '_' + faker.word.noun(),
    pid: faker.number.int({ min: 9000, max: 15000 }),
    workers: faker.number.int({ min: 1, max: 6 }),
  }))
}

// export function mockStats(count = 3) {
//   return Array.from({ length: count }, () => ({
//     id: faker.string.uuid(),
//     job_class: `${faker.lorem.word()}::${faker.lorem.word()}`,
//     sub_class: `${faker.lorem.word()}::${faker.lorem.word()}`,
//     count: faker.number.int({ min: 1, max: 100_000 }),
//     count_working: faker.number.int({ min: 1, max: 24 }),
//     count_errored: faker.number.int({ min: 1, max: 24 }),
//     highest_error_count: faker.number.int({ min: 1, max: 24 }),
//     oldest_run_at: faker.date.past(),
//   }))
// }

function mockStats(count = 3) {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    job_class: `${faker.lorem.word()}::${faker.lorem.word()}`,
    sub_class: `${faker.lorem.word()}::${faker.lorem.word()}`,
    scheduled: faker.number.int({ min: 1, max: 100_000 }),
    queued: faker.number.int({ min: 1, max: 24 }),
    running: faker.number.int({ min: 1, max: 24 }),
    errored: faker.number.int({ min: 1, max: 24 }),
    failed: faker.number.int({ min: 1, max: 24 }),
    completed: faker.number.int({ min: 1, max: 24 }),
  }))
}

function mockReportByType(count = 3) {
  return {
    id: 'jobs_by_type',
    data: Array.from({ length: count }, () => ({
      id: faker.string.uuid(),
      job_class: `${faker.lorem.word()}::${faker.lorem.word()}`,
      sub_class: `${faker.lorem.word()}::${faker.lorem.word()}`,
      scheduled: faker.number.int({ min: 1, max: 100_000 }),
      queued: faker.number.int({ min: 1, max: 24 }),
      running: faker.number.int({ min: 1, max: 24 }),
      errored: faker.number.int({ min: 1, max: 24 }),
      failed: faker.number.int({ min: 1, max: 24 }),
      completed: faker.number.int({ min: 1, max: 24 }),
    })),
  }
}

function mockReportKPIs() {
  const workers = faker.number.int({ min: 1, max: 24 })

  return {
    id: 'jobs_kpis',
    data: [
      {
        scheduled: faker.number.int({ min: 1, max: 100_000 }),
        queued: faker.number.int({ min: 1, max: 24 }),
        running: faker.number.int({ min: 1, max: workers }),
        errored: faker.number.int({ min: 1, max: 24 }),
        failed: faker.number.int({ min: 1, max: 24 }),
        completed: faker.number.int({ min: 1, max: 24 }),
        workers: workers,
        oldest_queued_at: faker.date.recent(),
      },
    ],
  }
}

export function mockJobReports() {
  return [mockReportByPeriod(), mockReportByType(), mockReportKPIs()]
}

// const rpmMockData = [
//   ['Period', ...historyStatuses],
//   ...dayjsRange(
//     dayjs(roundedNow).subtract(1, 'hour'),
//     dayjs(roundedNow),
//     'minute',
//   ).map((d: Dayjs) => [
//     d.toISOString(),
//     ...historyStatuses.map(() => random(1, 50)),
//   ]),
// ]

// var result = arr.reduce(function(map, obj) {
//   map[obj.key] = obj.val;
//   return map;
// }, {});

function mockReportByPeriod() {
  const roundedNow = new Date(Math.ceil(new Date().getTime() / 60000) * 60000)

  return {
    id: 'jobs_by_period',
    data: dayjsRange(
      dayjs(roundedNow).subtract(1, 'hour'),
      dayjs(roundedNow),
      'minute',
    ).map((d: Dayjs) => {
      const base = { period: d.toISOString() }
      // @ts-ignore-line
      const statuses = Object.keys(jobStatuses).reduce(
        (map, status) => (
          (map[status] = faker.number.int({ min: 0, max: 400 })), map
        ),
        {},
      )

      return { ...base, ...statuses }
    }),
  }
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
    status: faker.helpers.arrayElement(Object.keys(jobStatuses)),

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
