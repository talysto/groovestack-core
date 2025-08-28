import { faker } from '@faker-js/faker'

const simpleNotification = (userFn: () => any) => {
  const user = userFn()

  return {
    type: 'Simple',

    to_id: user.id,
    to_type: user.type,

    read: false, //faker.datatype.boolean(),
    read_at: faker.helpers.arrayElement([null, faker.date.recent()]),

    title: faker.lorem.sentence(),
    description: faker.lorem.sentences(2),
  }
}

const taskNotification = (userFn: () => any) => {
  const user = userFn()

  return {
    type: 'Task',
    // handler_type: 'LeaderInviteNotificationService',

    to_id: user.id, // required
    to_type: user.type,

    from_id: user.id, // optional
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
    read_at: faker.helpers.arrayElement([null, faker.date.recent()]),
    read: false,
  }
}

const globalNotification = () => {
  const publish_at = faker.helpers.arrayElement([null, faker.date.anytime()])
  const expire_at = publish_at
    ? faker.date.future({ refDate: publish_at })
    : faker.date.anytime()

  return {
    type: 'Global',

    to_type: 'User',
    to_scope: faker.helpers.arrayElement([
      null,
      'active',
      // ['leaders_of_org(:org_id)', 'XXXXXXX']
      ".joins(:leaderships).where(leaderships: {status: 'active', org_unit_id: OrgUnit.where(state: 'GA')})",
      ".joins(:leaderships).where(leaderships: {status: 'active', org_unit_id: 'XXXXXXX'})",
    ]),
    read_bloom: [],
    read: false,
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

const mockNotification = (userFn: () => any, type: string | undefined) => {
  let kind: ((userFn: any) => any)

  switch (type) {
    case 'Simple':
      kind = simpleNotification
      break;
    case 'Task':
      kind = taskNotification
      break;
    case 'Global':
      kind = globalNotification
      break;
    default:
      kind = faker.helpers.arrayElement([
        globalNotification,
        simpleNotification,
        taskNotification,
      ])
  }

  return {
    ...kind(userFn),

    id: faker.string.uuid(),
    created_at: faker.date.recent(),
    updated_at: faker.date.recent(),
  }
}

export const mockNotifications = (count = 35, userFn: () => any, type: string | undefined = undefined) => {
  return Array.from({ length: count }, () => mockNotification(userFn, type))
}
