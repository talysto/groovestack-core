declare global {
  interface Array<T> {
    sample(): T
  }
}

Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)]
}
//assuming they can both buy and spend from each other
//what about transfers?
export async function mockLines({ count = 8 }): Promise<any> {
  try {
    const { faker } = await import('@faker-js/faker')
    let lines = []
    let code = ['buy_aqd','spend_aqd'].sample()
    for (let i = count; i--;) {
      const line1 = {
        id: faker.datatype.uuid(),
        account: "aqd_tokens",
        // amount: faker.commerce.price(1, 1500, 0),
        // balance: faker.commerce.price(1, 10000, 0),
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
        code: code,
        partnerId: faker.datatype.uuid(), //
        partnerAccount: "aqd_treasury",
        detailId: faker.datatype.uuid(),
        detailType: ['PaymentItem::1', 'PaymentItem::2'].sample(),
        metadata: {},// { key1: ['value 1', 'value 2'], key2: 'value 3' },
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
      }

      const amount = -1 * line1.amount.amount
      const line2 = { //line 2 (FLIP)
        id: line1.partnerId,
        account: line1.partnerAccount,
        // amount: (-1 * line1.amount)?
        // balance: faker.commerce.price(1, 10000, 0),
        amount: {
          amount: amount,
          formatted_amount: line1.amount.formatted_amount, // *-1?
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
        code: code,
        partnerId: line1.id,
        partnerAccount: line1.id,
        detailId: faker.datatype.uuid(),
        detailType: ['PaymentItem::1', 'PaymentItem::2'].sample(),
        metadata: {},// { key1: ['value 1', 'value 2'], key2: 'value 3' },
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
      }
      lines.push(line1, line2)
    }
    return lines


   
  } catch (e) {
    console.error(e)
    return []
  }
}