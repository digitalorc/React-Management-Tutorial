import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import Customer from './components/Customer';

const customers = [
  {
    'id':1,
    'image':'https://placeimg.com/64/64/any',
    'name': 'Michal Json',
    'birthday' : '19650515',
    'gender' : 'male',
    'job' : 'Musician'
  },
  {
    'id':2,
    'image':'https://placeimg.com/64/64/any',
    'name': 'Brian Kuler',
    'birthday' : '1920515',
    'gender' : 'female',
    'job' : 'singer'
  },
  {
    'id':3,
    'image':'https://placeimg.com/64/64/any',
    'name': 'Jhon Do',
    'birthday' : '1980911',
    'gender' : 'female',
    'job' : 'driver'
  },
  {
    'id':4,
    'image':'https://placeimg.com/64/64/any',
    'name': 'Fradric Kudrong',
    'birthday' : '19201120',
    'gender' : 'male',
    'job' : 'student'
  },
  {
    'id':5,
    'image':'https://placeimg.com/64/64/any',
    'name': 'Eddy Jonson',
    'birthday' : '1970505',
    'gender' : 'male',
    'job' : 'labor'
  },
  {
    'id':1,
    'image':'https://placeimg.com/64/64/any',
    'name': 'Yulo Yohana',
    'birthday' : '19901205',
    'gender' : 'female',
    'job' : 'Dancer'
  }
];
class App extends Component {
  render() {
    return (
      <div>
        {
          customers.map(c=> {
              return (<Customer key={c.id} id={c['id']} image={c['image']} name={c['name']} birthday={c['birthday']} gender={c['gender']} job={c['job']}/>)
            }
          )
        }
      </div>

    );
  }

  
}

export default App;
