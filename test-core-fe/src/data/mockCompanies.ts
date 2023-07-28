import { faker } from '@faker-js/faker'


function getStatus() {
  const status = faker.helpers.arrayElement([
    'onboarding',
    'active',
    'inactive'
  ])

  const status_events = [
    {
      name: 'Activate',
      key: 'activate',
      enabled: status != 'active'
    },
    {
      name: 'Deactivate',
      key: 'deactivate',
      enabled: status != 'inactive'
    },
  ]
  return {status, status_events}
}

export const mockCompanies = (count = 15) =>
  Array.from({ length: count }, () => {
    const {status, status_events} = getStatus()

    return {
      name: faker.company.name(),
      address: faker.location.streetAddress(),

      status: status,
      status_events: status_events,

      share_price: faker.finance.amount({min: 0.01, max: 20}),
      market_cap: faker.finance.amount({min: 25000, max: 2_000_000}),

      type: 'Company',
      id: faker.string.uuid(),
      created_at: faker.date.past(),
      updated_at: faker.date.past(),
  }
})
