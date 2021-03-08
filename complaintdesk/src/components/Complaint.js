import React,{Component} from 'react';
import Styles from './Components.module.css';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import { Spring } from 'react-spring/renderprops'; 
import { connect } from 'react-redux';

const Map = ReactMapboxGl({
    accessToken:
    'pk.eyJ1IjoicmFnaHVyYWpqIiwiYSI6ImNrMnJpYzhzZjA2MGIzZXBkb2oxYnV2MWQifQ.1PinwGk6Y3P0q-l7SXkfWg'
});

class Complaint extends Component{

    constructor(props){
        super(props);
        this.state={
            author:"",
            title:"",
            image:null,
            description:"",
            address:"",
            lattitude:"",
            longitude:""
        };
        this.getLocation= this.getLocation.bind(this);
        this.getCoordinates=this.getCoordinates.bind(this);
        this.onChangeInput=this.onChangeInput.bind(this);
        this.onChangeFInput=this.onChangeFInput.bind(this);
        this.onClickMap=this.onClickMap.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    getLocation(event) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.getCoordinates);
        } else {
          alert("Geolocation is not supported by this browser.");
        }
        event.preventDefault();
    }

    getCoordinates(position)
    {
        this.setState({
            lattitude:position.coords.latitude,
            longitude:position.coords.longitude
        })
    }

    onChangeInput(event){
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    onChangeFInput(event){
        console.log(event.target)
        this.setState({
           image:event.target.files[0]
        })
    }

    async handleSubmit(event){
        event.preventDefault();
        if (this.props.isAuthenticated) {
            const config = {
                headers: {
                    // 'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token'),
                    'Accept': 'application/json'
                }
            };

            var apikey = '4a619a36656941199bc6b32ec0c058a2';

            var api_url = 'https://api.opencagedata.com/geocode/v1/json'

            var request_url = api_url
            + '?'
            + 'key=' + apikey
            + '&q=' + encodeURIComponent(this.state.lattitude + ',' + this.state.longitude)
            + '&pretty=1'
            + '&no_annotations=1';

            var d = await axios.get(request_url)
           var adr = d.data.results[0].formatted
           this.setState({
               address:adr
           })


            var fd = new FormData()

            fd.append("author" , this.props.user._id)
            fd.append("title" , this.state.title)
            fd.append("description" , this.state.description)
            fd.append("image" , this.state.image)
            fd.append("address" , this.state.address)
            fd.append("lattitude" , this.state.lattitude)
            fd.append("longitude" , this.state.longitude)
            const body = fd
            console.log(body);
            try {
                const res = await axios.post('/api/complaints/',body, config);
                console.log("compliant post success");
            
            } catch (err) {
                console.log("compliant post failed");
            }
        } 
        document.getElementById("fileControl").value="";
        this.setState({
            title:"",
            description:"",
            image:null,
            address:"",
            lattitude:"",
            longitude:""
        })

    }

    onClickMap(map, evt) {
        this.setState({
            lattitude:evt.lngLat.lat,
            longitude:evt.lngLat.lng
        })
    }

    render(){
        return(
            <Spring
                from={{opacity:0,marginLeft:-500}}
                to={{opacity:1,marginLeft:0}}
                config={{duration:1000}}
                >
                    {props =>(
                    <div style={props}>
                        <div className={Styles.fitpage}>
                            <div className="row mb-5">
                                <h1>Add a New Complaint</h1>
                            </div>
                            
                            <div className="row mx-5">
                                <div className="col-12 col-md-6 mt-3">
                                    <form>
                                        <div className={Styles.C_input}>
                                            <input onChange={this.onChangeInput}  type="text" name="title" placeholder="title" value={this.state.title}/><br/> 
                                        </div>  
                                        <div className={Styles.C_input}>
                                            <textarea onChange={this.onChangeInput} type="text" name="description" placeholder="Description" value={this.state.description} /><br/> 
                                        </div> 
                                        <div className={Styles.C_input}>
                                            <input onChange={this.onChangeInput} type="number" name="lattitude" placeholder="Lattitude" value={this.state.lattitude}/><br/> 
                                        </div> 
                                        <div className={Styles.C_input}>
                                            <input onChange={this.onChangeInput} type="number" name="longitude" placeholder="Longitude" value={this.state.longitude}/><br/> 
                                        </div> 

                                        <div className={Styles.C_input}>
                                            <input onChange={this.onChangeFInput} id="fileControl" type="file" name="image" placeholder="image" /><br/> 
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4 mx-auto  mt-2" >
                                            <button onClick={this.getLocation }   className={`${Styles.btn} ${Styles.fill_button}`}>getlocation</button>
                                            </div>
                                            <div className="col-md-4 mx-auto mt-2" >
                                                <button onClick={this.handleSubmit} className={`${Styles.btn} ${Styles.fill_button}`}> Submit</button>
                                            </div>
                                        </div>
                                        
                                    </form>
                                </div>
                                <div className={`col-12 col-md-6 ${Styles.map}`}>
                                    <div >
                                        <Map
                                            style="mapbox://styles/mapbox/streets-v9"
                                            containerStyle={{
                                                height: '70vh',
                                                width: '100%'
                                            }}
                                            center={[80.94615925,26.8467088]}
                                            zoom={[5]}
                                            onClick={this.onClickMap}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
            </Spring>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated:state.auth.isAuthenticated,
    user: state.auth.user
});

export default  connect(mapStateToProps,null)(Complaint);