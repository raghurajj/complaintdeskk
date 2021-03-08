import React,{Component} from 'react';
import axios from 'axios';
import Styles from './Components.module.css';
import {Link} from 'react-router-dom';
import { Spring } from 'react-spring/renderprops'; 
var dateFormat = require('dateformat');

class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            complaintData:[]
        };
        this.LoadData=this.LoadData.bind(this);
    }

    async LoadData(){
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            try {
                const res = await axios.get('/api/complaints/', config);
                console.log(res.data);
                this.setState({
                    complaintData:res.data
                })

                
            
            } catch (err) {
                console.log(err);
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
                                <div className={Styles.complaintt}>
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

export default Home;

/*
{this.state.complaintData &&
    this.state.complaintData.map(complaint => {

        return (
            // <div className={Styles.complaint}>
                <div className={Styles.complaintt}>
                    <div className={Styles.complaint_img}>
                        <img src="data:image/jpeg;base64,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" />
                    </div>
                    <div className={Styles.complaint_description}>
                        <div className={Styles.complaint_date}>
                            <span>Momday</span>
                            <span>March 04 2021</span>
                        </div>
                        <h1 className={Styles.complaint_title}>{complaint.title}</h1>
                        <p className={Styles.complaint_text}>{complaint.description}</p>
                        <a href="#" className={Styles.complaint_cta}>Read More</a>
                    </div>
                </div>

            
        );
    })}*/