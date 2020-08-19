import React from 'react';
import { RGAPI } from '../../api/api.js';
import MenuGroup from './MenuGroup/MenuGroup.jsx'
import { Form, Button, Container, Row, Col} from 'react-bootstrap';
import _ from 'lodash';

import '../../App.css';
import './Menu.css'
export default class Menu extends React.Component {
  state = {
    menus: [],
    rules: {},
    selectedMenu: {}
  }

  async componentDidMount() {
    const menuRules = await RGAPI.Menu.getMenus();

    this.setState({
      menus: menuRules.menus,
      rules: menuRules.rules,
    })
  }
  
  getProhibitedMenu = (offset) => {
    let { selectedMenu, rules } = this.state;
    let prohibitedItems = [];

    for (let step = offset-1; step >= 0; step--) {
      if(selectedMenu[step] && selectedMenu[step].id){
        let matchedProhibited = rules[selectedMenu[step].id]

        if(matchedProhibited) prohibitedItems = prohibitedItems.concat( matchedProhibited )
      }
    }

    return prohibitedItems;
  }

  renderMenus = () => {
    let { selectedMenu, rules, menus } = this.state;
    

    if(!menus) return null;
    
    return menus.map( (menu, idx) => {
      let disabledMenu = this.getProhibitedMenu(idx);
      let hasSelected = false

      // for (let step = idx-1; step >= 0; step--) {
      //   if(selectedMenu[step] && selectedMenu[step].id){
      //     disabledMenu = disabledMenu.concat( rules[selectedMenu[step].id] )
      //   }
      // }

      if(selectedMenu[idx-1]) {
        hasSelected = !!selectedMenu[idx-1].id
      }
      
      return (
        <MenuGroup 
         key={ idx }
         menu={ menu } 
         label={ `Menu ${idx+1}` } 
         index={ idx } 
         disabled={ idx > 0 ? !hasSelected : false }
         disabledMenu={ disabledMenu }
         onSelectMenu={ this.onSelectMenu }/>
      )
    })
  }

  onSelectMenu = (idx, id) => {
    const { selectedMenu } = this.state;

    selectedMenu[idx] = {
      id
    };

    this.setState(
      selectedMenu
    )
  }

  renderButton = () => {
    
    let { menus, rules, selectedMenu } = this.state;
    let prohibitedMenu = this.getProhibitedMenu(menus.length);
    let selected = [];

    for (const key in selectedMenu) {
      if (selectedMenu.hasOwnProperty(key)) {
        const menu = selectedMenu[key];
        if(menu.id) selected.push(menu.id)
      }
    }

    const hasConflict = _.intersection(prohibitedMenu, selected).length > 0;
    const completed = selected.length === menus.length;
    
    return (
      <Button variant="success" block disabled={ hasConflict || !completed }>Submit</Button>
    )
  }

  render() {
    return (
      <Container fluid>
        <Col md={{ span: 3, offset: 4 }}>
          <Form className="Menu">
          { this.renderMenus() }
          </Form>
        </Col>
        <Col md={{ span: 3, offset: 4 }}>
            { this.renderButton() }
        </Col>
      </Container>
    );
  }
}
