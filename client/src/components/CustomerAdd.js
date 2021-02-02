import React from 'react';
import {post} from 'axios';
import {Dialog,DialogActions, DialogTitle, DialogContent, TextField, Button, withStyles} from '@material-ui/core';


const styles = theme => ({
    hidden: {
        display:'none'
    }
});

class CustomerAdd extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            file:null,
            userName:'',
            birthDay:'',
            gender:'',
            job:'',
            fileName:'',
            open : false /*dialog is open?*/

        }
    }

    handleClickOpen = () =>  {
        this.setState({open:true});
    }

    handleClose = () => {
        this.setState({
            file:null,
            userName:'',
            birthDay:'',
            gender:'',
            job:'',
            fileName:'',
            open : false /*dialog is open?*/
        });
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
        fileName:'',
        open: false
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
        const {classes} = this.props;

        return (
            /*
            <form onSubmit={this.handleFormSummit}>
                <h1>고객 추가</h1>
                Profile Image: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                Name:<input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                BirthDay<input type="text" name="birthDay" value={this.state.birthDay} onChange={this.handleValueChange}/><br/>
                Gender<input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                Job<input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                <button type="summit">Add User</button>
            </form>
            */
           <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}> 고객 추가 하기</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName ==="" ? "프로필 이미지 선택" : this.state.fileName}
                            </Button>
                        </label>
                        <br/>
                        <TextField label="userName" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                        <TextField label="birthDay" name="birthDay" value={this.state.birthDay} onChange={this.handleValueChange}/><br/>
                        <TextField label="gender" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                        <TextField label="job" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSummit} >추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose} >취소</Button>
                    </DialogActions>
                </Dialog>
           </div>
        )
    }

}

export default withStyles(styles)(CustomerAdd);