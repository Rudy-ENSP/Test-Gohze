import React, { Component } from 'react';

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css'
import '../../index.css'
import $ from 'jquery'

import {Redirect} from "react-router-dom";




export  class Acceuil extends Component {
	 
    constructor(){
        super()
        this.state={
           extremedroite:"",
           datatond1:"",
           sequence1:"",
           datatond2:"",
           sequence2:"",
           datatond3:"",
           sequence3:"",
           result1:"",
           result2:"",
           result3:"",
    
        }
    }
	
    componentDidMount() {
	   
		
      }
	
	   
	  onChangedatatond1 = (event) => {
        this.setState({datatond1: event.target.value});
        console.log(event.target.value)
        
      }
    onChangedatatond2 = (event) => {
    this.setState({datatond2: event.target.value});
    console.log(event.target.value)
    }
    onChangedatatond3 = (event) => {
    this.setState({datatond3: event.target.value});
    console.log(event.target.value)
    }
    onChangesequence1 = (event) => {
        this.setState({sequence1: event.target.value});
        console.log(event.target.value)
      }
    onChangesequence2 = (event) => {
    this.setState({sequence2: event.target.value});
    console.log(event.target.value)
    }
    onChangesequence3 = (event) => {
    this.setState({sequence3: event.target.value});
    console.log(event.target.value)
    }
    
    onChangeextremedroite = (event) => {
        this.setState({extremedroite: event.target.value});
        console.log(event.target.value)
        }
    onSendData= (event) => {
           
        event.preventDefault();
        let Data={
            'extremedroite':this.state.extremedroite,
            'datatond1': this.state.datatond1,
            'datatond2': this.state.datatond2,
            'datatond3': this.state.datatond3,
    
            'sequence1':this.state.sequence1,
            'sequence2':this.state.sequence2,
            'sequence3':this.state.sequence2,
                   
            
        };
        axios.post('http://127.0.0.1:8000/gohze/tondeuse/',Data)
              .then(res => {
                const result = res.data;
                //this.setState({result1:result.tond1,result2:result.tond2,result3:result.tond3, });
                console.log(res.data)
                var tond1=res.data.tondeuse1
                var tond3=res.data.tondeuse3
                var tond2=res.data.tondeuse2
                //tond2=res.data['tondeuse2']
                //tond3=res.data['tondeuse3']
                $("#result1").html("NOUVELLES VALEURS: Position ["+tond1.positionX+","+tond1.positionY+"] "+ "Orientation: "+tond1.orientation ).css("color","green");
                $("#result2").html("NOUVELLES VALEURS: Position ["+tond2.positionX+","+tond2.positionY+"] "+ "Orientation: "+tond2.orientation ).css("color","green");
                $("#result3").html("NOUVELLES VALEURS: Position ["+tond3.positionX+","+tond3.positionY+"] "+ "Orientation: "+tond3.orientation ).css("color","green");
                
    
              })
              .catch(function (error) {
                console.log(error);
              });
    
        
       
        
      }

      render(){


        return (
          <div className="App">
            <form id="validate" onSubmit={this.onSendData} >
                                 
              <h4 class="modal-title">Entrer les informtions des tondeuses</h4>
                                     
                        <div class="form-group">
                                                      <label for='username' style={{fontWeight:"bold"}}>Coordonnees point Extreme droite</label>
                                                                  <input type='text' className ="form-control" name='Titre'
                                                          onChange={this.onChangeextremedroite} required />
                                                              
                                          </div>
                        <div class="form-group">
                        <label for='username' style={{fontWeight:"bold"}}>Donnée Tondeuse 1</label>
                                                                  <input type='text' className ="form-control" name='Titre'
                                                          onChange={this.onChangedatatond1} required />        
                                                              
                                          </div>
                        <div class="form-group">
                        <label for='username' style={{fontWeight:"bold"}}>Sequence 1</label>
                                                                  <input type='text' className ="form-control" name='Titre'
                                                          onChange={this.onChangesequence1} required />        
                                                              
                                          </div>
                                          <div class="" id="result1"></div> 
                        <div class="form-group">
                        <label for='username' style={{fontWeight:"bold"}}>Donnée Tondeuse 2</label>
                                                                  <input type='text' className ="form-control" name='Titre'
                                                          onChange={this.onChangedatatond2} required />        
                                                              
                                          </div>
                        <div class="form-group">
                        <label for='username' style={{fontWeight:"bold"}}>Sequence 2</label>
                                                                  <input type='text' className ="form-control" name='Titre'
                                                          onChange={this.onChangesequence2} required />        
                                                              
                                          </div>
                                          <div class="" id="result2"></div> 
                        <div class="form-group">
                        <label for='username' style={{fontWeight:"bold"}}>Donnée Tondeuse 3</label>
                                                                  <input type='text' className ="form-control" name='Titre'
                                                          onChange={this.onChangedatatond3} required />        
                                                              
                                          </div>
                        <div class="form-group">
                        <label for='username' style={{fontWeight:"bold"}}>Sequence 3</label>
                                                                  <input type='text' className ="form-control" name='Titre'
                                                          onChange={this.onChangesequence3} required />        
                                                              
                                          </div>
                                          <div class="" id="result3"></div> 
      
                                          <input type="submit" id="input" onClick={this.onSendData} style={{marginLeft:'235px'}} class="btn btn-success" value="Envoyer"  />
                                  
                                         
                                     
                                  
                                  </form>
          </div>
        );
      }
}

export default Acceuil