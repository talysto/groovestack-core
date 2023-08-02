import { faker } from '@faker-js/faker'

export type Comment = {
  id: string
  body: string
  created_at: string
  updated_at: string
  author_id: string
  author_type: string
  resource_id: string
  resource_type: string
}

export function mockComment() {
  return {
    body: faker.lorem.paragraph(),

    author_id: faker.string.uuid(),
    author_type: 'User',
    resource_id: faker.string.uuid(),
    resource_type: faker.helpers.arrayElement(['User', 'Company', 'Invoice']),

    id: faker.string.uuid(),
    created_at: faker.date.past(),
    updated_at: faker.date.past(),
  }
}

export function mockComments(count = 15) {
  return Array.from({ length: count }, () => mockComment())
}