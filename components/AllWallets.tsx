"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Alchemy, Network } from 'alchemy-sdk'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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

let number = localStorage.getItem("number");




export default function AllWallets({setaddresses,seedphrase,setbalances,addresses}) {
  
    const [isdev,setisdev] = React.useState(false)
    const [frameworks, setFramework] = React.useState([])
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("1")
  const [num,setnum] = React.useState(number);
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
    const connection = new Connection("https://api.testnet.solana.com", "confirmed");
    const publicKey = new PublicKey(addresses[1]);
    const signature = await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL);
  
    const latestBlockHash = await connection.getLatestBlockhash();
    await connection.confirmTransaction({
        signature: signature,
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      });
      toast({title:"Airdrop Successful!"})
     
 }catch{
    toast({title:"Airdrop Unsuccessful!"})

 }
   



}
React.useEffect( ()=>{
    setaddresses([]);
    setbalances({"eth":null, "sol":null});
    const seed =  mnemonicToSeedSync(seedphrase);
    const derivationPath = `m/44'/60'/${value}'/0'`;
     const hdNode = HDNodeWallet.fromSeed(seed);
     
     const child = hdNode.derivePath(derivationPath);
     const privateKey = child.privateKey;
     const wallet = new Wallet(privateKey);
  setaddresses([wallet.address]);
  const path = `m/44'/501'/${value}'/0'`;
            const derivedSeed = derivePath(path, seed.toString("hex")).key;
            const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            const keypair = Keypair.fromSecretKey(secret);
          
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
    <Button onClick={requestairdrop}>Request Airdrop</Button>
    </>
  )
}
