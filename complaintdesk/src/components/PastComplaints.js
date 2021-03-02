import React,{Component} from 'react';
import axios from 'axios';
import Styles from './Components.module.css';
import {Link} from 'react-router-dom';
import { Spring } from 'react-spring/renderprops'; 


class PastComplaint extends Component{
    constructor(props){
        super(props);
        this.state={
            complaintData:[]
        };
        this.LoadData=this.LoadData.bind(this);
    }



    async LoadData(){
        if (localStorage.getItem('token')) { 
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            try {
                const res = await axios.get('/api/complaints/', config)
                config.headers['x-auth-token'] = localStorage.getItem('token')
                console.log(res.data);
                const user_data = await axios.get('/api/auth/user/', config);
                const user_id = user_data.data._id;
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
                                    <Link className={Styles.linkk} to={`complaintdetail/${complaint._id}`}>
                                        <div className={Styles.complaint}>
                                            <div className="card">
                                                <div className="card-header">
                                                <h4>{complaint.title}</h4>
                                                </div>
                                                <div className="card-body">
                                                    <p className={`card-text ${Styles.blackk}`}>{complaint.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                   </div>)}
            </Spring>
            
        );
    }
}

export default PastComplaint;
