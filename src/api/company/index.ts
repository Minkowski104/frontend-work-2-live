import axios from 'axios';
import { executeGet } from '../base-crud';

export const getCompanies = async (callback=(function(data:any){})) => {
  executeGet('/companies/list', callback)
}