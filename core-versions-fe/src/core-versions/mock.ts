import { faker } from '@faker-js/faker'

// export let faker: any = (globalThis as { faker?: any })?.faker
// if (faker === undefined) {
//   import('@faker-js/faker')
//     .then(({ default: _faker }) => {
//       faker = _faker
//     })
//     .catch(() => {
//       //
//     })
// }


// async function loadFaker() {
//   return await import('@faker-js/faker')
// }

// const faker = await loadFaker()

export function mockVersions({ count = 15 }) {
    const mockData = []
    for (let i = 0; count > i; i++) {
      mockData.push({
        // additional attributes
        changes: generateChanges(faker.number.int({ min: 1, max: 5 })),
        timestamp: faker.date.past().toLocaleString(),
        // standard attributes
        id: faker.string.uuid(),
        created_at: faker.date.past().toLocaleString(),
        updated_at: faker.date.past().toLocaleString(),
      })
    }
    return mockData
}


function generateChanges(numChanges: number) {
    const changeTypes: {[index: string]:Function} = {
      "string": () => faker.lorem.words(),
      "text": () => faker.lorem.sentence(),
      "number": () => faker.number.int({min:0, max: 100}),
      "url": () => faker.internet.url(),
      "email": () => faker.internet.email(),
      "name": () => faker.person.fullName(),
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
