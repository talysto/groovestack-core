declare global {
  interface Array<T> {
    sample(): T
  }
}

Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)]
}


// TO DO: finish fixing data + 2nd pass 
export async function mockTransfers({ count = 8 }): Promise<any> {
  try {
    const { faker } = await import('@faker-js/faker')
    return Array.from({ length: count }, () => ({
      // standard attributes
     
      account: ["aqd_tokens", "aqd_treasury"].sample() //faker.datatype.uuid(),
      scope: faker.datatype.uuid(),
      code: ['buy_aqd', 'spend_aqd', 'transfer_aqd?'].sample(),
//----------------------
      amount: faker.commerce.price(1, 1500, 0),
      balance: faker.commerce.price(1, 1500, 0),

      detailId: faker.datatype.uuid(),
      detailType: ['PaymentItem::1', 'PaymentItem::2'].sample(),
      // TODO improve metadata fake data
      metadata: {},// { key1: ['value 1', 'value 2'], key2: 'value 3' },
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
//----------------------
      partnerId: faker.datatype.uuid(),
      partnerAccount: "aqd_treasury",
      partnerScope: faker.datatype.uuid(),
      //   "key1" => [],
      //   "key2" => nil

      // "amount" => 1500,
      // "balance" => 1500,

      // "detail_type" => nil,
      // "detail_id" => nil,
      // "metadata" => {},
      // "created_at" => Thu, 16 Mar 2023 23:00:51.747097000 UTC +00:00,
      // "updated_at" => Thu, 16 Mar 2023 23:00:51.747097000 UTC +00:00,
      //   "key1" => [],
      //   "key2" => nil

    
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


  //   #<DoubleEntry::Line:0x000000010f3103e8> {
  //     "id" => "6dd32946-f212-41a8-b9d2-065c89737c1f",
  // "account" => "aqd_tokens",
  //  "scope" => "10beb7bc-d420-4eae-afb5-43124044bd25",
  //   "code" => "buy_aqd",
  // "amount" => 1500,
  // "balance" => 1500,
  // "partner_id" => "b4e6133a-3ba6-46f7-9f98-92238f975f48",
  // "partner_account" => "aqd_treasury",
  // "partner_scope" => "7dcdd3c5-1943-424d-bd62-8a214924b996",
  // "detail_type" => nil,
  // "detail_id" => nil,
  // "metadata" => {},
  // "created_at" => Thu, 16 Mar 2023 23:00:51.747097000 UTC +00:00,
  // "updated_at" => Thu, 16 Mar 2023 23:00:51.747097000 UTC +00:00,
  //   "key1" => [],
  //   "key2" => nil
}
export async function mockLines({ count = 15 }): Promise<any> {
  try {
    const { faker } = await import('@faker-js/faker')
    return Array.from({ length: count }, () => ({
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
