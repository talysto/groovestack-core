import { CompanyList } from './CompanyList'
import { CompanyEdit } from './CompanyEdit'
import CompanyIcon from '@mui/icons-material/ApartmentOutlined'
import { CompanyCreate } from './CompanyCreate'

export class Company {
  static List = CompanyList
  static Create = CompanyCreate
  static Edit = CompanyEdit
  static Icon = CompanyIcon
}
