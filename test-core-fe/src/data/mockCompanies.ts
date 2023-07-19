import { faker } from '@faker-js/faker'

export const mockCompanies = (count = 15) =>
  Array.from({ length: count }, () => ({
    name: faker.company.name(),
    address: faker.location.streetAddress(),

    type: 'Company',
    id: faker.string.uuid(),
    created_at: faker.date.past(),
    updated_at: faker.date.past(),
  }))
