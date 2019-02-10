import React, { Component } from 'react';
import { Steps, Button } from 'antd';
import First from './First';
import WrappedSecond from './Second';
import Third from './Third';
import axios from 'axios';

const Step = Steps.Step;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      cuisine_type: [],
      outlet_type: [],
      affordability_type: [],

      cuisine_choice: [],
      outlet_choice: [],
      affordability_choice: [],
      halal_choice: false,
      vegan_choice: false,
      is_empty: false,
      generated_ls: []
    };

  }

  componentDidMount() {
    axios.get(`https://restaurantgen.ryanchan.xyz/api/cuisine_type/`)
      .then(res => {
          this.setState({cuisine_type: [...res.data]});
      })
      .catch(res => {
          this.setState({cuisine_type: []});
      })

    axios.get(`https://restaurantgen.ryanchan.xyz/api/outlet_type/`)
      .then(res => {
          this.setState({outlet_type: [...res.data]});
      })
      .catch(res => {
          this.setState({outlet_type: []});;
      })


    axios.get(`https://restaurantgen.ryanchan.xyz/api/affordability/`)
      .then(res => {
          this.setState({affordability_type: [...res.data]});
      })
      .catch(res => {
          this.setState({affordability_type: []});;
      })
  }

  generateUrl(){
    let url = 'https://restaurantgen.ryanchan.xyz/api/restaurant?'
    let oc_str = this.state.outlet_choice.map(x =>'outlet_type=' + x.id)
    let cs_str = this.state.cuisine_choice.map(x => 'cuisine_type=' + x.id)
    let as_str = this.state.affordability_choice.map(x => 'affordability_type=' + x.id)
    let all_choice = []
    if(this.state.halal_choice){
      all_choice.push('halal=' + this.state.halal_choice)
    }
    if(this.state.vegan_choice){
      all_choice.push('vegan_friendly=' + this.state.vegan_choice)
    }
    all_choice = [...oc_str, ...cs_str, ...as_str].join('&')
    url += all_choice

    return url
  }

  generateRestaurant(){
    let url = this.generateUrl()
    axios.get(url)
    .then(res => {
      if(res.data.length!==0)
        this.setState({'generated_ls': [...res.data] })
      else this.setState({'is_empty': true })

    })
    .catch(res => {
          this.setState({'is_empty': true })
        })
    }


  next() {
    if(this.state.current === 1){
      this.generateRestaurant()
    }
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
    this.setState({is_empty: false})
  }

  handleChildrenChange = (key, value) =>{
    this.setState({[key]: value})
  }

  render() {
    const { current } = this.state;

    return (
      <div className="App">
        <div>
          <Steps current={current}>
            <Step key='Welcome' title='Welcome' />
            <Step key='Select' title='Select' />
            <Step key='Finish' title='Finish' />
          </Steps>
          <div className="steps-content">{current === 0 ? <First/> : current === 1? <WrappedSecond {...this.state} handleChildrenChange={this.handleChildrenChange} /> : <Third generated_ls={this.state.generated_ls} is_empty={this.state.is_empty} />}</div>
          <div className="steps-action">
            {
              current < 2
              && <Button type="primary" onClick={() => this.next()}>{this.state.current === 1? "Generate": "Next"}</Button>
            }
            {
              current > 0
              && (
              <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                Previous
              </Button>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
