import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { setLoading } from "@/redux/authSlice";
import { useEffect } from "react";
export default function signup() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const dispatch=useDispatch();
  const {loading,user}=useSelector(store=>store.auth)
const navigate=useNavigate();


  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    //api call to signup endpoint
    const formData=new FormData();
    formData.append("fullname",input.fullname);
    formData.append("email",input.email);
    formData.append("phoneNumber",input.phoneNumber);
    formData.append("password",input.password);
    formData.append("role",input.role);
    if(input.file){
      formData.append("file",input.file);
    }

   try {
    dispatch(setLoading(true));

    const res=await axios.post(`${USER_API_END_POINT}/register`,formData,{
     headers:{
       "Content-Type": "multipart/form-data"
     },
     withCredentials:true,
    });
    if(res.data.success){
      toast.success(res.data.message);
      navigate('/login');
    }
   } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
   }finally{
  dispatch(setLoading(false));
   }
  };
  useEffect(()=>{
    if(user){
        navigate("/");
    }
},[])

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto ">
        <form
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
          onSubmit={submitHandler}
        >
          <h1 className="font-bold text-xl mb-5">Signup</h1>
          <div>
            <Label>Full Name</Label>
            <Input
              className="border border-gray-300 focus:border-black focus:outline-none focus:ring-2 focus:ring-black w-full p-2 rounded-md"
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="patel"
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              className="border border-gray-300 focus:border-black focus:outline-none focus:ring-2 focus:ring-black w-full p-2 rounded-md"
              type="email"
              id="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="aj436@gmail.com"
            />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input
              className="border border-gray-300 focus:border-black focus:outline-none focus:ring-2 focus:ring-black w-full p-2 rounded-md"
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="9005241656"
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              className="border border-gray-300 focus:border-black focus:outline-none focus:ring-2 focus:ring-black w-full p-2 rounded-md"
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="1234"
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5 ">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  className="cursor-pointer"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  className="cursor-pointer"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gaap-2">
              <Label>Profile</Label>
              <Input
                type="file"
                id="profile"
                 name="file"
                accept="image/*"
                className="cursor-pointer"
                onChange={changeFileHandler}
              />
            </div>
          </div>
          {
loading ? <Button className="w-full my-4 bg-black text-white hover:bg-gray-900"><Loader2 className="mr-2 h-4  w-4 animate-spin"/>Please Wait</Button>:<Button
type="submit"
className="w-full my-4 bg-black text-white hover:bg-gray-900"
>
Signup
</Button>
}
          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}
