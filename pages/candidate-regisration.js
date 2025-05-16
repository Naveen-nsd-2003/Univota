/* import React,{useState,useEffect,useCallback,useContext} from "react"; 
import { useRouter } from "next/router"; 
import Dropzone, { useDropzone } from "react-dropzone"; 
import Image from "next/image"; 
 
//---internal imports 
import { VotingContext } from "../context/Voter"; 
import  Style  from "../styles/allowedVoter.module.css"; 
import  images  from "../assets"; 
import  Button from "../components/Button/Button"; 
import  Input  from "../components/Input/Input"; 
 
const CandidateRegistration =()=>{ 
  const [fileUrl, setFileUrl] = useState(null); 
  const [candidateForm, setCandidateForm] = useState({ 
    name:"", 
    address:"", 
    age:"", 
  }); 
 
  const router=useRouter(); 
  const 
{setCandidate,uploadToIPFSCandidate,candidateArray,getNewCandidate}=useContext
 (VotingContext); 
 
  //---------VOTERS IMAGE DROP 
 
  const onDrop =useCallback (async (acceptedFil)=>{ 
    const url =await uploadToIPFSCandidate(acceptedFil[0]); 
    setFileUrl(url); 
 
  },[uploadToIPFSCandidate]); 
 
  const {getRootProps,getInputProps}=useDropzone({ 
    onDrop, 
    accept:"image/*", 
    maxSize:5000000, 
 
  }); 
  useEffect(() => { 
    getNewCandidate(); 
   }, []) 
   
 
 console.log(fileUrl); 
 
  //----JSX PART 
 
   
    return ( 
    <div className={Style.createVoter}> 
      <div> 
        {!fileUrl && ( 
          <div className={Style.voterInfo}> 
            <img src={fileUrl} alt ="Voter Image" /> 
            <div className={Style.voterInfo_paragraph}> 
              <p> 
                Name: <span>&nbps;{candidateForm.name}</span> 
              </p> 
              <p> 
              Add: <span>&nbps;{candidateForm.address.slice(0,20)}</span> 
              </p> 
              <p> 
                age: <span>&nbps;{candidateForm.age}</span> 
              </p> 
            </div> 
          </div> 
        )} 
 
        { 
          !fileUrl && ( 
            <div className={Style.sideInfo}> 
              <div className={Style.sideInfo_box}> 
                <h4> Create Candidate For Voting </h4> 
                <p> 
                🛡️ Create a seamless and secure blockchain-powered voting 
experience! 🔒  
                </p> 
                <p className={Style.sideInfo_para} style={{ fontWeight: 'bold' 
}}>Contract Candidate</p> 
 
                <div className={Style.card}>  
                 {candidateArray.map((el,i)=>( 
                  <div key={i+1} className={Style.card_box}> 
 
                    <div className={Style.images}> 
                      <img src={el[3]} alt="profile photo"/> 
                    </div> 
 
                    <div className={Style.card_info}> 
                      <p>{el[1]} #{el[2].toNumber()}</p> 
                      <p>{el[0]}</p> 
                      <p>Address:{el[6].slice(0,10)}..</p> 
 
                    </div> 
                  </div> 
                ))}  
                </div> 
              </div> 
            </div> 
          )} 
 
      </div> 
      <div className={Style.voter}> 
        <div className={Style.voter__container}> 
          <h1> Create New Candidate</h1> 
          <div className={Style.voter__container__box}> 
            <div className={Style.voter__container__box__div}> 
              <div {...getRootProps()}> 
                <input{...getInputProps()}/> 
                <div className={Style.voter__container__box__div__info}> 
                  <p>📤 Upload your file: JPG, PNG, GIF, WEBM (Max 10MB) 
�
�</p> 
 
                  <div className={Style.voter__container__box__div__image}> 
                    <Image src={images.upload} width={150} height={150} 
objectFit="contain" alt=" file upload"/> 
                  </div> 
                  <p>🖱️ Drop your file here,</p> 
                  <p>or 📲 Browse your device’s media! 📸</p> 
 
                </div> 
              </div> 
            </div> 
          </div> 
        </div> 
        <div className={Style.input__cointainer}> 
          <Input 
           inputType="text" 
           title="Name"  
           placeholder='Voter Name' 
            handleClick={(e)=> 
setCandidateForm({...candidateForm,name:e.target.value}) 
            } 
            /> 
            <Input 
           inputType="text" 
           title="Address"  
           placeholder='Voter Address' 
            handleClick={(e)=> 
setCandidateForm({...candidateForm,address:e.target.value}) 
            } 
            /> 
            <Input 
           inputType="text" 
           title="Age"  
           placeholder='Voter age' 
            handleClick={(e)=> 
setCandidateForm({...candidateForm,age:e.target.value}) 
            } 
            /> 
            <div className={Style.Button}> 
              <Button btnName="Authorized Candidate" 
handleClick={()=>setCandidate(candidateForm,fileUrl,router)}/> 
            </div> 
        </div> 
      </div> 
      <div className={Style.createVoter}> 
        <div className={Style.createVoter__info}> 
          <Image src={images.upload} alt="user profile" width={100} 
height={100}/> 
          <p><strong>Notice For User</strong></p> 
          <p><strong>Organizer</strong> <span>0x939939..</span></p> 
          <p><strong>⚠️ Only the organizer of the voting contract can create 
voters for the voting election ⚖️</strong></p> 
 
        </div> 
      </div> 
 
    </div> 
  ); 
  }; 
 
  
export default CandidateRegistration;  */

