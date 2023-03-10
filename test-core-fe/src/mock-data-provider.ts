import fakeDataProvider from 'ra-data-fakerest'
import { mockJob } from 'core-jobs-fe'

// import {mockJob} from 'core-jobs-fe'


// let i = 1
// const jobs = Array.from({ length: 15 }, () => ({id: i++, name: 'hello' }))
// console.log(mockJob)

const jobs = Array.from({ length: 15 }, () => mockJob() )

export default fakeDataProvider(
  {
    jobs: jobs,
  },
  true
)
