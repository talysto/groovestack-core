// import { TestShow } from '@/resources/company/CompanyList';
// import { AdminContext, testDataProvider, } from 'react-admin';
// import { TestShow } from '@/resources/company/CompanyList'
import App from '../App'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

test("Renders the Company List", () => {
  // render(<Users />)
  // render(
  //   <AdminContext>
  // <CompanyList />
  // </AdminContext>
  // )

  const { container } =
    render(
    // <AdminContext dataProvider={testDataProvider({
    //   //@ts-ignore
    //     getOne: () => Promise.resolve({ data: { id: 1, name: 'foo' } }),
    // })}>
    // <TestShow/>
        <App />
    ) 
    // </AdminContext>
      expect(container).toMatchSnapshot()

  
  expect(true).toBeTruthy()
})