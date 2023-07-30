import { faker } from '@moonlight-labs/core-base-fe'

export async function mockVersions({ count = 15 }): Promise<any> {
    const mockData = []
    for (let i = 0; count > i; i++) {
      mockData.push({
        // additional attributes
        changes: await generateChanges(faker.number.int({ min: 1, max: 5 })),
        timestamp: faker.date.past().toLocaleString(),
        // standard attributes
        id: faker.string.uuid(),
        created_at: faker.date.past().toLocaleString(),
        updated_at: faker.date.past().toLocaleString(),
      })
    }
    return mockData
}


async function generateChanges(numChanges: number): Promise<any> {


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
