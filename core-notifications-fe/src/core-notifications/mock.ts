import { faker } from '@faker-js/faker'

const simpleNotification = (userFn: Function) => {
  const user = userFn()

  return ({
    kind: 'Simple',

    to_id: user.id,
    to_type: user.type,

    read: faker.datatype.boolean(),

    title: faker.lorem.sentence(),
    description: faker.lorem.sentences(2)
  })
}

const taskNotification = (userFn: Function) => {
  const user = userFn()

  return {
    kind: 'Task',

    to_id: user.id,
    to_type: user.type,

    title: faker.lorem.sentence(),
    description: faker.lorem.sentences(2),
    actions: [{label: 'Accept'}, {label: 'Decline'}]
  }
}

// const groupNotification = () => ({
//   kind: 'Group',
//   title: faker.lorem.sentence(),
//   description: faker.lorem.sentences(2)
// })


const globalNotification = (_userFn: Function) => {
  const publish_at = faker.helpers.arrayElement([null, faker.date.anytime()])
  const expire_at = publish_at ? faker.date.future({refDate: publish_at}) : faker.date.anytime()

  return {
  kind: 'Global',
  read_bloom: [],
  publish_at: publish_at,
  expire_at: expire_at,
  read: faker.number.int({max: 2000000}),
  title: faker.lorem.sentence(),
  description: faker.lorem.sentences(2),
  link: faker.internet.url()
}
}

const mockNotification = (userFn: Function) => {
  const kind = faker.helpers.arrayElement([globalNotification, simpleNotification, taskNotification])

  return (
    {
      ...kind(userFn),

      id: faker.string.uuid(),
      created_at: faker.date.recent(),
      updated_at: faker.date.recent(),
    })
}

export const mockNotifications = (count = 35, userFn: Function)  => {
  return Array.from({length: count}, () => mockNotification(userFn))
}

