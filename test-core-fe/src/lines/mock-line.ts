async function importFaker():Promise<any>{
  try {
    const {faker} = await import('@faker-js/faker');
    return faker;
  } catch (e) {
    return null
  }
}

// import { faker } from '@faker-js/faker'

let admin: () => {[key: string]: any}

const faker = await importFaker()

if (faker) {
  const base = () => ({
    // standard attributes
    id: faker.datatype.uuid(),
    account: faker.datatype.uuid(),
    scope: faker.datatype.uuid(),
    code: ['payment', 'transfer', 'spend'].sample(),
    amount: {
      amount: faker.commerce.price(1, 1000, 0),
      formatted_amount: faker.commerce.price(1, 1000, 0, '$'),
      currency: {
        code: 'EQD',
        symbol: '$'
      }
    },
    balance: {
      amount: faker.commerce.price(1, 1000, 0),
      formatted_amount: faker.commerce.price(1, 1000, 0, '$'),
      currency: {
        code: 'EQD',
        symbol: '$'
      }
    },
    partnerAccount: faker.datatype.uuid(),
    partnerScope: faker.datatype.uuid(),
    partnerId: faker.datatype.uuid(),
    detailId: faker.datatype.uuid(),
    detailType: ['PaymentItem::1', 'PaymentItem::2'].sample(),
    // TODO improve metadata fake data
    metadata: {key1: ['value 1', 'value 2'], key2: 'value 3'},
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  })

  admin = () => ({ ...base() })
}

export class line {
  static asAdmin = admin
}