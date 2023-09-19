import { faker } from '@faker-js/faker'

const simpleNotification = (userFn: Function) => {
  const user = userFn()

  return {
    kind: 'Simple',

    to_id: user.id,
    to_type: user.type,

    read: faker.datatype.boolean(),

    title: faker.lorem.sentence(),
    description: faker.lorem.sentences(2),
  }
}

const taskNotification = (userFn: Function) => {
  const user = userFn()

  return {
    kind: 'Task',
    // handler_type: 'LeaderInviteNotificationService',

    to_id: user.id,  // required
    to_type: user.type,

    from_id: user.id,  // optional
    from_type: user.type,

    object_id: user.id,
    object_type: user.type, // 'Leadership'
    // object_task: 'Invite',

    title: faker.lorem.sentence(),
    description: faker.lorem.sentences(2),
    actions: [
      { label: 'Accept', response: 'invite=accept' },
      { label: 'Decline', response: 'invite=decline' },
    ],

    action_response: null, // 'accept' | 'decline'
  }
}

const globalNotification = (_userFn: Function) => {
  const publish_at = faker.helpers.arrayElement([null, faker.date.anytime()])
  const expire_at = publish_at
    ? faker.date.future({ refDate: publish_at })
    : faker.date.anytime()

  return {
    kind: 'Global',
    scope: faker.helpers.arrayElement([
      null,
      'active',
      ".joins(:leaderships).where(leaderships: {status: 'active', org_unit_id: OrgUnit.where(state: 'GA')})",
    ]),
    read_bloom: [],
    publish_at: publish_at,
    expire_at: expire_at,
    read_count: faker.number.int({ max: 2000000 }),
    title: faker.lorem.sentence(),
    description: faker.lorem.sentences(2),
    link: faker.helpers.arrayElement([
      null,
      faker.internet.url(),
      { url: faker.internet.url(), label: faker.lorem.words(2) },
    ]),
  }
}

const mockNotification = (userFn: Function) => {
  const kind = faker.helpers.arrayElement([
    globalNotification,
    simpleNotification,
    taskNotification,
  ])

  return {
    ...kind(userFn),

    id: faker.string.uuid(),
    created_at: faker.date.recent(),
    updated_at: faker.date.recent(),
  }
}

export const mockNotifications = (count = 35, userFn: Function) => {
  return Array.from({ length: count }, () => mockNotification(userFn))
}
