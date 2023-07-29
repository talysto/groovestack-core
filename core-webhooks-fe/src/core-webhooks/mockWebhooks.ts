import { faker } from '@moonlight-labs/core-base-fe'
// import {} from './helpers'

export const mockWebhooks = Array.from({ length: 35 }, () => {
  return {
    source: faker.helpers.arrayElement(['stripe', 'slack']),
    event: faker.helpers.arrayElement(['payout.failed']),
    status: faker.helpers.arrayElement(['received', 'processed']),

    data: { sample: 'data', id: '_someKey' },

    id: faker.string.uuid(),
    created_at: faker.date.recent(),
    updated_at: faker.date.recent(),
  }
})

// {
//   "id": "evt_1McXPHDzy6aqOKTEJ5LPQJHk",
//   "data": {
//     "object": {
//       "id": "po_1McAnPDzy6aqOKTEpVxChjpa",
//       "type": "bank_account",
//       "amount": 45565,
//       "method": "standard",
//       "object": "payout",
//       "status": "failed",
//       "created": 1676566738,
//       "currency": "usd",
//       "livemode": true,
//       "metadata": {},
//       "automatic": false,
//       "description": null,
//       "destination": "ba_1CsJeaDzy6aqOKTECTUbkiyp",
//       "reversed_by": null,
//       "source_type": "card",
//       "arrival_date": 1676592000,
//       "failure_code": "could_not_process",
//       "failure_message": "Stripe could not process this transfer.",
//       "original_payout": null,
//       "balance_transaction": "txn_1McAnPDzy6aqOKTEplDE12RE",
//       "statement_descriptor": "TOTEM Membership Mgmt",
//       "failure_balance_transaction": "txn_1McXPHDzy6aqOKTEAWNui3eF"
//     }
//   },
//   "type": "payout.failed",
//   "object": "event",
//   "account": "acct_1CsJeaDzy6aqOKTE",
//   "created": 1676653655,
//   "request": {
//     "id": null,
//     "idempotency_key": null
//   },
//   "livemode": true,
//   "api_version": "2020-08-27",
//   "pending_webhooks": 1
// }
