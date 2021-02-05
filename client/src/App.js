
import './App.css';
import React, {Component} from 'react';
import Customer from './components/Customer';
import {Table, TableHead, TableBody, TableRow, TableCell, Paper, CircularProgress, withStyles} from '@material-ui/core';
import CustomerAdd from './components/CustomerAdd';
import {AppBar,IconButton, InputBase,Toolbar,fade,Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
    root: {
      width:'100%' ,     
      minWidth: 1080,         
    },
    menu:{
      marginTop :15,
      marginBottom: 15,
      display:'flex',
      justifyContent: 'center'
    },
    parper: {
      marginLeft:18,
      marginRight:18
    },
    body:{
      fontWeight: 'bolder',
      fontSize:16,
      color:'blue' 
    },
    progress:{
      margin:theme.spacing(2)
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    }

});
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      customers:"",
      completed: 0,
      searchKeyword: ''
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
        completed : 0   ,
        searchKeyword: ''
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

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }


  render() {
    const filteredComponents = (data) => {
      data = data.filter((c) => {
        return c.name.indexOf(this.state.searchKeyword) > -1;
      });

      return data.map(c=> {
        return (<Customer stateRefresh={this.stateRefresh} key={c.id} id={c['id']} image={c['image']} name={c['name']} birthday={c['birthday']} gender={c['gender']} job={c['job']}/>);
      }) ;
    };

    const {classes} = this.props;
    const colList =['번호', '이미지', '이름', '생년월일', '성별', '직업', '설정'];
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <div classname={classes.menu}>
          <CustomerAdd stateRefresh={this.stateRefresh}/>
          </div>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Customer managment page
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              name="searchKeyword"
              value={this.state.searchKeyword}
              onChange={this.handleValueChange}
            />
          </div>
        </Toolbar>
      </AppBar>

      <Paper >
        <Table className ={classes.table} >
          <TableHead>
            <TableRow >
              {colList.map(c =>{
                return <TableCell className={classes.body}>{c}</TableCell>
              })}                           
            </TableRow>
          </TableHead>
          <TableBody>
            {
              this.state.customers ? filteredComponents(this.state.customers) :              
              <TableRow>
                <TableCell colspan="6" align="center" >
                  <CircularProgress classname={classes.progress} variant="indeterminate" color="secondary"/>
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </Paper>
      
    </div>
    );
  }

  
}

export default withStyles(styles)(App);
