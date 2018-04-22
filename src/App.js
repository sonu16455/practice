import React, { Component } from 'react';
import Appc from './Appc'
import './App.css';

  const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());


  class App extends Component {
    constructor(props){
      super(props);
      const DEFAULT_QUERY = 'redux';
      
      this.state = {
        result:null,
        searchTerm:DEFAULT_QUERY,
      };
      this.setSearchTopStories = this.setSearchTopStories.bind(this);
      this.onDismiss = this.onDismiss.bind(this);
      this.onSearchChange = this.onSearchChange.bind(this);
      this.onSearchSubmit = this.onSearchSubmit.bind(this);
      this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    }

    setSearchTopStories(result){
      this.setState({
        result
      });
    }

    fetchSearchTopStories(searchTerm){
      const PATH_BASE = 'https://hn.algolia.com/api/v1';
      const PATH_SEARCH = '/search';
      const PARAM_SEARCH = 'query=';
      fetch (`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response=>response.json())
      .then(result =>this.setSearchTopStories(result))
      .catch(error => error); 
    }

    componentDidMount(){
      
      const {searchTerm} = this.state;
      this.fetchSearchTopStories(searchTerm);
    }

    onSearchChange(e){
      this.setState({searchTerm:e.target.value});
      
    }

    onSearchSubmit(){
      const {searchTerm} = this.state;
      this.fetchSearchTopStories(searchTerm);
    }

    onDismiss(id){
      
      // const updatedList = this.state.list.filter(item => item.objectID!==id);
      const isNotId = item =>item.objectID!==id;
      const updatedHits = this.state.results.hits.filter(isNotId);
      this.setState({
        result:{...this.state.result, hits: updatedHits}
      });
    }

    
    
    render(){
      const{searchTerm, result} = this.state;
      if(!result){
        return null;
      }

      return(
        <div className = "App">
          <Search value = {searchTerm} 
          onChange={this.onSearchChange}
          onSubmit = {this.onSearchSubmit}>
          
          Search
          </Search>
          
          {result && 
          <Table list={result.hits}
          pattern = {searchTerm}
          onDismiss = {this.onDismiss}/> }
                
        </div>
      );
    }
            
    
  }

  export default App; 



const Search = ({value,onChange,onSubmit,children})=>{
      <form onSubmit={onSubmit}>
        {children}:-
        <input type= "text" value={value} onChange={onChange}/>
        <button type = "submit">{children}</button>
      </form>
}


const Table = ({list, onDismiss}) =>

      <div>
        {list.map(item=>{
          return(
          <div className="items-wrper" key = {item.objectID}>
            <span>
              <a href = {item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
            &nbsp;&nbsp;
              <Button onClick={()=>onDismiss(item.objectID)} type="button">Dismiss</Button>
            </span>
          </div>
          )
        })}
      </div>


class Button extends Component {
  render(){
      const {onClick,className,children} = this.props;
    return(
      <button onClick={onClick} className = {className} type="button">{children}  </button>
    );
  }
}


