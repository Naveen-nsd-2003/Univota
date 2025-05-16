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
 
const AllowedVoter =()=>{ 
  const [fileUrl, setFileUrl] = useState(null); 
  const [formInput, setFormInput] = useState({ 
    name:"", 
    address:"", 
    position:"", 
  }); 
 
  const router=useRouter(); 
  const 
{uploadToIPFS,createVoter,voterArray,getAllVoterData}=useContext(VotingContext
 ); 
 
  //---------VOTERS IMAGE DROP 
 
  const onDrop =useCallback (async (acceptedFil)=>{ 
    const url =await uploadToIPFS(acceptedFil[0]); 
    setFileUrl(url); 
 
  },[uploadToIPFS]);                        // changed here 
 
  const {getRootProps,getInputProps}=useDropzone({ 
    onDrop, 
    accept:"image/*", 
    maxSize:5000000, 
 
  }); 
  useEffect(() => { 
    getAllVoterData(); 
   
    
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
                Name: <span>&nbps;{formInput.name}</span> 
              </p> 
              <p> 
              Add: <span>&nbps;{formInput.address.slice(0,20)}</span> 
              </p> 
              <p> 
                Pos:<span>&nbps;{formInput.position}</span> 
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
                 {voterArray.map((el,i)=>( 
                  <div key={i+1} className={Style.card_box}> 
 
                    <div className={Style.images}> 
                    <img src={el[4]} alt="profile photo" style={{ width: 
'150px', height: '150px', objectFit: 'cover' }} /> 
                    </div> 
 
                    <div className={Style.card_info}> 
                      <p>Name: {el[1]}</p> 
                      <p>Address: {el[3].slice(0,10)}..</p> 
 
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
          <h1> Create New Voter</h1> 
          <div className={Style.voter__container__box}> 
            <div className={Style.voter__container__box__div}> 
              <div {...getRootProps()}> 
                <input{...getInputProps()} /> 
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
setFormInput({...formInput,name:e.target.value}) 
            } 
            /> 
            <Input 
           inputType="text" 
           title="Address"  
           placeholder='Voter Address' 
            handleClick={(e)=> 
setFormInput({...formInput,address:e.target.value}) 
            } 
            /> 
            <Input 
           inputType="text" 
           title="position"  
           placeholder='Voter position' 
            handleClick={(e)=> 
setFormInput({...formInput,position:e.target.value}) 
            } 
            /> 
            <div className={Style.Button}> 
              <Button btnName="Authorized Voter" 
handleClick={()=>createVoter(formInput,fileUrl,router)}/> 
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
 
  
export default AllowedVoter;  */




import React, { useState, useEffect, useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/router";
import Image from "next/image";

// INTERNAL IMPORT
import { VotingContext } from "../context/Voter";
import Style from "../styles/allowedVoter.module.css";
import uploadImg from "../assets/upload.png";
import Button from "../components/Button/Button";

const AllowedVoter = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({
    name: "",
    address: "",
    position: ""
  });

  const router = useRouter();
  const { uploadToIPFS, createVoter, voterArray, getAllVoterData } = useContext(VotingContext);

  const onDrop = useCallback(async (acceptedFile) => {
    const url = await uploadToIPFS(acceptedFile[0]);
    setFileUrl(url);
  }, [uploadToIPFS]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });

  useEffect(() => {
    getAllVoterData();
  }, []);

  return (
    <div className={Style.voterPage}>
      {/* Top Section */}
      <div className={Style.topSection}>
        {/* Registration Form */}
        <div className={Style.formCard}>
          <h2>Voter Registration</h2>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setFormInput({ ...formInput, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Address"
            onChange={(e) => setFormInput({ ...formInput, address: e.target.value })}
          />
          <input
            type="text"
            placeholder="Age"
            onChange={(e) => setFormInput({ ...formInput, position: e.target.value })}
          />

          <div {...getRootProps()} className={Style.uploadBox}>
            <input {...getInputProps()} />
            <Image src={uploadImg} alt="upload" width={40} height={40} />
            <p>Upload Image</p>
          </div>

          <button onClick={() => createVoter(formInput, fileUrl, router)}>
            Register
          </button>
        </div>

        {/* Right Content */}
        <div className={Style.infoBox}>
          <h3>Secure your vote with blockchain technology</h3>
          <p>
            Blockchain-based voting ensures that each vote is immutable and verifiable,
            providing a robust foundation for transparent and fair elections.
          </p>
        </div>
      </div>

      {/* Registered Voters */}
      <h3 className={Style.sectionTitle}>Registered Voters</h3>
      <div className={Style.cardGrid}>
        {voterArray.map((el, i) => (
          <div key={i} className={Style.cardItem}>
            <img src={el[4]} alt="Voter" />

            <h4>{el[1]} </h4>{/* #{el[2].toNumber ? el[2].toNumber():el[2]} */}
            <p><strong>Address:</strong> {el[3] ?.slice ? el[3].slice(0, 15):el[3]}...</p>
            <p><strong>Status:</strong> {el[6] ? "Voted" : "Not Voted"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllowedVoter;