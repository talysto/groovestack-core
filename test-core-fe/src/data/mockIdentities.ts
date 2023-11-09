import { faker } from '@faker-js/faker'

export const mockIdentities = (count = 15, user: any) =>
  Array.from({ length: count }, () => ({
    // provider: faker.person.fullName(),
    provider: faker.helpers.arrayElement(['Google', 'Apple']),
    type: 'Identity',
    id: faker.string.uuid(),
    user_id: user.id,
    data: { sample: 'data', id: '_someKey' },
    requestBlob: {
      provider: 'google', 
      uid: '123456789', 
      info: {
        email: 'user@example.com',
        name: 'John Doe',
        
      },
      credentials: {
        token: 'your_access_token',
        expires: false,
      },
      extra: {
      },
    },
  }))



//   class CreateIdentities < ActiveRecord::Migration[7.0]
//   def change
//     create_table :identities, id: :uuid, default: nil do |t|
//       t.citext :provider
//       t.string :uid

//       t.references :user, foreign_key: true, index: false, null: false, type: :uuid

//       t.timestamps
//     end

//     add_index :identities, %i[user_id provider], unique: true
//     add_index :identities, %i[provider uid], unique: true
//   end
// end