import fakeDataProvider from 'ra-data-fakerest'
import { mockJobs, mockLockers } from 'core-jobs-fe'
import { mockComments } from 'core-comments-fe'

import { faker } from '@faker-js/faker'
import { mockUsers } from './mockUsers'
import { mockCompanies } from './mockCompanies'

const users = mockUsers(35)
const companies = mockCompanies(15)

const comments = mockComments(25).map((comment) => {
  const user = faker.helpers.arrayElement(users)
  const resource = faker.helpers.arrayElement([faker.helpers.arrayElement(users), faker.helpers.arrayElement(companies)])

  return ( {
    ...comment,
    author: user,
    resource: resource
  })
})

export default fakeDataProvider(
  {
    // CORE Modules
    jobs: mockJobs(15),
    lockers: mockLockers(3),
    Comment: comments,

    // For Testing Integrations
    User: users,
    Company: companies
  },
  true
)

// Comment


