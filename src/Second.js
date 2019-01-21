import React, { Component } from 'react';
import {
  Form, Select, Checkbox, Row, Col,
} from 'antd';
const { Option } = Select;

class Second extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleCuisineChange = (key, value) => {
    const cuisine_choice = value.map(item => {
      return({
        'id': item.key,
        'cuisine_type': item.props.value
      })
    })
    this.props.handleChildrenChange('cuisine_choice', cuisine_choice)
  }

  handleOutletChange = (key, value) => {
    const outlet_choice = value.map(item => {
      return({
        'id': item.key,
        'outlet_type': item.props.value
      })
    })
    this.props.handleChildrenChange('outlet_choice', outlet_choice)
  }

  handleAffordabilityChange = (key, value) => {
    const affordability_choice = value.map(item => {
      return({
        'id': item.key,
        'affordability_type': item.props.value
      })
    })
    this.props.handleChildrenChange('affordability_choice', affordability_choice)
  }

  handleVeganChange = (value) => {
    this.props.handleChildrenChange('vegan_choice', value.target.checked)
  }

  handleHalalChange = (value) => {
    this.props.handleChildrenChange('halal_choice', value.target.checked)
  }

  render() {

    return (

      <Form onSubmit={this.handleSubmit}>
        <Form.Item
          label="Cuisine Type"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >

        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Please select"
          defaultValue={[]}
          onChange={this.handleCuisineChange}
        >

        {this.props.cuisine_type.map(item => (<Option key={item.id} value={item.cuisine_type}>{item.cuisine_type}</Option>))}

        </Select>

        </Form.Item>

        <Form.Item
          label="Outlet Type"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >

        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Please select"
          defaultValue={[]}
          onChange={this.handleOutletChange}
        >

        {this.props.outlet_type.map(item => (<Option key={item.id} value={item.outlet_type}>{item.outlet_type}</Option>))}

        </Select>

        </Form.Item>

        <Form.Item
          label="Affordability"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >

        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Please select"
          defaultValue={[]}
          onChange={this.handleAffordabilityChange}
        >

        {this.props.affordability_type.map(item => (<Option key={item.id} value={item.affordability}>{item.affordability}</Option>))}

        </Select>

        </Form.Item>

        <Form.Item>

        <Checkbox.Group style={{ width: '100%' }}>
          <Row>
            <Col span={8}><Checkbox value="Halal" onChange={this.handleHalalChange} checked={this.props.halal_choice}>Halal</Checkbox></Col>
            <Col span={8}><Checkbox value="Vegan-friendly" onChange={this.handleVeganChange} checked={this.props.vegan_choice}>Vegan-friendly</Checkbox></Col>
          </Row>
        </Checkbox.Group>

        </Form.Item>


        <Form.Item
          wrapperCol={{ span: 12, offset: 5 }}
        >

        </Form.Item>
      </Form>
    );
  }
}

const WrappedSecond = Form.create()(Second);
export default WrappedSecond;
