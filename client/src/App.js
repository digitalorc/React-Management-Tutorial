import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import Customer from './components/Customer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const customers = [
  {
    'id':1,
    'image':'https://placeimg.com/64/64/1',
    'name': 'Michal Json',
    'birthday' : '19650515',
    'gender' : 'male',
    'job' : 'Musician'
  },
  {
    'id':2,
    'image':'https://placeimg.com/64/64/2',
    'name': 'Brian Kuler',
    'birthday' : '1920515',
    'gender' : 'female',
    'job' : 'singer'
  },
  {
    'id':3,
    'image':'https://placeimg.com/64/64/3',
    'name': 'Jhon Do',
    'birthday' : '1980911',
    'gender' : 'female',
    'job' : 'driver'
  },
  {
    'id':4,
    'image':'https://placeimg.com/64/64/4',
    'name': 'Fradric Kudrong',
    'birthday' : '19201120',
    'gender' : 'male',
    'job' : 'student'
  },
  {
    'id':5,
    'image':'https://placeimg.com/64/64/5',
    'name': 'Eddy Jonson',
    'birthday' : '1970505',
    'gender' : 'male',
    'job' : 'labor'
  },
  {
    'id':6,
    'image':'https://placeimg.com/64/64/6',
    'name': 'Yulo Yohana',
    'birthday' : '19901205',
    'gender' : 'female',
    'job' : 'Dancer'
  }
];


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
    }
});
class App extends Component {
  render() {
    const {classes} = this.props;
    return (
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
              customers.map(c=> {return (<Customer key={c.id} id={c['id']} image={c['image']} name={c['name']} birthday={c['birthday']} gender={c['gender']} job={c['job']}/>)})
            }
          </TableBody>
        </Table>
      </Paper>

    );
  }

  
}

export default withStyles(styles)(App);
