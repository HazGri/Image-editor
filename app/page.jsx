"use client";

import { useState } from "react";
import { ImageInput } from "./composants/ImageInput";

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row justify-center items-center m-auto max-w-4xl  gap-8 min-h-full">
      <ImageInput />
    </main>
  );
}
