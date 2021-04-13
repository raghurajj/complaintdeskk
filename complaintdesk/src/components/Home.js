import React,{Component} from 'react';
import axios from 'axios';
import Styles from './Components.module.css';
import {Link} from 'react-router-dom';
import { Spring } from 'react-spring/renderprops'; 
import { connect } from 'react-redux';
import { loadData } from '../actions/complaint';
// import PropTypes from 'prop-types';
var dateFormat = require('dateformat');

class Home extends Component{

    componentDidMount() {
        this.props.loadData();
    }  
    
    render(){
        var complaintData =this.props.complaints
        console.log(complaintData)
        return(
            <Spring
            from={{opacity:0,marginLeft:-500}}
            to={{opacity:1,marginLeft:0}}
            config={{duration:1000}}
            >
                {props =>(
                   <div style={props}>
                       <div className={Styles.container}>
                       {complaintData &&
                        complaintData.map(complaint => {

                            return (
                                <div className={Styles.complaintt} key={complaint._id}>
                                    <div className={Styles.complaint_img}>
                                    <img src={complaint.image}/>
                                    </div>
                                    <div className={Styles.complaint_description}>
                                        <div className={Styles.complaint_date}>
                                            <span>{dateFormat(complaint.date, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</span>
                                        </div>
                                        <h1 className={Styles.complaint_title}>{complaint.title}</h1>
                                        <p className={Styles.complaint_text}>{complaint.description} </p>
                                        <Link className={`${Styles.linkk} ${Styles.btn} ${Styles.fill_button}`} to={`complaintdetail/${complaint._id}`}>Read More</Link>
                                    </div>
                                </div>
                            )
                        })}
                        </div>
                            
                    </div> 
                )}
            </Spring>
        )
    }
}

// Home.propTypes = {
//     loadData : PropTypes.func.isrequired,
//     complaints : PropTypes.object.isrequired

// }

const mapStateToProps = state => ({
    complaints:state.complaints.complaints
});

export default  connect(mapStateToProps,{loadData})(Home);