/* eslint-disable jsx-a11y/alt-text */
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
      weatherData: '',
      movies: '',
      displayInformation: false,
      show: false,
      /* lat: '',
      lon: '', */
      showmovies:false
    }
  };

  changecityExplorer = (event) => {
    this.setState({
      cityExplorer: event.target.value
    });
  }

  getcityInformation = async (event) => {
    event.preventDefault();
    await axios.get(`https://us1.locationiq.com/v1/search.php?key=pk.bd985e4e701a5b53341ec9e721b6098a
        &city=${this.state.cityExplorer}&format=json`).then(locationResponse => {
      this.setState({
        cityInformation: locationResponse.data[0],
        lat: locationResponse.data[0].lat,
        lon: locationResponse.data[0].lon,
      });

      axios.get(`${process.env.REACT_APP_URL}/weather?lat=${this.state.lat}&lon=${this.state.lon}`).then(weatherResponse => {
        this.setState({

          weatherData: weatherResponse.data,
          displayInformation: true,
          show: true
        })

      });
      axios.get(`${process.env.REACT_APP_URL}/movies?query=${this.state.cityExplorer}`).then(response => {
        this.setState({
          movies: response.data,
          showmovies: true
        });
      })
      // .catch(error => {
      //   this.setState({
      //     showError: true,
      //     errorMessage: error.message,
      //   })
      // });
    });
  }


  render() {
    return (
      <div>
        {this.state.alert &&

          <div class="alert alert-warning" role="alert">
            {this.state.error} ,Please type the city
          </div>
        }
        <Form onSubmit={this.getcityInformation}>

          <Form.Group className="mb-3" controlId="formBasicEmail">

            <Form.Label class='formClass'>City Name</Form.Label>
            <br></br>
            <br></br>
            <input onChange={this.changecityExplorer} type="text" />

          </Form.Group>
          <br></br>
          <br></br>

          <Button class='buttonClass' variant="primary" type="submit"> Explore! </Button>

        </Form>
        <p class='amman'>{this.state.cityInformation.display_name}</p>
        <p> latitude : {this.state.cityInformation.lat}</p>
        <p>longitude : {this.state.cityInformation.lon}</p>

        {this.state.displayInformation &&
          <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.bd985e4e701a5b53341ec9e721b6098a&q&center=${this.state.cityInformation.lat},${this.state.cityInformation.lon}&zoom=10`} alt='' />
        }

        {this.state.show &&
          this.state.weatherData.map(value => {
            return (
              <>
                <p>
                  {value.description}
                </p>

                <p>
                  {value.date}
                </p>
              </>
            )
          })
        }
        {this.state.showmovies &&
          this.state.movies.map(val => {
            return (
              <>
                <p> {val.title} </p>
                <br></br>
                <p> {val.overview} </p>
                <br></br>
                <>
                <img variant="top" src={val.image_url}/>
                </>
                <br></br>
                <p>  {val.released_on} </p>
                <br></br>
                <p> {val.popularity} </p>
                <br></br>
                <p> {val.average_votes} </p>
                <br></br>
                <p> {val.total_votes} </p>

              </>
            )
          })

        }

      </div>

    )
  }
}


export default Main;