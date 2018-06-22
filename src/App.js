import React, { Component } from 'react';
import './App.css';
import firebase, {auth, provider} from './firebase.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: '',
      username: '',
      items: [], 
      user: null 
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  
  //receives inputs from our inputs and updates the corresponding piece of state
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  //when signout method is called, we remove the user from our app's state
  logout(){
    auth.signOut()
    .then(() => {
      this.setState({
        user:null
      });
    });
  }

  /*
  -signInWithPopup will trigger a popup login option to sign in with a Google account
  */
  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }

  //event listener for our form
  handleSubmit(e) {
    //prevents the page from refreshing
    e.preventDefault();
    //carves out a space on our database where we store the items
    const itemsRef = firebase.database().ref('items');
    //grab the item the user types and packs it into an item object
    const item = {
      title: this.state.currentItem,
      user: this.state.username
    }
    //sends a copy of our object so that it could be store in firebase
    itemsRef.push(item);

    //so inputs are cleared after they are added
    this.setState({
      currentItem: '',
      username: ''
    });
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });    
    
    /*
    instantiate a new array and populate it with results...
    snapshot: the callback that provides an overview of all the items ref of the database
    .val(): the method that grabs a list of all the properties instead of our object items
      -this value fires automatically on two occasions
        -any time a new item is added or removed
        -the first time the event listener is attached
    */
    const itemsRef = firebase.database().ref('items');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          user: items[item].user
        });
      }
      this.setState({
        items: newState
      });
    });
  }

  /* this method will need to be passed a unique key that serves as the 
      identifier for each one of the items inside of our Firebase database
    MAKE SURE TO SET BUTTON KEY TO THIS ONCLICK ACTION!!!!  
  */

  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }
  render() {
    return (
      <div className='app'>
        <header>
            <div className="wrapper">
              <h1>Fun Food Friends</h1>
              {
                this.state.user?
                <button onClick={this.logout}>Log Out </button>
                :
                <button onClick={this.login}>Login In</button>
              }               
            </div>
        </header>
        {this.state.user ?
          <div>
            <div className='user-profile'>
              <img src={this.state.user.photoURL} />
            </div>
          </div>
          :
          <div className='wrapper'>
              <p>You must be logged in to see the potluck list and submit to it.</p>
          </div>
      }

        <div className='container'>
          <section className='add-item'>
                <form onSubmit={this.handleSubmit}>
                  <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username} />
                  <input type="text" name="currentItem" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.currentItem} />
                  <button>Add Item</button>
                </form>
          </section>
          <section className='display-item'>
              <div className="wrapper">
                <ul>
                  {this.state.items.map((item) => {
                    return (
                      <li key={item.id}>
                        <h3>{item.title}</h3>
                        <p>brought by: {item.user}
                          <button onClick={() => this.removeItem(item.id)}>Remove Item</button>
                        </p>
                      </li>
                    )
                  })}
                </ul>
              </div>
          </section>
        </div>
      </div>
    );
  }
}
export default App;