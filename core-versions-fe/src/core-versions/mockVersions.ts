export async function mockVersions({ count = 15 }): Promise<any> {
  try {
    const { faker } = await import('@faker-js/faker')
    let mockData = [];
    for (let i = 0; count > i; i++) {
      mockData.push({
        // additional attributes
        changes: await generateChanges(faker.datatype.number({ min: 1, max: 5 })),
        timestamp: faker.date.past().toLocaleString(),
        // standard attributes
        id: faker.datatype.uuid(),
        created_at: faker.date.past(),
        updated_at: faker.date.past(),
      })
    }
    return mockData;
  } catch (e) {
    console.error(e)
    return []
  }
}

async function generateChanges(numChanges: number): Promise<any> {
  try {
    const { faker } = await import('@faker-js/faker')
    const changes = []
    for (let i = 0; i < numChanges; i++) {
      const field = faker.lorem.word()
      const oldValue = faker.random.words()
      const newValue = faker.random.words()
      changes.push([field, [oldValue, newValue]])
    }
    return changes
  } catch (e) {
    console.error(e)
    return []
  }
}