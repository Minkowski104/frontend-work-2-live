import axios from 'axios';
import { executeGet, executePost } from '../base-crud';

export const getPositions = async (callback=(function(data:any){}),keyword="") => {
  executeGet('/positions/list/', callback)
}


