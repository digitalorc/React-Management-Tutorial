import React from 'react';
import {Dialog,DialogActions, DialogTitle, DialogContent, Button, Typography} from '@material-ui/core';
class CustomerDel extends React.Component {

    constructor(props){
        super(props);

        this.state ={
            open: false
        }
    }

    handleClickOpen = () =>  {
        this.setState({open:true});
    }

    handleClose = () => {
        this.setState({           
            open : false /*dialog is open?*/
        });
    }


    deleteCustomer (id) {
        const url = 'api/customers/'+id;
        fetch(url, {
            method:'DELETE'
        });

        this.props.stateRefresh();
    }

    render(){
        return(
            <div>
                <Button variant="contained" color='secondary' onClick ={this.handleClickOpen}> delete </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle onClose={this.handleClose}>
                        삭제경고
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBotton>
                            선택한 고객 정보가 삭제됩니다.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                    <Button variant="contained" color='primary' onClick ={(e) => {this.deleteCustomer(this.props.id)}}> 삭제 </Button>
                    <Button variant="outlined" color='primary' onClick ={this.handleClose}> 취소 </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


export default CustomerDel;