import {
  Edit,
} from 'react-admin'
import { CompanyAside } from './CompanyAside'
import { CompanyForm } from './CompanyForm'

export const CompanyEdit = () => (
  <Edit aside={<CompanyAside />}>
    <CompanyForm />
  </Edit>
)

