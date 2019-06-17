import React from 'react'
import ReactDOM from 'react-dom'
import SeasonDisply from './SeasonDisply'
import Spinner from './Spinner'
class App extends React.Component {
    constructor(props) {
        super(props)
        //this is the only time we do direct assignment to this.state
        this.state = { lat: null, errMessage: '' }
    }

    // state = { lat: null, errMessage: '' }
    //another method to define the state is remove the constructor method
    //directly write the state as state = {lat: null, errMessage: ''}

    componentDidMount() {
        console.log('componentDidMount render')
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({ lat: position.coords.latitude}),
            err => this.setState({ errMessage: err.message }) 
        )
    } 

    renderContent() {
        if(this.state.errMessage && !this.state.lat){
            return <div>Error: {this.state.errMessage}</div>
        }

        if(!this.state.errMessage && this.state.lat){
            return <SeasonDisply lat={this.state.lat}/>
        }

        return <Spinner message="Please accept location request"/>   
    }

    //React says we have to define render!!
    render() {
        return <div className="border red">{this.renderContent()}</div>
    }
}
ReactDOM.render(<App />, document.querySelector('#root'))
