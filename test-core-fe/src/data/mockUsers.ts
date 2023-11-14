import { faker } from '@faker-js/faker'

export const mockUsers = (count = 15) =>
  Array.from({ length: count }, () => ({
    name: faker.person.fullName(),

    type: 'User',
    id: faker.string.uuid(),
    created_at: faker.date.past(),
    updated_at: faker.date.past(),
    email: faker.internet.email(),
    avatar_image: [[faker.image.avatar()]],
    image: faker.image.avatar(),
    roles: faker.helpers.arrayElements(['admin'], faker.number.int({ min: 0, max: 1 })),
    last_login_at: faker.date.past(),
    has_email_provider: faker.datatype.boolean(),
    sign_in_count: faker.number.int({ min: 1, max: 50 }),
    identities_count: faker.number.int({ min: 1, max: 4 }),
    languages: faker.helpers.arrayElement(['English', 'Spanish', 'French', 'German', 'Chinese', 'Arabic', 'Russian', 'Japanese', 'Portuguese', 'Italian', 'Dutch', 'Korean', 'Swedish', 'Greek', 'Hindi', 'Turkish', 'Polish', 'Vietnamese', 'Thai', 'Romanian'])
  }))
