
import './App.css';
import React, {Component} from 'react';
import Customer from './components/Customer';
import {Table, TableHead, TableBody, TableRow, TableCell, Paper, CircularProgress, withStyles} from '@material-ui/core';
import CustomerAdd from './components/CustomerAdd';

const styles = theme => ({
    root: {
      width:'100%' ,
      marginTop: theme.spacing(3),
      overflowX: 'auto',         
    },
    table:{
      minWidth:1080   
    },    
    body:{
      fontWeight: 'bolder',
      fontSize:16,
      color:'blue' 
    },
    progress:{
      margin:theme.spacing(2)
    }
});
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      customers:"",
      completed: 0
    }
  }
  

   callApi = async()=>{    
    const response = await fetch('/api/customers');    
    const body = await response.json();    
    return body;
  }


  stateRefresh = () => {
    this.setState({
        customers :'',
        completed : 0   
    });

    this.callApi()
        .then(res => this.setState({customers:res}))
        .catch(err => console.log(err));
  }


  progress =()=>{
  //  const {completed} = this.state;
  //  this.setState({completed: completed >=100 ?0 : completed +1});

    //console.log('progress() : completed --> '+completed);
  }
 
  componentDidMount(){
   // this.timer = setInterval(this.progress, 100);

    this.callApi()
          .then(res =>{            
            this.setState({customers:res});
          })
          .catch(err=>console.log(err));      
  }


  render() {
    const {classes} = this.props;
    return (
      <div>
        <Paper className={classes.root}>
          <Table className ={classes.table} >
            <TableHead>
              <TableRow >
                <TableCell className={classes.body}>Id</TableCell>
                <TableCell className={classes.body}>Image</TableCell>
                <TableCell className={classes.body}>Name</TableCell>
                <TableCell className={classes.body}>Birthday</TableCell>
                <TableCell className={classes.body}>Gender</TableCell>
                <TableCell className={classes.body}>Job</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                this.state.customers? this.state.customers.map(c=> {return (<Customer key={c.id} id={c['id']} image={c['image']} name={c['name']} birthday={c['birthday']} gender={c['gender']} job={c['job']}/>);}) :
                <TableRow>
                  <TableCell colspan="6" align="center" >
                    <CircularProgress classname={classes.progress} variant="indeterminate" color="secondary"/>
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>
        <CustomerAdd stateRefresh={this.stateRefresh}/>
      </div>
    );
  }

  
}

export default withStyles(styles)(App);
