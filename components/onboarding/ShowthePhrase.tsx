
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/popover";
import { set } from "react-hook-form";
import { generateMnemonic } from 'bip39';

  

import { IoCopy } from "react-icons/io5";
import { useEffect } from "react";


const ShowthePhrase = ({setcurrentStep,phrase,setphrase}) => {
    useEffect(()=>{
      setphrase( generateMnemonic()) 
    },[])
  
    const copyy = ()=>{
        navigator.clipboard.writeText(phrase);
      
    }
    const handle = ()=>{
        setcurrentStep(4)
    }
  return (
    <Card className="w-full max-w-sm p-7">
      <CardHeader>
        <CardTitle className="text-2xl flex justify-between  align-bottom">Your SeedPhrase 
        <Popover placement="right">
      <PopoverTrigger>
    <Button onClick={copyy}> <IoCopy  className="hvr"  /></Button> 
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-small font-bold">Copied!</div>
        
        </div>
      </PopoverContent>
    </Popover>
          
            
            </CardTitle>
        <CardDescription className="text-danger-400">
       Save the Seed Phrase! Without it you can never recover your Wallet!
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex flex-wrap justify-center gap-4">
            {phrase.split(" ").map((val)=> <Button className="basis-1/12 bg-slate-600" key={Math.random()}>{val}</Button>)}
       
        
        </div>
     
      </CardContent>
      <CardFooter>
      <Button className="w-full" onClick={handle}> Next </Button>
  

      </CardFooter>
    </Card>
  )
}

export default ShowthePhrase