import React,{Component} from 'react';
import Styles from './Components.module.css';
import {Link} from 'react-router-dom';
import { Spring } from 'react-spring/renderprops'; 
import { connect } from 'react-redux';
import { loadData } from '../actions/complaint';
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
            this.props.loadData()
            const user_id = this.props.user._id;
            this.setState({
                complaintData:this.props.complaints.filter(complaint => complaint.author === user_id)
            })
            
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
                                    <div className={Styles.complaintt} key={complaint._id}>
                                        <div className={Styles.complaint_img}>
                                            <img src={complaint.image} />
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
    user: state.auth.user,
    complaints:state.complaints.complaints
});

export default  connect(mapStateToProps,{loadData})(PastComplaint);
