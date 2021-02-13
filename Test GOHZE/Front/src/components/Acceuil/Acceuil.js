import React, { Component } from 'react';

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css'
import '../../index.css'
import $ from 'jquery'
import Modal from 'react-modal'
import {Modal as BModal,Button} from 'react-bootstrap'
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
           historymodalvisible:false,
           historique:[]
    
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
    getHistory= (event) => {
      
      event.preventDefault();
          axios.get('http://127.0.0.1:8000/gohze/listeParties/')
            .then(res => {
              
              console.log(res.data)
              this.setState({historique:res.data,historymodalvisible:true})
  
            })
            .catch(function (error) {
              console.log(error);
            });
         
         
          
        }
    hideHistory= (event)=>{
      
          this.setState({historymodalvisible:false})

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
        const Hist = this.state.historique
        const content = Hist.map((partie) =>
            
        <tr id={'tablerow'+partie.id} onClick={
            ()=>{this.setState({
                id:partie.id,
                
                })
                
                }}>
            
            
            <th scope="row" onClick={
            ()=>this.setState({
                modalVisible:true,
                })} >{partie.id}</th>

            <td  onClick={
            ()=>this.setState({
                modalVisible:true,
                 })}>{partie.extremedroite}</td>

            <td  onClick={
            ()=>this.setState({
                modalVisible:true,
                 })}>{partie.data_tondeuse1}</td>
            <td  onClick={
            ()=>this.setState({
                modalVisible:true,
                 })}>{partie.sequence1}</td>
            <td  onClick={
            ()=>this.setState({
                modalVisible:true,
                 })}>{partie.sortie1}</td>

            <td  onClick={
            ()=>this.setState({
                modalVisible:true,
                 })}>{partie.data_tondeuse2}</td>
            <td  onClick={
            ()=>this.setState({
                modalVisible:true,
                 })}>{partie.sequence2}</td>
            <td  onClick={
            ()=>this.setState({
                modalVisible:true,
                 })}>{partie.sortie2}</td>     
            <td  onClick={
            ()=>this.setState({
                modalVisible:true,
                 })}>{partie.data_tondeuse3}</td>
            <td  onClick={
            ()=>this.setState({
                modalVisible:true,
                 })}>{partie.sequence3}</td>
            <td  onClick={
            ()=>this.setState({
                modalVisible:true,
                 })}>{partie.sortie3}</td>     
            
        </tr>
   
  );

  function showTable(){
             
    if(Hist.length === 0){
        return(
            " "
        )
    }
    else{
      return (
          
              
              <div className="table-wrapper-scroll-y my-custom-scrollbar" >
                  <table className="table table-bordered table-striped table-hover mb-0 ">
                      <thead >
                          <th>Id</th>
                          <th>Extreme Droite</th>
                          <th>Data Tondeuse1</th>
                          <th>Sequence1</th>
                          <th>Sortie1</th>
                          <th>Data Tondeuse2</th>
                          <th>Sequence2</th>
                          <th>Sortie2</th>
                          <th>Data Tondeuse3</th>
                          <th>Sequence3</th>
                          <th>Sortie3</th>
                      </thead>
                      
                      <tbody>
                          {content}
                      </tbody>
                  </table>
                  
              </div>
          
      )}
      
   
  }


        return (
          <div className="App">
            <form id="validate" onSubmit={this.onSendData} >
                                 
              <h4 class="modal-title"style={{fontWeight:"bold",marginBottom:'20px'}}>Entrer les informations des tondeuses</h4>
              <input type="button" id="hist" onClick={this.getHistory} style={{marginLeft:'1370px'}} class="btn btn-warning" value="Historique"  />      
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
        
      <Modal isOpen={this.state.historymodalvisible} closeTimeoutMS={500} contentLabel="modal"
                    style={{
                        overlay: {
                        position: 'fixed',
                        top: 15,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.8)'
                        },
                        content: {
                        position: 'absolute',
                        top: '60px',
                        left: '10%',
                        right: '10%',
                        bottom: '70px',
                        border: '1px solid black',
                        background: '#E0E0E0',
                        overflow: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '10px',
                        outline: 'none',
                        padding: '0px'
                        }
                    }}>
                   <h4 style={{marginBottom:"15px",marginTop:"20px",marginLeft:"10px",fontWeight:"bold"}}>  Le Tableau suivant repertorie toutes les parties precedentes du jeu !</h4> 
            {showTable()}
            <input type="button" id="hist" onClick={this.hideHistory}  style={{marginTop:"25px",marginLeft:"1100px"}} class="btn btn-warning" value="Close"  />      
                </Modal>
          </div>
          
        );
      }
}

export default Acceuil