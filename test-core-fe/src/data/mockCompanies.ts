import { faker } from '@faker-js/faker';

export const mockCompanies = ({ count = 15 }) => Array.from({ length: count }, () => ({
  name: faker.company.name(),
  address: faker.address.streetAddress(),

  type: 'Company',
  id: faker.datatype.uuid(),
  created_at: faker.date.past(),
  updated_at: faker.date.past()
})
);
