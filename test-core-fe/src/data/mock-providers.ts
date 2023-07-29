import fakeDataProvider from 'ra-data-fakerest'
import { faker } from '@moonlight-labs/core-base-fe'
import { AuthProvider } from 'react-admin'

import { mockJobs, mockLockers } from '@moonlight-labs/core-jobs-fe'
import { mockComments } from '@moonlight-labs/core-comments-fe'
import { mockLines } from '@moonlight-labs/core-accounting-fe'
import { mockVersions } from '@moonlight-labs/core-versions-fe'
import { mockWebhooks } from '@moonlight-labs/core-webhooks-fe'

import { mockUsers } from './mockUsers'
import { mockCompanies } from './mockCompanies'

const users = mockUsers(10)
const companies = mockCompanies(5)

// console.log(mockComments(2))

const comments = mockComments(50).map((comment) => {
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

const versions = (await mockVersions({ count: 40 })).map((version: any) => {
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

let user: any
let resource: any
const dEntryTransferTypes = [
  {
    code: 'buy_aqd',
    credit_account: 'aqd_tokens',
    debit_account: 'aqd_treasury',
  },
  {
    code: 'spend_aqd',
    credit_account: 'aqd_treasury',
    debit_account: 'aqd_tokens',
  },
]

const lines = (await mockLines({ count: 10, dEntryTransferTypes })).map(
  (line: any, idx: number) => {
    let scope, partner_scope

    if (idx % 2 == 0) {
      //line 1
      user = faker.helpers.arrayElement(users)
      resource = faker.helpers.arrayElement([
        faker.helpers.arrayElement(users),
        faker.helpers.arrayElement(companies),
      ])
      scope = user.id
      partner_scope = resource.id
    } else {
      //line 2
      scope = resource.id
      partner_scope = user.id
    }
    return {
      ...line,
      scope,
      partner_scope,
    }
  },
)

const data = {
  // CORE Modules
  Comment: comments,
  Line: lines,
  Version: versions,
  Webhook: mockWebhooks,

  jobs: await mockJobs(15),
  lockers: await mockLockers(3),

  // For Testing Integrations
  User: users,
  Company: companies,
}

console.log(data)

export const mockDataProvider = fakeDataProvider(data, true)



type MockAuthProviderType = () => Promise<AuthProvider>

export const mockAuthProvider: MockAuthProviderType = async () => {
  // const resources = await import('../../dataProvider/mockData/seeds.json')

  const currentUser = users[0]

  return (
    {
      // authentication
      login: _params => {
        return Promise.resolve()
      },
      checkError: _error => Promise.resolve(),
      checkAuth: _params => {
        return Promise.resolve()
      },
      logout: () => Promise.resolve(),
      getIdentity: () => Promise.resolve(currentUser),
      handleCallback: () => Promise.resolve(), // for third-party authentication only
      // authorization
      getPermissions: () => Promise.resolve(['admin']),
    }
  )
}