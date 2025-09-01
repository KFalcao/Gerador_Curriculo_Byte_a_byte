import React, { useState } from "react";

export default function Columns({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full grid grid-cols-2 gap-8 md:grid-cols-2 min-h-screen">
      {children}
    </div>
  );
}
