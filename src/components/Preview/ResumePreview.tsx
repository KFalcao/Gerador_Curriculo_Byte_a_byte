import React from "react";

export default function ResumePreview({ resumo }: { resumo: string }) {
  return (
    <div className="bg-green-500 min-h-screen flex items-center justify-center p-8">
      <div className="text-white max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Preview</h2>
        <p className="text-lg">{resumo || "Seu resumo aparecerá aqui..."}</p>
      </div>
    </div>
  );
}
