export type Comment = {
  id: String;
  body: String;
  created_at: String;
  updated_at: String;
  author_id?: String;
  author_type?: String;
  resource_id?: String;
  resource_type?: String;
}

export async function mockComments({count = 15}): Promise<Comment[]> {
  try {
    const { faker } = await import('@faker-js/faker')
    return Array.from({length: count}, () => ({
      // standard attributes
      id: faker.datatype.uuid(),
      body: faker.lorem.paragraph(),
      created_at: faker.date.past().toLocaleString(),
      updated_at: faker.date.past().toLocaleString(),
    }))
  } catch (e) {
    console.error(e)
    return []
  }
}
