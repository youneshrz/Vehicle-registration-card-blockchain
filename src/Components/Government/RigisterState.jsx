import React from "react";
import { useForm } from "react-hook-form";
import "../Employer/styles_Form.css";
import GONavbar from "./GONavbar";
import { ethers } from "ethers"
import contractAddresses from "../../constants/contractAddresses.json";
import abi from "../../constants/abi.json";
function Rigister_State() {

  const { register, handleSubmit, errors, reset } = useForm();
  const addressOfContract =contractAddresses[1][0]
  const handleRegistration =async (data) => {
    console.log(data)
    const role=ethers.utils.formatBytes32String(data.role);
    console.log(role)
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const contract = new ethers.Contract(addressOfContract, abi,signer)
  const mint = await contract.grantRole(ethers.utils.formatBytes32String(data.role),data.address)
  console.log(mint)
 
  reset()
    }
  return (
    <div>
        <GONavbar/>
    <div className="flex items-center justify-center bg-green  px-3 py-6">
    <form className="form-width mt-5 p-4 bg-slate-200  form_box2" onSubmit={handleSubmit(handleRegistration)} >
        <div><h1 className="text-3xl font-bold text-gray-700 p-3">ADD NEW ROLES</h1></div>
        <div className="flex justify-around items-center font-bold mt-2">
            <label className="w-1/4 uppercase text-left">ROLE</label>
            <select defaultValue="STATES" className="leading-8  outline-none p-1 pr-2 border-color w-52"  name="role" {...register('role')} required>
              <option   value="STATES">
                STATE
              </option>
              <option value="POLICE">
                POLICE
              </option>
              <option value="GENDARMERIE">
                GENDARMERIE
              </option>
              <option value="TAX">
                TAX
              </option>
              </select> 
        </div>
    <div className="flex justify-around items-center font-bold mt-2">
        <label className="w-1/4 text-left">ADDRESS</label>
        <input className="leading-8 outline-none p-1 pl-2 border-color" name="address" {...register('address')} required/>
      </div>
      <button className="font-bold text-lg mt-5 p-4 bg-gray-700 text-slate-200 w-60 rounded-full border-solid"  >register</button>
    </form>
    </div>
    </div>
  )
}
export default Rigister_State