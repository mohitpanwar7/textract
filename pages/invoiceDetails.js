import Head from 'next/head';
import React from 'react';
import Dropzone from 'react-dropzone';
import { uploadInvoice , requestScan} from '../util/APIUtils';
import toast, { Toaster } from 'react-hot-toast';
import { bytesToSize, MAX_FILE_UPLOAD_SIZE } from '../util/fileUtil';
import CustomLoader from '../components/CustomLoader';
import Router from 'next/router';
import { Tabs, Tab, Row, Col, OverlayTrigger, Button, Tooltip, Container, Form, Image, Modal } from 'react-bootstrap';

const labelStyle = {
  width: "250px",
  fontWeight : "bold"
}

class InvoiceDetails extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        uploadFile : '',
        uploadFileName : '',
        loader: false,
        invoice_key : '',
        invoice_file_name : '',
        acceptedFiles : null,
        model_list : [],
        date : '',
        productName : '',
        companyName : '',
        addToggle: false 
    }
    this.cancelButton = this.cancelButton.bind(this);
    this.scanButton = this.scanButton.bind(this);
  }

  static getInitialProps({ query }) {
    return { query }
  }

  componentDidMount(){
    console.log("this.props.query response :: ",this.props.query);
    if(this.props.query.key != undefined){
        console.log("this.props.query response :: ",this.props.query);
        this.setState({loader : true});
        var data ={ "key" : this.props.query.key };
        requestScan(data).then(response => {
            console.log("requestScan response :: ",response);
            let loweredKeys=Object.keys(response.data).map(a=>a.toLowerCase())
            var dateArray = []
            loweredKeys.forEach(element => {
                if (element.includes('date')){
                    dateArray.push(element);
                }
            });
            if ( dateArray.length > 0 ) {
                console.log("datearray",dateArray);
                var data = response.data
                let keyIndex=loweredKeys.indexOf(dateArray[0])
                console.log("keyIndex response :: ",keyIndex);
                console.log("requestScan response :: ",data[keyIndex]);
                let values=Object.values(data)

                console.log("DATE :: ",values[keyIndex])
                this.setState({ date : values[keyIndex], loader : false })
            }            
            if (response && response.data != undefined && response.data.model_list.length > 0){
                var mlist = response.data.model_list[0]
                this.setState({ companyName : mlist.company_name , productName : mlist.product_name, loader : false })
 
            }
        });
    }
  }


  cancelButton(){
      Router.push('/homepage')
  }

  scanButton(){
    if (this.state.companyName != '' && this.state.productName != ''){
       this.setState({ addToggle : true })
    }
  }

  render(){
    return(
      <>
        <Head>
            <title>Totoko Textract Demo</title>
            <meta name="description" content="Totoko Textract Demo" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        {this.state.addToggle == false ? 
        <>
        <div className='totoko-header'>
            <div className='header-text2'>
            Bill Details
            </div>
            <div className='header-text-sub' >
            You can edit this information using the drop-down
            </div>
        </div>
        <div className='justify-content-center p-5' style={{marginLeft : '20%', marginRight : '20%'}}>
              <div className="row">
                <div className="col-12 mb-3">
                    <Form.Group controlId="validationpassword" className="form-field" >
                        <Form.Label style={labelStyle}>Company/Brand Name</Form.Label>
                        <Form.Control type="text" name="Company"
                            autoComplete="off"
                            value={this.state.companyName}
                            onChange={(event) => { this.setState({ companyName: event.target.value }) }}
                            className="form-control"
                   
                        />
                    </Form.Group>
                  </div>
                  <div className="col-12 mb-3">
                    <Form.Group controlId="validationpassword" className="form-field" >
                        <Form.Label style={labelStyle}>Product Name</Form.Label>
                        <Form.Control type="text" name="Product"
                            autoComplete="off"
                            value={this.state.productName}
                            onChange={(event) => { this.setState({ productName: event.target.value }) }}
                            className="form-control"
                        />
                    </Form.Group>
                  </div>
                  <div className="col-12 mb-3">
                    <Form.Group controlId="validationpassword" className="form-field" >
                        <Form.Label style={labelStyle}>Date</Form.Label>
                        <Form.Control type="text" name="date"
                            autoComplete="off"
                            value={this.state.date}
                            onChange={(event) => { this.setState({ date: event.target.value }) }}
                            className="form-control"
                        />
                    </Form.Group>
                  </div>
              </div>
              
            
        </div>
        <div className='text-center'>
            <Button type='button' onClick={() => this.cancelButton()} className='cancel-button pills'>Cancel</Button>
            {this.state.companyName.trim() != '' && this.state.productName.trim() != '' ? <Button type='button' onClick={() => this.scanButton()} className='scan-button pills'>Add Product</Button> : '' }
        </div>
        </> : 
        <div className='add-product-page'>
          <div className='add-product-middle-div'>
            Your {this.state.companyName} {this.state.productName} has been added !!
          </div>
          <div className='text-center'>
           <button type='button' onClick={() => this.cancelButton()} className='back-button pills'>Back</button>
     
        </div>
        </div>
        }
        {this.state.loader ? <CustomLoader /> : false}
        <Toaster toastOptions={{ duration: 5000 }} />
      </>
    )
  }


}

export default InvoiceDetails;