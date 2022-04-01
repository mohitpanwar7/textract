import Loader from 'react-loader-spinner';
import { Container, Modal } from 'react-bootstrap';
import React,{Component} from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class CustomLoader extends Component {

    constructor(props){
        super(props);
        this.state={
            loader:true
        }
        this.handleLoaderClose = this.handleLoaderClose.bind(this);
    }
  
    handleLoaderClose(){
        this.setState({
            loader:false
        })
    } 
    
    render() {
        return (
            <Modal show={this.state.loader} onHide={this.handleLoaderClose} centereds className="page-loader">
              <Container>
               <Loader type="ThreeDots"
                        color="#00BFFF"
                        height="100"
                        width="100" />
                        </Container>
            </Modal>
        )
    }
}
export default CustomLoader;
