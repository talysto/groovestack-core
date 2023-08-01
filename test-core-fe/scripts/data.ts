import { faker } from '@faker-js/faker'

// import { mockJobs, mockLockers } from '@moonlight-labs/core-jobs-fe'
import { mockWebhooks } from '@moonlight-labs/core-webhooks-fe/mock'
import { mockComments } from '@moonlight-labs/core-comments-fe/mock'
// import { mockLines } from '@moonlight-labs/core-accounting-fe'
import { mockVersions } from '@moonlight-labs/core-versions-fe/mock'

import { mockUsers } from '../src/data/mockUsers'
import { mockCompanies } from '../src/data/mockCompanies'

const users = mockUsers(10)
const companies = mockCompanies(5)

const versions = mockVersions({ count: 40 }).map((version: any) => {
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

const comments = mockComments(50).map((comment: any) => {
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
  Webhook: mockWebhooks,
  // Line: lines,
  // jobs: mockJobs(15),
  // lockers: mockLockers(3),

  // For Testing Integrations
  User: users,
  Company: companies,
}

console.log(JSON.stringify(data, null, 2))
