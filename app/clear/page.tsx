"use client";
import React from 'react'

const Page = () => {
    if(typeof window !== 'undefined') {
        localStorage.removeItem('encryptedPhrase');
        localStorage.removeItem('number');
      
        }
  return (
 <>
 Cleared!
 </>
  )
}

export default Page