import React, { useState } from "react";
import axios from "axios"
import { useForm } from "react-hook-form";
import "./styles_Form.css";
import { useEffect } from "react";
import contractAddresses from "../../constants/contractAddresses.json";
import abi from "../../constants/abi.json";
import Navbar from "./Navbar";
import { useWeb3Contract } from "react-moralis";
function Register() {
  const [selectedFile, setSelectedFile] = useState();
  const [hash, setHash] = useState('');
  const [stute, setStute] = useState(true);
  const addressOfContract =contractAddresses[1][0]
  const { register, handleSubmit, errors, reset } = useForm();
  const handleRegistration = (data) => {
    console.log(data);
    console.log(hash)
    setHash('')
 
    reset()
  }
  const changeHandler =async  (event) => {
    setSelectedFile(event.target.files[0]);
    
  };
  useEffect(()=>{
    
    console.log('hash change' + hash)
    setHash(hash);
  },[hash])
  useEffect(()=>{
    if(selectedFile!==undefined){
      console.log('gg')
      handleAddFileToIpfs()
    }
    
  },[selectedFile])

  const handleAddFileToIpfs= async ()=>{
    const JWT = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmZWVlYmJiNi0yODg5LTQ3MjctYTUxZC0wYWU0YTgzMWJiMDgiLCJlbWFpbCI6ImhyenkwODY1MUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZTY0NTIyMGMyNWQ4ZTk5NTc0NmUiLCJzY29wZWRLZXlTZWNyZXQiOiI1MmY2YWE0N2I4ZjljZTUwYmJmNWVmYjAzNTU5ZjIwNjRlYmRhNjBlNjU4MDI4OTFkN2Y1NDc1Yjc4OGNmMzU3IiwiaWF0IjoxNjgzODIwMDczfQ.XijqjL81A0Ht3d8OATwpiGiJ24E9rA7_2fQd5iLBi2E`
    const formData = new FormData();
    console.log(selectedFile)
    
    formData.append('file', selectedFile)
    console.log(formData)
    
      console.log('enter')
      try{
      setStute(false)
    await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: JWT
        }

      }).then(async function (response) {
        console.log('success')
        setHash(prev =>response.data.IpfsHash);  
        console.log(hash) 
        setStute(true)  
          
      })
    }catch(errors){
      console.log(errors)
    }
    
  }
  // const { runContractFunction: mintRegisterCertificate,isLoading,isFetching, } = useWeb3Contract({
  //   abi: abi,
  //   contractAddress: addressOfContract,
  //   functionName: "mintRegisterCertificate",
  //   params: {vin:register.vin,vrb:register.vrb, uri:hash,owner:register.owner}
  // });
  return (
    <>
    <Navbar/>
    <div className="flex items-center justify-center bg-green  px-3 py-6">
    <form className="form-width mt-5 p-4 bg-slate-200 " onSubmit={handleSubmit(handleRegistration)} >
        <div><h1 className="text-3xl font-bold underline p-3"> Register Grey Cart</h1></div>
    <div className="flex justify-around items-center font-bold mt-2">
        <label className="w-1/4">Vin</label>
        <input className="leading-8 outline-none p-1 pl-2 border-color" name="vin" {...register('vin')} required/>
      </div>
      <div className="flex justify-around items-center font-bold mt-2">
      <label className="w-1/4">Vrp</label>
      <input className="leading-8 outline-none p-1 pl-2 border-color" name="vrp" {...register('vrp')} required/>
    </div>
      <div className="flex justify-around items-center font-bold mt-2">
      <label className="w-1/4">Owner</label>
      <input className="leading-8 outline-none p-1 pl-2 border-color" name="owner" {...register('owner')} required/>
    </div>
    <div className="flex items-center justify-center mt-3">
    <div className="shrink-0">
    <img className="h-16 w-16 object-cover rounded-full" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80" alt="Current profile photo" />
  </div>
  <label className="block">
   <span className="sr-only">Choose profile photo</span>
    <input type="file" onChange={changeHandler} className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "/>  
  </label>
    </div>
      <button className="font-bold text-lg mt-5 p-4 bg-gray-700 text-slate-200 w-60 rounded-full border-solid"  disabled={hash?0:1} >{stute?'register':'Wait get hash...'}</button>
    </form>
    </div>
    </>
  );
}
export default Register;