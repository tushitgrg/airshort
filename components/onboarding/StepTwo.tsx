
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from '@radix-ui/react-label'
import { Textarea } from '../ui/textarea'
import { toast } from '../ui/use-toast'


const StepTwo = ({setcurrentStep,phrase,setphrase}) => {

  
  const verifyy =()=>{
   
  if(phrase.split(" ").length>=12 ){
   setcurrentStep(4)

  }
  else{
    toast({
      title: "Error",
      description: "Please Enter Correct Seed Phrase!",
    })
  }
  }
  return (
    <Card className="w-full max-w-sm p-7">
      <CardHeader>
        <CardTitle className="text-2xl">Enter the Seed Phrase</CardTitle>
        <CardDescription>
         Enter a 12/24 word Seed Phrase
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Label htmlFor='seedPhrase'>Enter your phrase</Label>
      <Textarea id='seedPhrase' value={phrase} onChange={(e)=>setphrase(e.currentTarget.value)}/>

      </CardContent>
      <CardFooter>
      <Button className="w-full" onClick={verifyy}>Import Wallet</Button>
      </CardFooter>
      
    </Card>
  )
}

export default StepTwo