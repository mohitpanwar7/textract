import Head from 'next/head';
import React from 'react';
import Dropzone from 'react-dropzone';
import { uploadInvoice , requestScan} from '../util/APIUtils';
// import { Image } from 'react-bootstrap';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import { bytesToSize, MAX_FILE_UPLOAD_SIZE } from '../util/fileUtil';
import CustomLoader from '../components/CustomLoader';
import Router from 'next/router';

class Totoko extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        uploadFile : '',
        uploadFileName : '',
        loader: false,
        invoice_key : '',
        invoice_file_name : '',
        acceptedFiles : null
    }
    this.cancelButton = this.cancelButton.bind(this);
    this.scanButton = this.scanButton.bind(this);
  }

  componentDidMount(){

  }

  onDrop = (acceptedFiles, fileRejections) => {
    fileRejections.forEach((file) => {
        file.errors.forEach((err) => {
            if (err.code === "file-too-large") {
                toast.error("File too large, maximum file size allowed is " + bytesToSize(MAX_FILE_UPLOAD_SIZE), toastError);
            }

            if (err.code === "file-invalid-type") {
                toast.error("Invalid file type", toastError);
            }
        });
    });

    if (fileRejections.length > 0) {
        return false;
    }

    this.setState({ uploadFile: acceptedFiles[0], uploadFileName: acceptedFiles[0].name });
    if (acceptedFiles != null) {
        this.setState({ loader: true });
        var formData = new FormData();
        // for (let k = 0; k < acceptedFiles.length; k++) {
        console.log("accepterFiles ========>",acceptedFiles);
        formData.append('invoice', acceptedFiles[0]);
        // }
        uploadInvoice(formData).then(response => {
            this.setState({ uploadFile: "", invoice_key : response.invoice_key , loader: false, invoice_file_name :  response.invoice_file_name });
        }).catch(error => {
            console.log("oops ! something went wrong !! invoice upload ", error)
        });
    }
  }

  cancelButton(){
      this.setState({ uploadFile : '', uploadFileName : '', invoice_file_name : '', invoice_key : '' })
  }

  scanButton(){
    if (this.state.invoice_key != ''){
        Router.push('/invoiceDetails?key=' + this.state.invoice_key);
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

      <div className='totoko-header'>
        <div className='header-text'>
          Upload Documents
        </div>
        <div className='header-text-sub' >
          Store your Bills for Tension free Warranty Support
        </div>
      </div>
        <div className='justify-content-center d-flex'>
            <div className="flex my-3  " style={{ marginTop : '130px', width : '350px', minHeight: "75px" ,border : '2px solid black' }}>
            <Dropzone onDrop={this.onDrop}
                minSize={0}
                maxSize={MAX_FILE_UPLOAD_SIZE}>
                {({ getRootProps, getInputProps, isDragActive }) => (
                    <div {...getRootProps()} >
                        <input {...getInputProps()} />
                        <div className="att-option1 mt-5">
                            <div className="att-option-wrap">
                                <Image alt="" src="/folder-icon.png" className="" alt="" height="50" width="50" ></Image>
                                <div className='mt-3'>Upload Invoice Or Drag and Drop Invoice</div>
                                {isDragActive ? <p className="text-center">Drop It</p> : false}
                                <p className="p-1 pFileName">{this.state.invoice_file_name}</p>
                            </div>
                        </div>

                    </div>
                )}
            </Dropzone>
            </div>
        </div>
        <div className='text-center'>
            {this.state.invoice_key != '' ?<button type='button' onClick={() => this.cancelButton()} className='cancel-button pills'>Cancel</button> : '' }
            {this.state.invoice_key != '' ? <button type='button' onClick={() => this.scanButton()} className='scan-button pills'>Scan</button> : '' }
        </div>
        {this.state.loader ? <CustomLoader /> : false}
        <Toaster toastOptions={{ duration: 5000 }} />
      </>
    )
  }


}

export default Totoko;