"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Copy } from "lucide-react"
import { Alchemy, Network } from 'alchemy-sdk'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { FaKey } from "react-icons/fa";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { mnemonicToSeedSync } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import { derivePath } from "ed25519-hd-key";
import { Keypair,Connection, LAMPORTS_PER_SOL ,PublicKey} from "@solana/web3.js";
import nacl from "tweetnacl";
import axios from "axios";
import { Label } from "./ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "./ui/use-toast"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import bs58 from 'bs58'





export default function AllWallets({setaddresses,seedphrase,setbalances,addresses}) {
  let number = "1";
  const [num,setnum] = React.useState(number);
  const [privatek, setprivatek] = React.useState({"eth":null, "sol":null})
  React.useEffect(()=>{
     number = localStorage.getItem("number");
     if(number){
      setnum(number);
     }
  },[])
    const [isdev,setisdev] = React.useState(false)
    const [frameworks, setFramework] = React.useState([])
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("1")

  React.useEffect(()=>{
    localStorage.setItem("number",num)
  setFramework([]);
    if(num){
        for(let i =1; i<parseInt(num)+1;i++){
            setFramework((prev)=>[...prev,{
                value: `${i}`,
                label: "Wallet "+i,
              }])
  
        }
    }
    setValue(num);
    
},[num])

const requestairdrop =async ()=>{
   
 try{
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");
    const publicKey = new PublicKey(addresses[1]);
    const signature = await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL);
  
    const latestBlockHash = await connection.getLatestBlockhash();
    await connection.confirmTransaction({
        signature: signature,
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      });
      toast({title:"Airdrop Successful!"})
     
 }catch(error){
    toast({title:"Airdrop Unsuccessful!"})
console.log(error)
 }
   



}
React.useEffect( ()=>{
    setaddresses([]);
    setbalances({"eth":null, "sol":null});
    setprivatek({"eth":null, "sol":null});
    const seed =  mnemonicToSeedSync(seedphrase);
    const derivationPath = `m/44'/60'/${value}'/0'`;
     const hdNode = HDNodeWallet.fromSeed(seed);
     
     const child = hdNode.derivePath(derivationPath);
     const privateKey = child.privateKey;
     setprivatek((prev)=>({"eth":privateKey, "sol":prev.sol}))
    
     const wallet = new Wallet(privateKey);
  setaddresses([wallet.address]);
  const path = `m/44'/501'/${value}'/0'`;
            const derivedSeed = derivePath(path, seed.toString("hex")).key;
            const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            const keypair = Keypair.fromSecretKey(secret);
            setprivatek((prev)=>({"eth":prev.eth, "sol": bs58.encode(keypair.secretKey)}))
            setaddresses((prev)=>[...prev, keypair.publicKey.toBase58()]);

            const main = async () => {
                let config = {
                    apiKey: "soJtAgGmtBh4upUdcdIEbAor4gRYSF_6",
                    network: Network.ETH_MAINNET,
                  };
               
              
                  const alchemy = new Alchemy(config);
                const address = wallet.address;
              
                const balances = await alchemy.core.getTokenBalances(address);
                let hexString = balances.tokenBalances[0].tokenBalance;
                const trimmedHex = hexString.slice(2);

                const buffer = Buffer.from(trimmedHex, 'hex');
              
                const normalString = buffer.toString('utf8');
                setbalances((prev) => ({"eth":parseInt(hexString, 16), "sol":prev.sol}));
              
              };
            main();
          
let rpc;
if(!isdev){
    rpc = "https://solana-mainnet.g.alchemy.com/v2/soJtAgGmtBh4upUdcdIEbAor4gRYSF_6"; 
}else{
    rpc = "https://solana-devnet.g.alchemy.com/v2/soJtAgGmtBh4upUdcdIEbAor4gRYSF_6"; 
}
           // RPC URL for connecting with a Solana node
           let connection = new Connection(rpc, "confirmed");
    let fn = async     ()=>{
     let   val = await connection.getBalance(keypair.publicKey)
          
            setbalances((prev) => ({"eth":prev.eth, "sol":val/LAMPORTS_PER_SOL}));
           }
           fn();
         

},[value,isdev])

const addwallet = ()=>{
    setnum((prev)=> `${parseInt(prev) +1}`)
    

}

const copyy = (val)=>{
  navigator.clipboard.writeText(val);
  toast({title:"Copied Successfully!"})
}

  return (
    <>
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between bg-violet-500"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select Wallets..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-violet-500">
        <Command>
          <CommandInput placeholder="Select Wallets..." />
          <CommandList>
            <CommandEmpty>No Wallets found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                   
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}

<CommandItem key={Math.random()} value="add" onSelect={addwallet}> +Add Wallet </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>

    <div className="flex mt-5 mb-5 items-center space-x-2">
      <Switch id="dev-mode" checked={isdev} onCheckedChange={(e)=>setisdev((prev)=>!prev)} className="bg-violet-500"/>
      <Label htmlFor="dev-mode"> Solana DevNet </Label>
    
    </div>
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"><FaKey/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Private Keys</DialogTitle>
          <DialogDescription>
            
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" >
              Ethereum
            </Label>
            <Input
             type="password"
              
              defaultValue={privatek.eth}
              readOnly
            />
          </div>
          <Button onClick={()=>copyy(privatek.eth)} size="sm" className="px-3">
            <span className="sr-only">Private Keys</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>


        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" >
              Solana
            </Label>
            <Input
            type="password"
             
              defaultValue={privatek.sol}
              readOnly
            />
          </div>
          <Button onClick={()=>copyy(privatek.sol)} size="sm" className="px-3">
            <span className="sr-only">Private Keys</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    
    <Button className="ml-4" onClick={requestairdrop}>Request Airdrop</Button>
    </>
  )
}
