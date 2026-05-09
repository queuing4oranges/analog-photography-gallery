"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CreateForm from "./CreateForm";

export default function AddPhoto() {
  return (
    <main>
      <CreateForm />
    </main>
  );
}
