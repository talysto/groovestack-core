import { faker } from '@faker-js/faker'

export const mockComments = (count = 15) =>
  Array.from({ length: count }, () => ({

    body: faker.lorem.paragraph(),

    id: faker.datatype.uuid(),
    created_at: faker.date.past(),
    updated_at: faker.date.past(),
  })
)