/* import React, { useState, useCallback, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

import { VotingContext } from "../context/Voter";
import Style from "../styles/candidateRegistration.module.css";
import uploadImg from "../assets/upload.png";
import Button from "../components/Button/Button";

const CandidateRegistration = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({ name: "", address: "", age: "" });
  
  const router = useRouter();
  const { setCandidate, uploadToIPFSCandidate, candidateArray, getNewCandidate } = useContext(VotingContext);

  const onDrop = useCallback(async (acceptedFile) => {
    const url = await uploadToIPFSCandidate(acceptedFile[0]);
    setFileUrl(url);
  }, [uploadToIPFSCandidate]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });

  useEffect(() => {
    getNewCandidate();
  }, []);

  return (
    <div className={Style.candidateContainer}>
      <h2 className={Style.header}>Candidate Registration</h2>

      
      <div className={Style.formSection}>
        <div className={Style.inputGroup}>
          <label>Candidate Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            value={formInput.name}
            onChange={(e) => setFormInput({ ...formInput, name: e.target.value })}
          />
        </div>

        <div className={Style.inputGroup}>
          <label>Wallet Address</label>
          <input
            type="text"
            placeholder="Enter Blockchain Address"
            value={formInput.address}
            onChange={(e) => setFormInput({ ...formInput, address: e.target.value })}
          />
        </div>

        <div className={Style.inputGroup}>
          <label>Party Name</label>
          <input
            type="text"
            placeholder="Enter Party Name"
            value={formInput.age}
            onChange={(e) => setFormInput({ ...formInput, age: e.target.value })}
          />
        </div>

       
        <div {...getRootProps()} className={Style.imageUploadBox}>
          <input {...getInputProps()} />
          <div>
            <Image src={uploadImg} alt="upload" width={80} height={80} />
            <p>Click or drop candidate image</p>
          </div>
        </div>

        
        {fileUrl && (
          <div className={Style.imagePreview}>
            <img src={fileUrl} alt="Candidate" />
            <p>{formInput.name}</p>
          </div>
        )}

        <div className={Style.buttonSection}>
          <Button btnName="Authorize Candidate" handleClick={() => setCandidate(formInput, fileUrl, router)} />
        </div>
      </div>

      
      <div className={Style.cardGrid}>
        {candidateArray.map((el, i) => (
          <div key={i} className={Style.cardItem}>
            <img src={el[3]} alt="candidate" />
            <h4>{el[1]} #{el[2].toNumber()}</h4>
            <p><strong>Party Name:</strong> {el[0]}</p>
            <p><strong>Address:</strong> {el[6].slice(0, 15)}...</p>
          </div>
        ))}
      </div>

      
      <div className={Style.noticeBox}>
        <strong>Note:</strong> Only the <b>Organizer</b> can register candidates for the election.
      </div>
    </div>
  );
};

export default CandidateRegistration; */


