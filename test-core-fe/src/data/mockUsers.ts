import { faker } from '@faker-js/faker';

export const mockUsers = ({ count = 15 }) => Array.from({ length: count }, () => ({
  name: faker.name.fullName(),

  type: 'User',
  id: faker.datatype.uuid(),
  created_at: faker.date.past(),
  updated_at: faker.date.past()
})
);
