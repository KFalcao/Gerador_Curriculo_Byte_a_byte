import React, { useState } from "react";

export default function ResumeForm({
  onResumoChange,
}: {
  onResumoChange: (value: string) => void;
}) {
  const [resumo, setResumo] = useState("");

  const handleResumoChange = (value: string) => {
    setResumo(value);
    onResumoChange(value);
  };

  return (
    <>
      <div className="bg-blue-500 min-h-screen flex items-start justify-center p-8">
        <div className="w-full max-w-md text-white">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Dados Pessoais
          </h2>

          <form className="flex flex-col gap-4">
            <div>
              <label className="block mb-1 text-sm">Nome</label>
              <input
                type="text"
                placeholder="Digite seu nome"
                className="w-full px-3 py-2 rounded-md text-black"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Email</label>
              <input
                type="email"
                placeholder="Digite seu email"
                className="w-full px-3 py-2 rounded-md text-black"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Telefone</label>
              <input
                type="tel"
                placeholder="Digite seu telefone"
                className="w-full px-3 py-2 rounded-md text-black"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">LinkedIn</label>
              <input
                type="url"
                placeholder="URL do seu LinkedIn"
                className="w-full px-3 py-2 rounded-md text-black"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Resumo Profissional</label>
              <textarea
                rows={4}
                placeholder="Digite um breve resumo"
                value={resumo}
                onChange={(e) => handleResumoChange(e.target.value)}
                maxLength={500}
                className="w-full px-3 py-2 rounded-md text-black"
              />
              <p className="text-right text-xs mt-1">
                {resumo.length} / 500 caracteres
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
