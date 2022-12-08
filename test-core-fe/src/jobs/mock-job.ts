import { faker } from '@faker-js/faker'


const base = () => ({
  // standard attributes
  id: faker.datatype.uuid(),
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),

  // Creation attributes
  type: ['Mailer::Welcome', 'Notify::Slack', 'Reports::EndOfMonth', 'Payment:ProcessRefund'].sample(),
  jobClass: ['ActiveJob::QueueAdapters::QueAdapter::JobWrapper'].sample(),

  // arguments: {},
  // "kwargs": {},
  runAt: faker.date.future(),

  // job options
  queue: ['default', 'high', 'low', 'long-running'].sample(),
  priority: [1, 50, 100].sample(),
  status: ['scheduled', 'running', 'error', 'failed', 'complete'].sample(),

  expiredAt: faker.date.recent(),

  // error metadata
  errorCount: [0,0,0,3].sample(),
  lastError: {},
  lastErrorBacktrace: "/app/vendor/bundle/ruby/2.7.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:431:in `find_with_ids'\n/app/vendor/bundle/ruby/2.7.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:69:in `find'",
  lastErrorMessage: "ActiveRecord::RecordNotFound: Couldn't find User without an ID",

  // completion metadata
  finishedAt: faker.date.future(),

  actions: ['retry'].sample(),

  // que-specific
  data: {},
  args: [
    {
        job_id: "2f11a80b-069f-4570-9a24-c3142acf8a87"
    }
  ],
})

const admin = () => ({ ...base() })

export class job {
  static asAdmin = admin
  // static asCompany = manager
}
