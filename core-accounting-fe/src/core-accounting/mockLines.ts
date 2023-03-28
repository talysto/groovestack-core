declare global {
  interface Array<T> {
    sample(): T
  }
}

Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)]
}

const defaultDEntryTransferTypes = [
  { code: 'buy_token', credit_account: 'tokens', debit_account: 'treasury'}, 
  { code: 'spend_token', credit_account: 'treasury', debit_account: 'tokens'}
]

type MockLinesArgs = {
  count: number;
  dEntryTransferTypes: {code: string; credit_account: string; debit_account: string}[]}

export async function mockLines({ count = 8, dEntryTransferTypes = defaultDEntryTransferTypes }: MockLinesArgs): Promise<any> {
  try {
    const { faker } = await import('@faker-js/faker')
    
    let lines = []
    for (let i = count; i--;) {
      const transfer = faker.helpers.arrayElement(defaultDEntryTransferTypes)
      const amount = parseFloat(faker.commerce.price(1, 1000))
      const formatted_amount = `$${amount}`

      const line1 = {
        id: faker.datatype.uuid(),
        account: transfer.credit_account,
        amount: {
          amount,
          formatted_amount,
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
        code: transfer.code,
        partnerId: faker.datatype.uuid(), //
        partnerAccount: transfer.debit_account,
        // detailId: faker.datatype.uuid(),
        // detailType: ['PaymentItem::1', 'PaymentItem::2'].sample(),
        metadata: {},// { key1: ['value 1', 'value 2'], key2: 'value 3' },
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
      }

      const line2 = { //line 2 (FLIP)
        id: line1.partnerId,
        account: transfer.debit_account,
        // amount: (-1 * line1.amount)?
        // balance: faker.commerce.price(1, 10000, 0),
        amount: {
          amount: amount * -1,
          formatted_amount: `-${formatted_amount}`, // *-1?
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
        code: transfer.code,
        partnerId: line1.id,
        partnerAccount: transfer.credit_account,
        // detailId: faker.datatype.uuid(),
        // detailType: ['PaymentItem::1', 'PaymentItem::2'].sample(),
        metadata: {},// { key1: ['value 1', 'value 2'], key2: 'value 3' },
        createdAt: line1.createdAt,
        updatedAt: line1.updatedAt,
      }
      lines.push(line1, line2)
    }
    return lines


   
  } catch (e) {
    console.error(e)
    return []
  }
}