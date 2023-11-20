import { faker } from '@faker-js/faker'

import { mockJobs, mockLockers, mockJobReports } from '@groovestack/jobs/mock'
import { mockWebhooks } from '@groovestack/webhooks/mock'
import { mockComments } from '@groovestack/comments/mock'
import { mockVersions } from '@groovestack/versions/mock'
import { mockNotifications } from '@groovestack/notifications/mock'

import { mockIdentities } from '../src/data/mockIdentities'
import { mockUsers } from '../src/data/mockUsers'
import { mockCompanies,
  //  mockIdentities
   } from '../src/data/mockCompanies'
import { mock } from 'node:test'

const users = mockUsers(10)
let identities = []

users.forEach((user) => {
  const identity = faker.helpers.arrayElement(mockIdentities(30, user))
  identities.push(identity)
})

const companies = mockCompanies(5)
const webhooks = mockWebhooks()

// ensure current user has notifications

let notifications = mockNotifications(1, () => users[0], 'Task')
notifications = [...notifications, ...mockNotifications(1, () => users[0], 'Simple')]
notifications = [...notifications, ...mockNotifications(1, () => users[0], 'Global')]

notifications = [...notifications, ...mockNotifications(40, () => faker.helpers.arrayElement(users))]

const versions = mockVersions(40).map((version: any) => {
  const user = faker.helpers.arrayElement(users)
  const resource = faker.helpers.arrayElement([
    faker.helpers.arrayElement(users),
    faker.helpers.arrayElement(companies),
  ])
  return {
    ...version,
    actor_id: user.id,
    actor_type: user.type,
    resource_id: resource.id,
    resource_type: resource.type,
    // author: user,
    // resource: resource
  }
})

// let user: any
// let resource: any
// const dEntryTransferTypes = [
//   {
//     code: 'buy_aqd',
//     credit_account: 'aqd_tokens',
//     debit_account: 'aqd_treasury',
//   },
//   {
//     code: 'spend_aqd',
//     credit_account: 'aqd_treasury',
//     debit_account: 'aqd_tokens',
//   },
// ]
// const lines = mockLines({ count: 10, dEntryTransferTypes }).map(
//   (line: any, idx: number) => {
//     let scope, partner_scope
//     if (idx % 2 == 0) {
//       //line 1
//       user = faker.helpers.arrayElement(users)
//       resource = faker.helpers.arrayElement([
//         faker.helpers.arrayElement(users),
//         faker.helpers.arrayElement(companies),
//       ])
//       scope = user.id
//       partner_scope = resource.id
//     } else {
//       //line 2
//       scope = resource.id
//       partner_scope = user.id
//     }
//     return {
//       ...line,
//       scope,
//       partner_scope,
//     }
//   },
// )

// console.log(mockComments(2))

const comments = mockComments(200).map((comment: any) => {
  // const comments = mockComments({ count: 50 }).map((comment) => {
  const user = faker.helpers.arrayElement(users)
  const resource = faker.helpers.arrayElement([
    faker.helpers.arrayElement(users),
    faker.helpers.arrayElement(companies),
  ])

  return {
    ...comment,

    author_id: user.id,
    author_type: user.type,

    resource_id: resource.id,
    resource_type: resource.type,

    // author: user,
    // resource: resource
  }
})

const data = {
  // CORE Modules
  Comment: comments,
  Version: versions,
  Webhook: webhooks,
  Notification: notifications,

  // Line: lines,
  Job: mockJobs(15),
  JobLocker: mockLockers(3),
  // JobStat: mockStats(4),
  JobReport: mockJobReports(),

  // For Testing Integrations
  User: users,
  Company: companies,
  Identity: identities
}

// console.log(JSON.stringify(data, null, 2))


