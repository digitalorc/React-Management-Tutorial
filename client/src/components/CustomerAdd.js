import React from 'react';
import {post} from 'axios';


class CustomerAdd extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            file:null,
            userName:'',
            birthDay:'',
            gender:'',
            job:'',
            fileName:''
        }
    }

    handleFormSummit = (e) => {
        e.preventDefault();
        this.addCustomer()
            .then(response => {
                console.log(response.data);
                this.props.stateRefresh();
            });
        this.setState({
            file:null,
            userName:'',
            birthDay:'',
            gender:'',
            job:'',
            fileName:''
        });           
    }

    handleFileChange = (e) => {
        this.setState({
            file:e.target.files[0],
            fileName:e.target.value
        });
    }

    handleValueChange = (e) => {
        let nextState ={};
        nextState[e.target.name] = e.target.value;        
        this.setState(nextState);
    }

    addCustomer = () => {
        const url= 'api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthDay', this.state.birthDay);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);

        const config={
            headers: {
                'content-type' : 'multipart/form-data'  /*in case the upload data have a file */
            }
        }
        return post(url,formData, config);
    }

    render(){
        return (
            <form onSubmit={this.handleFormSummit}>
                <h1>고객 추가</h1>
                Profile Image: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                Name:<input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                BirthDay<input type="text" name="birthDay" value={this.state.birthDay} onChange={this.handleValueChange}/><br/>
                Gender<input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                Job<input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                <button type="summit">Add User</button>
            </form>
        )
    }

}

export default CustomerAdd;