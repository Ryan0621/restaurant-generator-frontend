import React, { Component } from 'react';
import {
  Form, Select, Input, Button, Checkbox, Row, Col,
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

  handleSelectChange = (value) => {
    console.log(value);

  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>

        <Form.Item
          label="Cuisine Type"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >

        <Select
          placeholder="No preferences"
          onChange={this.handleSelectChange}
        >
          <Option value="Chinese">Chinese</Option>
          <Option value="Mexican">Mexican</Option>
        </Select>

        </Form.Item>

        <Form.Item
          label="Outlet Type"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >

        <Select
          placeholder="No preferences"
          onChange={this.handleSelectChange}
        >
          <Option value="Restaurant">Restaurant</Option>
          <Option value="Dessert">Dessert</Option>
        </Select>

        </Form.Item>

        <Form.Item
          label="Affordability"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >

        <Select
          placeholder="No preferences"
          onChange={this.handleSelectChange}
        >
          <Option value="$">$</Option>
          <Option value="$$">$$</Option>
        </Select>

        </Form.Item>

        <Form.Item>

        <Checkbox.Group style={{ width: '100%' }}>
          <Row>
            <Col span={8}><Checkbox value="Halal">Halal</Checkbox></Col>
            <Col span={8}><Checkbox value="Vegan-friendly">Vegan-friendly</Checkbox></Col>
          </Row>
        </Checkbox.Group>,

        </Form.Item>


        <Form.Item
          wrapperCol={{ span: 12, offset: 5 }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedSecond = Form.create()(Second);
export default WrappedSecond;