import React, { useState, useCallback, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

import { VotingContext } from "../context/Voter";
import Style from "../styles/candidateRegistration.module.css";
import uploadImg from "../assets/upload.png";
import Button from "../components/Button/Button";

const CandidateRegistration = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({ name: "", address: "", age: "" });

  const router = useRouter();
  const { setCandidate, uploadToIPFSCandidate, candidateArray, getNewCandidate } = useContext(VotingContext);

  const onDrop = useCallback(async (acceptedFile) => {
    const url = await uploadToIPFSCandidate(acceptedFile[0]);
    setFileUrl(url);
  }, [uploadToIPFSCandidate]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });

  useEffect(() => {
    getNewCandidate();
  }, []);

  return (
    <div className={Style.container}>
      <div className={Style.wrapper}>
        <div className={Style.titleSection}>
          <h1 className={Style.portalTitle}>Tamil Nadu Government</h1>
          <h2 className={Style.pageTitle}>Candidate Enrollment Portal</h2>
        </div>

        <div className={Style.contentGrid}>
          {/* ==== Left: Registration Form ==== */}
          <div className={Style.formBox}>
            <h3 className={Style.subHeader}>Register a New Candidate</h3>

            <div className={Style.inputGroup}>
              <label>Candidate Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                value={formInput.name}
                onChange={(e) => setFormInput({ ...formInput, name: e.target.value })}
              />
            </div>

            <div className={Style.inputGroup}>
              <label>Wallet Address</label>
              <input
                type="text"
                placeholder="Enter Blockchain Address"
                value={formInput.address}
                onChange={(e) => setFormInput({ ...formInput, address: e.target.value })}
              />
            </div>

            <div className={Style.inputGroup}>
              <label>Party Name</label>
              <input
                type="text"
                placeholder="Enter Party Name"
                value={formInput.age}
                onChange={(e) => setFormInput({ ...formInput, age: e.target.value })}
              />
            </div>

            {/* Image Upload */}
            <div {...getRootProps()} className={Style.imageUploadBox}>
              <input {...getInputProps()} />
              <div>
                <Image src={uploadImg} alt="upload" width={80} height={80} />
                <p>Click or drop candidate image</p>
              </div>
            </div>

            {/* Preview */}
            {fileUrl && (
              <div className={Style.imagePreview}>
                <img src={fileUrl} alt="Candidate" />
                <p>{formInput.name}</p>
              </div>
            )}

            <div className={Style.buttonSection}>
              <Button btnName="Authorize Candidate" handleClick={() => setCandidate(formInput, fileUrl, router)} />
            </div>
          </div>

          {/* ==== Right: Candidate Cards ==== */}
          <div className={Style.cardListBox}>
            <h3 className={Style.subHeader}>Authorized Candidates</h3>
            <div className={Style.cardGrid}>
              {candidateArray.map((el, i) => (
                <div key={i} className={Style.cardItem}>
                  <img src={el[3]} alt="candidate" />
                  <div className={Style.cardInfo}>
                    <h4>{el[1]} #{el[2].toNumber()}</h4>
                    <p><strong>Party Name:</strong> {el[0]}</p>
                    <p><strong>Address:</strong> {el[6].slice(0, 15)}...</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={Style.noticeBox}>
          <strong>Note:</strong> Only the <b>Organizer</b> can register candidates for the election.
        </div>
      </div>
    </div>
  );
};

export default CandidateRegistration;
