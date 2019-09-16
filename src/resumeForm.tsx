import React, { Component } from 'react';
import { string, array } from 'prop-types';

let style ={
    padding:"10px"
}

//add interface
interface IResume{
    name:string,
    phoneNumber:string,
    education:string[],    
} 


class Resume extends Component<any,IResume>{
    
    constructor(props:any){
        super(props);
            this.state={name:"",
                        phoneNumber:"",
                        education:[],
                        };
           
    this.handleNameChange=this.handleNameChange.bind(this)
    this.handleNumberChange=this.handleNumberChange.bind(this)
    this.handleEducationChange=this.handleEducationChange.bind(this)
    }

    handleNameChange(event:any){
        this.setState({name:event.target.value});
    }
    handleNumberChange(event:any){
        this.setState({phoneNumber:event.target.value});
    }
    handleEducationChange(event:any){
        this.setState({education:event.target.value});
    }
    render(){
        return(

            <form>
                <label style={style}>Please enter your name</label>
                <input type="text" value={this.state.name} onChange={this.handleNameChange}/>
                <label style={style}>Please enter your phone number</label>
                <input type="text" value={this.state.phoneNumber} onChange={this.handleNumberChange}/>
                <label style={style}>Please enter your education history</label>
                <input type="text" value={this.state.education} onChange={this.handleEducationChange}/>
                <button>Add to history</button>
                <div><label>Your education: {this.state.education}</label></div>
                </form>
        )      
    };
};


export default Resume