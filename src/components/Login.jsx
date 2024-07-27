import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import Error from "./Error";
import * as Yup from 'yup'
import useFetch from "@/hooks/useFetch";
import { login } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context/context";

function Login() {
    const navigate = useNavigate()
    let [searchParams] = useSearchParams()
    const longLink = searchParams.get('createNew')

    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState({
        email : "",
        password : ""
    })
    const handleInputChange = (e)=>{
        const {name, value} = e.target;  // name->email/password
        setFormData((prevData)=>({
            ...prevData,
            [name] : value   // name->email/password
        }));
    }

    const {data, error, loading, fn:fnLogin} = useFetch(login, formData)
    const {fetchUser} = UrlState()
    useEffect(() => {
      // console.log(data);
      if(error === null && data){
        navigate(`/dashboard?${longLink ? `createNew=${longLink}` : "" }`)
        fetchUser()
      }
    
    }, [error, data])
    

    const handleLogin = async ()=>{
        setErrors({});
        try {
            const schema = Yup.object().shape({
                email : Yup.string().email("Invalid email").required("Email is required"),
                password : Yup.string().min(5, "Password must be at least 5 characters").required("Password is required")
            });

            await schema.validate(formData, {abortEarly: false})
            // api call
            await fnLogin()
        } catch (e) {
            const newErrors = {};
            e?.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
            });
            setErrors(newErrors);
        }
    }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to your account if you already have one</CardDescription>
          {error && <Error message={error.message}/>}
        </CardHeader>
        <CardContent className='space-y-2'>
          <div className='space-y-1'>
            <Input name='email' type='email' placeholder='Enter email' onChange={handleInputChange}/>
            {errors.email && <Error message={errors.email}/> }
          </div>
          <div className='space-y-1'>
            <Input name='password' type='password' placeholder='Enter password' onChange={handleInputChange}/>
            {errors.password && <Error message={errors.password}/>}
            
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleLogin}>
            {loading ? <BeatLoader size={10} color="green"/> : "Login"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
