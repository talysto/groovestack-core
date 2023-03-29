import fakeDataProvider from 'ra-data-fakerest'
import { mockJobs, mockLockers } from 'core-jobs-fe'
import { mockComments } from 'core-comments-fe'
import { mockLines } from 'core-accounting-fe'
import { mockVersions } from 'core-versions-fe'

import { faker } from '@faker-js/faker'
import { mockUsers } from './mockUsers'
import { mockCompanies } from './mockCompanies'


const users = mockUsers(10)
const companies = mockCompanies(5)

const comments = (await mockComments({ count: 50 })).map((comment) => {
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

const versions = (await mockVersions({ count: 20 })).map((version) => {
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

//a transfer is 2 lines, so 8 mock transfers returns 16 lines
// for each pair of credit / debit lines
//   grab a user & a company
//   line 1 has user as account / scope and company as partner account / scope
//   line 2 has company as account / scope and user as partner account / scope

const dEntryTransferTypes = [
  { code: 'buy_aqd', credit_account: 'aqd_tokens', debit_account: 'aqd_treasury'}, 
  { code: 'spend_aqd', credit_account: 'aqd_treasury', debit_account: 'aqd_tokens'}
]

let user: any
let resource: any;

const lines = (await mockLines({ count: 10, dEntryTransferTypes })).map((line, idx) => {
  let scope, partner_scope

  if (idx % 2 == 0) { //line 1
    user = faker.helpers.arrayElement(users)
    resource = faker.helpers.arrayElement([
      faker.helpers.arrayElement(users),
      faker.helpers.arrayElement(companies),
    ])
    scope = user.id
    partner_scope = resource.id
  }
  else { //line 2
    scope = resource.id
    partner_scope = user.id
  }
  return {
    ...line,
    scope,
    partner_scope
  }
})

export const mockDataProvider = fakeDataProvider(
  {
    // CORE Modules
    jobs: await mockJobs(15),
    lockers: await mockLockers(3),
    Comment: comments,
    Line: lines,
    Version: versions,
    // For Testing Integrations
    User: users,
    Company: companies,
  },
  true
)

console.log(users)
console.log(comments)
console.log(lines)

// Comment
