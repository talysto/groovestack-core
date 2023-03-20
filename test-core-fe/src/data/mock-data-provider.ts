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

const comments = mockComments(50).map((comment) => {
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

const versions = mockVersions(20)

export const mockDataProvider = fakeDataProvider(
  {
    // CORE Modules
    jobs: await mockJobs(15),
    lockers: await mockLockers(3),

    Comment: comments,
    Line: await mockLines({count: 20}),
    Version: versions,
    // For Testing Integrations
    User: users,
    Company: companies,
  },
  true
)

console.log(users)
console.log(comments)

// Comment
