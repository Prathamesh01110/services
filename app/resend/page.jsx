'use client';

import { sendEmail } from './actions'
import React from 'react'

function page() {
  return (
    <div>
        <button onClick={sendEmail}>click here to send email</button>
    </div>
  )
}

export default page