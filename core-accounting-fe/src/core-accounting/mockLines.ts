declare global {
  interface Array<T> {
    sample(): T
  }
}

Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)]
}

// TO DO: finish fixing data + 2nd pass 
export async function mockTransfers({count = 8}): Promise<any> {
  try {
    const { faker } = await import('@faker-js/faker')
    return Array.from({length: count}, () => ({
      // standard attributes
      id: faker.datatype.uuid(),
      account: faker.datatype.uuid(),
      scope: faker.datatype.uuid(),
      code: ['buy_aqd', 'spend_aqd', 'transfer_aqd?'].sample(),
      amount: faker.commerce.price(1, 1500, 0),
      balance: faker.commerce.price(1, 1500, 0),
      // amount: {
      //   amount: faker.commerce.price(1, 1500, 0),
      //   formatted_amount: faker.commerce.price(1, 1000, 0, '$'),
      //   currency: {
      //     code: 'EQD',
      //     symbol: '$',
      //   },
      // },
      // balance: {
      //   amount: faker.commerce.price(1, 1000, 0),
      //   formatted_amount: faker.commerce.price(1, 1000, 0, '$'),
      //   currency: {
      //     code: 'EQD',
      //     symbol: '$',
      //   },
      // },
      partnerId: faker.datatype.uuid(),
      partnerAccount: "aqd_treasury",
      partnerScope: faker.datatype.uuid(),
      detailId: faker.datatype.uuid(),
      detailType: ['PaymentItem::1', 'PaymentItem::2'].sample(),
      // TODO improve metadata fake data
      metadata: {},// { key1: ['value 1', 'value 2'], key2: 'value 3' },
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),


    }))
  } catch (e) {
    console.error(e)
    return []
  }

  // 8.times do 
  //   create line 
  //     credit amount
      
  //   create partner line
  //     debit amount

  // for each pair of credit / debit lines
  //   grab a user & a company
  //   line 1 has user as account / scope and company as partner account / scope
  //   line 2 has company as account / scope and user as partner account / scope
}
export async function mockLines({count = 15}): Promise<any> {
  try {
    const { faker } = await import('@faker-js/faker')
    return Array.from({length: count}, () => ({
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
          symbol: '$',
        },
      },
      balance: {
        amount: faker.commerce.price(1, 1000, 0),
        formatted_amount: faker.commerce.price(1, 1000, 0, '$'),
        currency: {
          code: 'EQD',
          symbol: '$',
        },
      },
      partnerAccount: faker.datatype.uuid(),
      partnerScope: faker.datatype.uuid(),
      partnerId: faker.datatype.uuid(),
      detailId: faker.datatype.uuid(),
      detailType: ['PaymentItem::1', 'PaymentItem::2'].sample(),
      // TODO improve metadata fake data
      metadata: { key1: ['value 1', 'value 2'], key2: 'value 3' },
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
    }))
  } catch (e) {
    console.error(e)
    return []
  }
}
