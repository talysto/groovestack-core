import { faker } from '@faker-js/faker'

export type Comment = {
  id: String
  body: String
  created_at: String
  updated_at: String
  author_id?: String
  author_type?: String
  resource_id?: String
  resource_type?: String
}

export function mockComment() {
  return {
    id: faker.string.uuid(),
    body: faker.lorem.paragraph(),
    created_at: faker.date.past().toLocaleString(),
    updated_at: faker.date.past().toLocaleString(),
  }
}

export function mockComments(count = 15) {
  return Array.from({ length: count }, () => mockComment())
}

// export async function mockComments({count = 15}): Promise<Comment[]> {
//   try {

//     return Array.from({length: count}, () => ({
//       // standard attributes

//     }))
//   } catch (e) {
//     console.error(e)
//     return []
//   }
// }
