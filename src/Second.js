import React, { Component } from 'react';
import {
  Form, Select, Button, Checkbox, Row, Col,
} from 'antd';
import axios from 'axios';
const { Option } = Select;

class Second extends Component {

  constructor(props) {
      super(props);

      this.initialState = {
          cuisine_type: [],
          outlet_type: [],
          affordability_type: [],

          cuisine_choice: [],
          outlet_choice: [],
          affordability_choice: [],
          halal_choice: false,
          vegan_choice: false,
      };

      this.state = this.initialState;
  }

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/cuisine_type/`)
      .then(res => {
        if(res.status === 200){
            this.setState({cuisine_type: [...this.state.cuisine_type, ...res.data]});
        }
      })

    axios.get(`http://127.0.0.1:8000/outlet_type/`)
      .then(res => {
        if(res.status === 200){
            this.setState({outlet_type: [...this.state.outlet_type, ...res.data]});
        }
      })

    axios.get(`http://127.0.0.1:8000/affordability/`)
      .then(res => {
        if(res.status === 200){
            this.setState({affordability_type: [...this.state.affordability_type, ...res.data]});
        }
      })
  }

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
    this.setState({cuisine_choice: cuisine_choice})
  }

  handleOutletChange = (key, value) => {
    const outlet_choice = value.map(item => {
      return({
        'id': item.key,
        'outlet_type': item.props.value
      })
    })
    this.setState({outlet_choice: outlet_choice})
  }

  handleAffordabilityChange = (key, value) => {
    const affordability_choice = value.map(item => {
      return({
        'id': item.key,
        'cuisine_type': item.props.value
      })
    })
    this.setState({affordability_choice: affordability_choice})
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

        {this.state.cuisine_type.map(item => (<Option key={item.id} value={item.cuisine_type}>{item.cuisine_type}</Option>))}

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

        {this.state.outlet_type.map(item => (<Option key={item.id} value={item.outlet_type}>{item.outlet_type}</Option>))}

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

        {this.state.affordability_type.map(item => (<Option key={item.id} value={item.affordability}>{item.affordability}</Option>))}

        </Select>

        </Form.Item>

        <Form.Item>

        <Checkbox.Group style={{ width: '100%' }}>
          <Row>
            <Col span={8}><Checkbox value="Halal">Halal</Checkbox></Col>
            <Col span={8}><Checkbox value="Vegan-friendly">Vegan-friendly</Checkbox></Col>
          </Row>
        </Checkbox.Group>

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
