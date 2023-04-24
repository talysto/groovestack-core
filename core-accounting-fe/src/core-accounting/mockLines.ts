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
      const transfer = faker.helpers.arrayElement(dEntryTransferTypes)
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
        partner_id: faker.datatype.uuid(), //
        partner_account: transfer.debit_account,

        // detailId: faker.datatype.uuid(),
        // detailType: faker.helpers.arrayElement(['PaymentItem::1', 'PaymentItem::2']
        metadata: {},// { key1: ['value 1', 'value 2'], key2: 'value 3' },
        created_at: faker.date.recent(),
        updated_at: faker.date.recent(),
      }

      const line2 = { //line 2 (FLIP)
        id: line1.partner_id,
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
        partner_id: line1.id,
        partner_account: transfer.credit_account,
        // detailId: faker.datatype.uuid(),
        // detailType: faker.helpers.arrayElement(['PaymentItem::1', 'PaymentItem::2']),
        metadata: {},// { key1: ['value 1', 'value 2'], key2: 'value 3' },
        created_at: line1.created_at,
        updated_at: line1.updated_at,
      }
      lines.push(line1, line2)
    }
    return lines
  } catch (e) {
    console.error(e)
    return []
  }
}