import CompanyIcon from '@mui/icons-material/ApartmentOutlined'
import { CompanyCreate } from './CompanyCreate'
import { CompanyEdit } from './CompanyEdit'
import { CompanyList } from './CompanyList'

export class Company {
  static List = CompanyList
  static Create = CompanyCreate
  static Edit = CompanyEdit
  static Icon = CompanyIcon
}
