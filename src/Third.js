import React, { Component } from 'react';
import { Card, Icon, Button} from 'antd';
import { Empty } from 'antd';
const uniqueRandomArray = require('unique-random-array');

class Third extends Component {

  constructor(props) {
    super(props);
    this.state = {
        restaurant: {
            "id": '',
            "outlet_type": {
                "id": "",
                "outlet_type": ""
            },
            "cuisine_type": {
                "id": "",
                "cuisine_type": ""
            },
            "affordability": {
                "id": "",
                "affordability": ""
            },
            "opening_times": [],
            "address": {
                "id": "",
                "street_number": "",
                "route": "",
                "raw": "",
                "formatted": "",
                "latitude": "",
                "longitude": "",
                "locality": ""
            },
            "name": "",
            "vegan_friendly": false,
            "halal": false
        },
        is_empty: false
    };
  }

  shuffleItem = () => {
    const data = this.random()
    this.setState({restaurant: data})
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.generated_ls!==this.props.generated_ls){
      this.random = uniqueRandomArray(nextProps.generated_ls);
      this.shuffleItem()
    }
    if(nextProps.is_empty!==this.props.is_empty){
      this.setState({is_empty: nextProps.is_empty})
    }
  }

  render() {
    const gridStyle = {
        width: '100%',
        textAlign: 'center',
    };
    
    if(this.state.is_empty){
      return(
        <Card>
            <Empty
              description={
                <span>
                  No match found.
                </span>
              }
            />
        </Card>
      )
    }
    else{
      return(
        <Card
          actions={[<Button type="primary" onClick={() => this.shuffleItem()}>Regenerate</Button>]}
        >
            <Card.Grid style={gridStyle}><Icon type="shop" /> {this.state.restaurant.name}</Card.Grid>
            <Card.Grid style={gridStyle}><Icon type="environment" /> {this.state.restaurant.address.formatted}</Card.Grid>
            <Card.Grid style={gridStyle}><Icon type="tags" /> {this.state.restaurant.cuisine_type.cuisine_type} {this.state.restaurant.outlet_type.outlet_type}</Card.Grid>
            <Card.Grid style={gridStyle}><Icon type="dollar" /> {this.state.restaurant.affordability.affordability}</Card.Grid>
        </Card>
      )
    }
    }
}
export default Third;
