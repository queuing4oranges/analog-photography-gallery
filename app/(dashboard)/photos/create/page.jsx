import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function AddPhoto() {
  return (
    <main>
        <h2>Add a new photo</h2>
        <CreateForm />
    </main>
  )
}
