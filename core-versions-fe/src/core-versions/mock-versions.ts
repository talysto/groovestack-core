import { faker } from '@faker-js/faker'

const generateChanges = (numChanges: number) => {
  const changes = []
  for (let i = 0; i < numChanges; i++) {
    const field = faker.lorem.word()
    const oldValue = faker.random.words()
    const newValue = faker.random.words()
    changes.push({ field, oldValue, newValue })
  }
  return changes
}

export const mockVersions = (count = 15) =>
  Array.from({ length: count }, () => ({
    changes: generateChanges(faker.datatype.number({ min: 1, max: 5 })),
    timestamp: faker.date.past().toLocaleString(),

    id: faker.datatype.uuid(),
    created_at: faker.date.past(),
    updated_at: faker.date.past(),
  }))

// export const mockVersions = (numChanges: number) => {
//   const versions = []
//   for (let i = 0; i < numChanges; i++) {
//     versions.push(mockChange())
//   }
//   return versions
// }


// export const mockChange = () => {
//   // const actor = {
//   //   id: faker.datatype.uuid(),
//   //   name: faker.name.fullName(),
//   //   url: `/users/id`
//   // }
//   const numChanges = faker.datatype.number({ min: 1, max: 5 })
//   const changes = generateChanges(numChanges)
//   const timestamp = faker.date.past().toLocaleString()
//   return {
//     // actor,
//     changes,
//     timestamp
//   }
// }

// interface VersionProps {
//   actor: any
//   changes: any[]
//   timestamp: any
// }