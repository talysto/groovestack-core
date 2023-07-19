import { faker } from '@faker-js/faker'

export const mockUsers = (count = 15) =>
  Array.from({ length: count }, () => ({
    name: faker.person.fullName(),

    type: 'User',
    id: faker.string.uuid(),
    created_at: faker.date.past(),
    updated_at: faker.date.past(),
  }))
