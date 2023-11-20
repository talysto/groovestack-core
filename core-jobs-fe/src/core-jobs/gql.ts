import { gql } from '@apollo/client'

export const SUBSCRIBE_TO_JOB_REPORT = gql`
  subscription JobReport($id: ID!) {
    JobReport(id: $id) {
      subscription
      subscription_args
      event
    }
  }
`