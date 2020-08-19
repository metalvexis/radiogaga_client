import React from 'react';
import { RGAPI } from '../../api/api.js';
import '../../App.css';

export default class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menus: [],
      rules: {}
    }
  }

  async componentDidMount() {

    const menuRules = await RGAPI.Menu.getMenus();
    debugger
    this.setState({
      menus: menuRules.menus,
      rules: menuRules.rules,
    })
  }

  render() {
    return (
      <div id="Menu">
      </div>
    );
  }
}
