import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import logo from "../assets/logo.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";

function Landing() {
  const [longURL, setLongURL] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log('clicked');
    if(longURL){
      console.log('clicked');
      navigate(`/auth?createNew=${longURL}`)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-primary text-center font-extrabold">
        Annoyed of those lengthy URL's? <br /> Just shortn it! 🤷‍♀️
      </h2>
      <form onSubmit={handleSubmit} className="sm:h-12 flex flex-col sm:flex-row w-full md:w-2/4 gap-2">
        <Input
          value={longURL}
          onChange={(e)=>setLongURL(e.target.value)}
          type="url"
          placeholder="Enter your url"
          className="h-full flex-1 py-4 px-4"
        />
        <Button className="h-full" type="submit">
          Shortn!
        </Button>
      </form>

      <img src={logo} alt="" className=" my-11 md:px-11" />
      
    </div>
  );
}

export default Landing;
