"use client";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "./ui/use-toast"
import { useEffect } from "react"



const GetPin = ({pass, setpass,checkPass,err}) => {
    const handle = ()=>{
if(pass.length>=6){
  checkPass();
}else{
    toast({title:"Enter atleast 6 Characters"})
}

        
    }

useEffect(()=>{
  if(err){
    toast({title:err})
  }
  },[err])
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
    <div className="inline-block max-w-lg text-center justify-center">
    <Card className="w-full max-w-sm p-7 " >
      <CardHeader>
        <CardTitle className="text-2xl">Enter Your Password!</CardTitle>
      
      </CardHeader>
      <CardContent className="grid gap-4 ">
     <Input type="password" value={pass} onChange={(e)=>setpass(e.currentTarget.value)}/>
    
      </CardContent>
      <CardFooter>
      <Button className="w-full" onClick={handle}>Enter</Button>
      </CardFooter>
    </Card>
    </div>
  </section>

  )
}

export default GetPin