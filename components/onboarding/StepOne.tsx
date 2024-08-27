
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const StepOne = ({setcurrentStep}) => {
const handle = (v)=>{
    setcurrentStep(v)
}
  return (
    <Card className="w-full max-w-sm p-7">
      <CardHeader>
        <CardTitle className="text-2xl">Connect Your Wallet</CardTitle>
        <CardDescription>
         Choose One of the following
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
      <Button onClick={()=>handle(3)}>Create a Fresh Wallet</Button>
      <Button onClick={()=>handle(2)} className="w-full">Import Wallet</Button>
      </CardContent>
      
    </Card>
  )
}

export default StepOne