import { faker } from '@moonlight-labs/core-base-fe'

export type Comment = {
  id: string
  body: string
  created_at: string
  updated_at: string
  author_id: string
  author_type: string
  resource_id: string
  resource_type: string
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
