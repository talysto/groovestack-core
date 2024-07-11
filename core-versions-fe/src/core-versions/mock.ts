import { faker } from '@faker-js/faker'

export const mockVersion = () => (
  {
    // additional attributes
    changes: generateChanges(faker.number.int({ min: 1, max: 5 })),
    timestamp: faker.date.past(),
    // standard attributes

    // actor_id: user.id,
    // actor_type: user.type,
    // resource_id: resource.id,
    // resource_type: resource.type,

    id: faker.string.uuid(),
    created_at: faker.date.past(),
    updated_at: faker.date.past(),
  }
)

export const mockVersions = (count = 15) => {
  return Array.from({ length: count }, () => mockVersion())
}

interface ChangeTypes {
  string: () => string;
  text: () => string;
  number: () => number;
  url: () => string;
  email: () => string;
  name: () => string;
  object: () => { unchanged: string; name: string; amount: number };
  'maybe-nil': () => string | null;
}

function generateChanges(numChanges: number) {
    const changeTypes: ChangeTypes = {
      "string": () => faker.lorem.words(),
      "text": () => faker.lorem.sentence(),
      "number": () => faker.number.int({min:0, max: 100}),
      "url": () => faker.internet.url(),
      "email": () => faker.internet.email(),
      "name": () => faker.person.fullName(),
      "object": () => ({ unchanged: 'unchanged', name: faker.person.fullName(), amount: faker.number.int({min:0, max: 100})}),
      "maybe-nil": () => faker.helpers.arrayElement([faker.lorem.words(), null])
    }

    function change() {
      const field = faker.lorem.words({ min: 1, max: 3 })
      const type = faker.helpers.arrayElement(Object.keys(changeTypes))
      const fn = changeTypes[type]

      return [field, [fn(), fn()]]
    }

    const changes = []
    for (let i = 0; i < numChanges; i++) {
      changes.push(change())
    }
    return changes
}
