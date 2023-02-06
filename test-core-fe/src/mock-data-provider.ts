import fakeDataProvider from 'ra-data-fakerest'
import { job } from './jobs/mock-job'
import { line } from './lines/mock-line'
// import { faker } from '@faker-js/faker'

declare global {
  interface Array<T> {
    sample(): T
  }
}

Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)]
}

const jobs = Array.from({ length: 15 }, () => {
    return Object.assign(job.asAdmin(), {
    // divisionId: divisions.sample().id,
  })
})

const lines = Array.from({ length: 15 }, () => {
    return Object.assign(line.asAdmin(), {
  })
})

export default fakeDataProvider(
  {
    jobs,
    lines
  },
  true
)
