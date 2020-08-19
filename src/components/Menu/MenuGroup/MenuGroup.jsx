import React from 'react';
import PropTypes from 'prop-types'; 
import { Form, Row, Col } from 'react-bootstrap';

import './MenuGroup.css'

function MenuGroup(props) {
  let { menu } = props;
  
  function renderMenuItem () {
    return menu.map( (m, idx) => {
      let isDisabled = false;

      if(props.disabledMenu && props.disabledMenu.length){
        isDisabled = !!props.disabledMenu.find( id => id == m.id ) // intentionally ignore types of ids
      } 
      
      return (
        <Form.Check 
          key={ idx }
          name={ `Menu-${props.index}` }
          type="radio"
          id={ m.id }
          label={ m.value }
          disabled={ isDisabled }
          className="MenuGroup-option"
          onClick={ () => props.onSelectMenu(props.index, m.id) }
        />
      )
    })
  }

  return (
    <fieldset disabled={props.disabled}>
    <Form.Group as={Row} className="MenuGroup">
      <Col md={4} className="MenuGroup-label">
        {props.label}
      </Col>
      <Col md={8}>
        { renderMenuItem() }
      </Col>
    </Form.Group>
    </fieldset>
  );
}

MenuGroup.propTypes = {
  index: PropTypes.number.isRequired, 
  label: PropTypes.string.isRequired,
  menu: PropTypes.arrayOf(
    PropTypes.shape({ 
      id: PropTypes.string, 
      value: PropTypes.string 
    })
  ).isRequired,
  disabledMenu: PropTypes.array,
  disabled: PropTypes.bool,
  onSelectMenu: PropTypes.func.isRequired,
}

export default MenuGroup
