"use client";
import SetPin from "@/components/onboarding/setPin";
import ShowthePhrase from "@/components/onboarding/ShowthePhrase";
import StepOne from "@/components/onboarding/StepOne";
import StepTwo from "@/components/onboarding/StepTwo";
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
import { Label } from "@/components/ui/label"
import { useState } from "react";

import CryptoJs from 'crypto-js'
import { redirect } from "next/navigation";
export default function OnBoarding() {
  if (typeof window !== 'undefined') {
  if(localStorage.getItem('encryptedPhrase') && localStorage.getItem('number')) redirect('/dashboard');}
  const [currentStep, setcurrentStep] = useState(1);
  const [phrase, setphrase] = useState("");
  const [pass, setpass] = useState("");
  if(currentStep==1) return<StepOne setcurrentStep={setcurrentStep} ></StepOne>;
  if(currentStep==2) return <StepTwo setcurrentStep={setcurrentStep} phrase={phrase} setphrase={setphrase}></StepTwo>;
  if(currentStep==3) return <ShowthePhrase setcurrentStep={setcurrentStep} phrase={phrase} setphrase={setphrase}></ShowthePhrase>;
  if(currentStep==4) return <SetPin setcurrentStep={setcurrentStep} pass={pass} setpass ={setpass}></SetPin>
  if(currentStep==5){

    const encryptedPhrase = CryptoJs.AES.encrypt(phrase, pass).toString();
    if (typeof window !== 'undefined') {
    localStorage.setItem('encryptedPhrase', encryptedPhrase);
  
    localStorage.setItem('number', "1");
  }
  window.location.reload()
  
  }
  return (
   <>
<p>Loading....</p>
   </>
   
  )
}
