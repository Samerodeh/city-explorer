import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './style.css';


export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityExplorer: '',
      cityInformation: {},
      displayInformation: false,
      error: false,
      show: true, 
      weatherData: []

    }
  };

  changeCityExplorer = (event) => {
    this.setState({
      cityExplorer: event.target.value
    });
  }


  getCityInformation = async (event) => {
    event.preventDefault();
    try {
      const axiosResponse = await axios.get(`https://us1.locationiq.com/v1/search.php?key=pk.7c29bd71f87227f27ebcd9f2dbd2a2db&city=${this.state.cityExplorer}&format=json`);
      const ApiKey = await axios.get(`${process.env.REACT_APP_URL}/weather`)
      console.log(axiosResponse);
      this.setState({
        cityInformation: axiosResponse.data[0],
        displayInformation: true,
        error: false,
        show:true,
        weatherData: ApiKey.data
      });
      console.log(this.state.weatherData);
    } catch (show) {
      this.setState({
        show: false,
        error: true
      });
    } 
  }


    render() {
      return (
      

        <div>


          <Form onSubmit={this.getCityInformation}>

            <Form.Group className="mb-3" controlId="formBasicEmail">

              <Form.Label>City Name</Form.Label>
              <br></br>
              <input onChange={this.changeCityExplorer} type="text" />

            </Form.Group>

            <Button variant="primary" type="submit">Explorer</Button>
            <br></br>

            <p>{this.state.cityInformation.display_name}</p>
            <p>{this.state.cityInformation.lat}</p>
            <p>{this.state.cityInformation.lon}</p>

            <br></br>

            {this.state.displayInformation &&

              <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.7c29bd71f87227f27ebcd9f2dbd2a2db&q&center=${this.state.cityInformation.lat},${this.state.cityInformation.lon}&zoom = 15`} alt='' />
            }
                {this.state.error &&
                <p>error</p>}
                {this.state.show &&
                
                    this.state.weatherData.map((value, index) => (
                       <div key={index}>
                             <p>discription:{value.description}</p>

                             <p> Date:{value.date} </p>
                           
                            

                            
                            </div>
                    ))
                }
                
                
          </Form>

        </div>

      )
    }
  }

  export default Main;