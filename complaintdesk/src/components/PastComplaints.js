import React,{Component} from 'react';
import axios from 'axios';
import Styles from './Components.module.css';
import {Link} from 'react-router-dom';
import { Spring } from 'react-spring/renderprops'; 
import { connect } from 'react-redux';
var dateFormat = require('dateformat');

class PastComplaint extends Component{
    constructor(props){
        super(props);
        this.state={
            complaintData:[]
        };
        this.LoadData=this.LoadData.bind(this);
    }



    async LoadData(){
        if (this.props.isAuthenticated) { 
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            try {
                const res = await axios.get('/api/complaints/', config)
                const user_id = this.props.user._id;
                this.setState({
                    complaintData:res.data.filter(complaint => complaint.author === user_id)
                })
            
            } catch (err) {
                console.log(err);
            }
        } 

    }

    componentDidMount() {
        this.LoadData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
          this.LoadData();
        }
    }

    
    
    render(){
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return(
            <Spring
            from={{opacity:0,marginLeft:-500}}
            to={{opacity:1,marginLeft:0}}
            config={{duration:1000}}
            >
                {props =>(
                   <div style={props}>
                        <div className={Styles.container}>
                            {this.state.complaintData &&
                            this.state.complaintData.map(complaint => {
                                return (
                                    <div className={Styles.complaintt}>
                                        <div className={Styles.complaint_img}>
                                            <img src="complaintdesk/src/assets/complaint_image.jpeg" />
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
                   </div>)}
            </Spring>
            
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated:state.auth.isAuthenticated,
    user: state.auth.user
});

export default  connect(mapStateToProps,null)(PastComplaint);


// return (
//     <Link className={Styles.linkk} to={`complaintdetail/${complaint._id}`}>
//         <div className={Styles.complaint}>
//             <div className="card">
//                 <div className="card-header">
//                 <h4>{complaint.title}</h4>
//                 </div>
//                 <div className="card-body">
//                     <p className={`card-text ${Styles.blackk}`}>{complaint.description}</p>
//                 </div>
//             </div>
//         </div>
//     </Link>
// );