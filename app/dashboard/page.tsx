"use client";
import Link from "next/link"
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea,ScrollBar } from "@/components/ui/scroll-area"
import { redirect } from "next/navigation";
import { ChartSol } from "@/components/ChartSol";
import { SiSolana } from "react-icons/si";
import { FaEthereum } from "react-icons/fa";
import {Snippet} from "@nextui-org/snippet";
import AllWallets from "@/components/AllWallets";
import { useState } from "react";
import GetPin from "@/components/getPin";
import CryptoJS from 'crypto-js'
import { Router } from "next/router";
export default function Dashboard() {
  const [pass,setpass] = useState("");
  const [err,setErr] = useState("");
  const [addresses, setaddresses] = useState([]);
  const [balances,setbalances] = useState({"eth":null, "sol":null})
  if (typeof window === 'undefined')return <h1>error</h1>;


  const checkPass = ()=>{
    let encryptedPhrase =""
    if (typeof window !== 'undefined') {
 encryptedPhrase =localStorage.getItem('encryptedPhrase')|| "";}
    let v;
    try{
      v = CryptoJS.AES.decrypt(encryptedPhrase, pass).toString(CryptoJS.enc.Utf8);
    
      if(v){
       
          sessionStorage.setItem('decryptedPhrase',v);
          window.location.reload()
        
     
      }else{
       
        setErr("InCorrect")
      }
    }catch(err){
        setErr("InCorrect")
    }
  }


    if(!localStorage.getItem('encryptedPhrase') || ! localStorage.getItem('number')) redirect('/onboarding');
    if(!sessionStorage.getItem('decryptedPhrase')){
return <GetPin pass={pass} setpass={setpass} err={err} checkPass={checkPass} />
    }else{

    
  return (
    <div className="flex max-h-screen w-full flex-col">
   
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Actions
              </CardTitle>
            <DollarSign></DollarSign>
            </CardHeader>
            <CardContent>
                <AllWallets setaddresses={setaddresses} seedphrase={sessionStorage.getItem('decryptedPhrase')} setbalances={setbalances} addresses={addresses}/>
           
           
            
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Balance
              </CardTitle>
            <DollarSign></DollarSign>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex gap-3 mb-3 mt-3"><FaEthereum /> {balances.eth}</div>
              <div className="text-2xl font-bold flex gap-3"><SiSolana />{balances.sol}</div>
            
            </CardContent>
          </Card>
         
        
          <Card x-chunk="dashboard-01-chunk-2" className="lg:min-w-max sm:w-auto w-auto overflow-scroll">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Public Keys</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent >
                <div className="mb-3 mt-3">  <Snippet symbol={<FaEthereum />}  color="success">{addresses[0]}</Snippet></div>
          <div> <Snippet symbol={<SiSolana />} color="primary">{addresses[1]}</Snippet></div>
           
              {/* <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p> */}
            </CardContent>
          </Card>

        
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">

          <Card
            className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
          >

            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Transactions</CardTitle>
                <CardDescription>
                  Recent transactions you made.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="#">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
            <ScrollArea className="h-[300px]  " >
No Transaction Right Now!
              {/* <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden xl:table-column">
                      Type
                    </TableHead>
                    <TableHead className="hidden xl:table-column">
                      Status
                    </TableHead>
                    <TableHead className="hidden xl:table-column">
                      Date
                    </TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Liam Johnson</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        liam@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      Sale
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-23
                    </TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Liam Johnson</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        liam@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      Sale
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-23
                    </TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Olivia Smith</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        olivia@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      Refund
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Declined
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-24
                    </TableCell>
                    <TableCell className="text-right">$150.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Noah Williams</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        noah@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      Subscription
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-25
                    </TableCell>
                    <TableCell className="text-right">$350.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Emma Brown</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        emma@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      Sale
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-26
                    </TableCell>
                    <TableCell className="text-right">$450.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Liam Johnson</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        liam@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      Sale
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-27
                    </TableCell>
                    <TableCell className="text-right">$550.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table> */}
              <ScrollBar orientation="vertical" />
              </ScrollArea>
            </CardContent>
        
          </Card>
          <ChartSol/>
      
        </div>
      </main>
    </div>
  )}
}
