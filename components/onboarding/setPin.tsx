
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
import { toast } from "../ui/use-toast"



const SetPin = ({setcurrentStep,pass, setpass}) => {
    const handle = ()=>{
if(pass.length>=6){
    setcurrentStep(5)
}else{
    toast({title:"Enter atleast 6 Characters"})
}
        
    }
  return (
    <Card className="w-full max-w-sm p-7 " >
      <CardHeader>
        <CardTitle className="text-2xl">Set a Password!</CardTitle>
        <CardDescription>
       This is a Local Password, which you can use to access your Wallet
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 ">
     <Input type="password" value={pass} onChange={(e)=>setpass(e.currentTarget.value)}/>
    
      </CardContent>
      <CardFooter>
      <Button className="w-full" onClick={handle}>Save</Button>
      </CardFooter>
    </Card>
  )
}

export default SetPin