import React,{Component} from 'react';
import Styles from './Components.module.css';
import ReactMapboxGl, { Layer, Feature,Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import { Spring } from 'react-spring/renderprops'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { deleteComplaint } from '../actions/complaint';
var dateFormat = require('dateformat');


const Map = ReactMapboxGl({
    accessToken:
    'pk.eyJ1IjoicmFnaHVyYWpqIiwiYSI6ImNrMnJpYzhzZjA2MGIzZXBkb2oxYnV2MWQifQ.1PinwGk6Y3P0q-l7SXkfWg'
});

class ComplaintDetail extends Component{

    constructor(props){
        super(props);
        this.state={
            complaintData:null
        };
        this.LoadData=this.LoadData.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
    }

    async LoadData(){
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            try {
                const pk = (window.location.pathname.split('/'))[2];
                const url = '/api/complaints/'+pk+'/';
                const res = await axios.get(url, config);
                this.setState({
                    complaintData:res.data
                })
            
            } catch (err) {
                console.log(err);
            }
    }

    async handleDelete(){
        if(this.props.isAuthenticated){
            this.props.deleteComplaint()
            this.props.history.push('/')
        }
    }

    componentDidMount() {
        this.LoadData();
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
                         <div className={Styles.container}>
                            <div className="row">
                                <h1>{this.state.complaintData?this.state.complaintData.title:'Title'}</h1>
                            </div>
                            <div className="row my-5 mx-5">
                                {this.state.complaintData? 
                                <div className={`col-12 col-md-6 col-xs-12`}>
                                    <div className={Styles.complaintdetail}>
                                        <div className={Styles.complaintdetail_img}>
                                            <img src={`http://localhost:3000/${this.state.complaintData.image}`}/>
                                        </div>
                                        <div className={Styles.complaint_description}>
                                            <div className={Styles.complaint_date}>
                                                <span>{dateFormat(this.state.complaintData.date, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</span>
                                            </div>

                                            <h1 className={Styles.complaint_title}>{this.state.complaintData.title}</h1>
                                            <p className={Styles.complaintdetail_text}>{this.state.complaintData.description} </p>
                                            <h6>{this.state.complaintData.address}</h6>
                                            <div className="row">
                                                <div className={`col-sm-7 col-md-6 col-xs-12 my-2`}>
                                                    <button className={` ${Styles.btn} ${Styles.empty_button}`}>&nbsp;{this.state.complaintData.status}&nbsp;</button>
                                                </div>
                                                <div className={`col-sm-7 col-md-6 col-xs-12 my-2`}>
                                                    {
                                                        this.props.isAuthenticated && this.props.user && this.props.user._id===this.state.complaintData.author?
                                                        <button className={` ${Styles.btn} ${Styles.fill_button}`} onClick={this.handleDelete}><FontAwesomeIcon icon={faTrash} />&nbsp;DELETE&nbsp;</button>
                                                        :null
                                                    }
                                                </div>
                                                
                                            </div>
                                            
                                              
                                        </div>
                                    </div>
                                </div>:null}
                                <div className={`col-12 col-md-6 ${Styles.map}`}>
                                    <Map
                                        style="mapbox://styles/mapbox/streets-v9"
                                        containerStyle={{
                                            height: '100%',
                                            width: '100%'
                                        }}
                                        center={this.state.complaintData?[this.state.complaintData.longitude,this.state.complaintData.lattitude]:[80.94615925,26.8467088]}
                                        zoom={[5]}
                                    >
                                        {this.state.complaintData?
                                        <Marker
                                            coordinates={[this.state.complaintData.longitude,this.state.complaintData.lattitude]}
                                            anchor="bottom"
                                            width='10px'
                                            height='10px'>
                                            <div className={Styles.mapMarkerStyle} />
                                        </Marker>:
                                        <Marker
                                            coordinates={[80.94615925, 26.8467088]}
                                            anchor="bottom"
                                            width='10px'
                                            height='10px'>
                                            <div className={Styles.mapMarkerStyle} />
                                        </Marker>
                                        }
                                    </Map>
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
    user: state.auth.user,
    complaints:state.complaints.complaints
});

export default  connect(mapStateToProps,{deleteComplaint})(ComplaintDetail);
