import axios from 'axios';

export const baseURL = process.env.REACT_APP_API_URL;
console.log(`API : ${baseURL}`);

const clientAxiosJson = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});


const routes = {
  menu: '/menu'
}
export const RGAPI = {
  Menu: {
    async getMenus() {
      let endpoint = '/menus';

      try {
        let menus = await clientAxiosJson.get(routes.menu+endpoint);
        
        return menus.data
      } catch(err) {
        console.error(err)
      }

      
    }
  }
};

