export async function mockComments({count = 15}): Promise<any> {
  try {
    const { faker } = await import('@faker-js/faker')
    return Array.from({length: count}, () => ({
      // standard attributes
      id: faker.datatype.uuid(),
      body: faker.lorem.paragraph(),
      created_at: faker.date.past(),
      updated_at: faker.date.past(),
    }))
  } catch (e) {
    console.error(e)
    return []
  }
}
