import fakeDataProvider from 'ra-data-fakerest'
import { mockJobs, mockLockers } from 'core-jobs-fe'
import { mockComments } from 'core-comments-fe'
import { mockLines, mockTransfers } from 'core-accounting-fe'
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
const lines = (await mockTransfers({ count: 150 })).map((line, idx) => {
  console.log("asdf")
  const user = faker.helpers.arrayElement(users)
  const resource = faker.helpers.arrayElement([
    faker.helpers.arrayElement(users),
    faker.helpers.arrayElement(companies),
  ])
  let scope, partnerScope
  if (!(idx % 2)) { //line 1
    scope = user.id
    partnerScope = resource.id
  }
  else { //line 2
    scope = resource.id
    partnerScope = user.id
  }
  return {
    ...line,
    scope: scope,
    partnerScope: partnerScope
  }
  // const line1 = {
  //   ...transfer,

  //   // userId: user.id, //doesnt match payload
  //   id: faker.datatype.uuid(), // not sure
  //   account: "aqd_tokens", //faker.datatype.uuid(),
  //   scope: user.id //faker.datatype.uuid(),
  //   code: ['buy_aqd', 'spend_aqd', 'transfer_aqd?'].sample(),

  //   partnerId: resource.id,
  //   partnerAccount: "aqd_treasury",
  //   partnerScope: resource.id //faker.datatype.uuid(),
  // }

  // const line2 = { //line 2 (FLIP)

  //   ...transfer,
  //   amount: (-1 * line1.amount),
  //   //balance?
  //   id: faker.datatype.uuid(), // not sure
  //   userId: line1.partnerId, //doesnt match payload
  //   account: line1.partnerAccount,
  //   scope: line1.partnerScope,
  //   code: "",//oppsite of line 1 code (make a func for this)

  //   partnerId: line1.id,
  //   partnerAccount: "aqd_treasury",
  //   partnerScope: faker.datatype.uuid(),

  // }
  // allTransfers.push(line1, line2)

  // actor_id: user.id,
  // actor_type: user.type,

  // resource_id: resource.id,
  // resource_type: resource.type,

  // author: user,
  // resource: resource
})

//export const transfers = allTransfers;

// - Define types of Accounts that exist and scope to user / unit(ie type of bank and a user is the scope)
//   - And specify the transfers that can exist between accounts



// for each pair of credit / debit lines
//   grab a user & a company
//   line 1 has user as account / scope and company as partner account / scope
//   line 2 has company as account / scope and user as partner account / scope

export const mockDataProvider = fakeDataProvider(
  {
    // CORE Modules
    jobs: await mockJobs(15),
    lockers: await mockLockers(3),

    Comment: comments,
    // Line: await mockLines({ count: 20 }),
    Line: lines,
    //Transfer: transfers,
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
