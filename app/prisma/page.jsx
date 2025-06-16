'use client';
import React from 'react'
import createUser from './actions';

function PrismaClientPage() {
  async function submit(){
    await createUser();
  }
  return (
    <div>
        <button onClick={submit}>add in Database</button>
    </div>
  )
}

export default PrismaClientPage