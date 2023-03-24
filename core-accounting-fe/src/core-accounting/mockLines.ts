declare global {
  interface Array<T> {
    sample(): T
  }
}

Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)]
}
// count.times do {
//   create line 1
//   creatre line 2
//   transfers += [line 1, line 2]
// }
// for each pair of credit / debit lines
//   grab a user & a company
//   line 1 has user as account / scope and company as partner account / scope
//   line 2 has company as account / scope and user as partner account / scope

//assuming they can both buy and spend from each other
//what about transfers?
let code, partnerCode
if (Math.random() > .5) {
  code = 'buy_aqd'
  partnerCode = 'spend_aqd'
}
else { //line 2
  code = 'spend_aqd'
  partnerCode = 'buy_aqd'
}

export async function mockTransfers({ count = 8 }): Promise<any> {
  try {
    const { faker } = await import('@faker-js/faker')
    let lines = []
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

      const line2 = { //line 2 (FLIP)
        id: line1.partnerId,
        account: line1.partnerAccount,
        // amount: (-1 * line1.amount)?
        // balance: faker.commerce.price(1, 10000, 0),
        amount: {
          amount: faker.commerce.price(1, 1000, 0),
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
        code: partnerCode,
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

// }
// export async function mockLines({ count = 15 }): Promise<any> {
//   try {
//     const { faker } = await import('@faker-js/faker')
//     return Array.from({ length: count }, () => ({
//       // standard attributes
//       id: faker.datatype.uuid(),
//       account: faker.datatype.uuid(),
//       scope: faker.datatype.uuid(),
//       code: ['payment', 'transfer', 'spend'].sample(),
//       amount: {
//         amount: faker.commerce.price(1, 1000, 0),
//         formatted_amount: faker.commerce.price(1, 1000, 0, '$'),
//         currency: {
//           code: 'EQD',
//           symbol: '$',
//         },
//       },
//       balance: {
//         amount: faker.commerce.price(1, 1000, 0),
//         formatted_amount: faker.commerce.price(1, 1000, 0, '$'),
//         currency: {
//           code: 'EQD',
//           symbol: '$',
//         },
//       },
//       partnerAccount: faker.datatype.uuid(),
//       partnerScope: faker.datatype.uuid(),
//       partnerId: faker.datatype.uuid(),
//       detailId: faker.datatype.uuid(),
//       detailType: ['PaymentItem::1', 'PaymentItem::2'].sample(),
//       // TODO improve metadata fake data
//       metadata: { key1: ['value 1', 'value 2'], key2: 'value 3' },
//       createdAt: faker.date.recent(),
//       updatedAt: faker.date.recent(),
//     }))
//   } catch (e) {
//     console.error(e)
//     return []
//   }
// }
