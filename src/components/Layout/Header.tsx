import { useEffect, useState } from "react";
import { FiCheckCircle, FiKey } from "react-icons/fi";

interface HeaderProps {
  onApiKeyChange: (key: string | null) => void;
  currentKey?: string | null;
}

const Header = ({ onApiKeyChange, currentKey }: HeaderProps) => {
  const [apiKey, setApiKey] = useState(currentKey || "");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "warning" | "error" | "">("");
  const [aiActive, setAiActive] = useState(!!currentKey);

  const validateApiKey = async () => {
    if (!apiKey) {
      setMessage("Por favor, insira a API Key.");
      setMessageType("warning");
      setAiActive(false);
      onApiKeyChange(null);
      return;
    }

    try {
      // teste simples de validação
      const response = await fetch("https://api.openai.com/v1/models", {
        headers: { Authorization: `Bearer ${apiKey}` },
      });

      if (response.ok) {
        setMessage("API Key válida!");
        setMessageType("success");
        setAiActive(true);
        onApiKeyChange(apiKey);
      } else {
        setMessage("API Key inválida.");
        setMessageType("error");
        setAiActive(false);
        onApiKeyChange(null);
      }
    } catch {
      setMessage("Erro ao validar a API Key.");
      setMessageType("error");
      setAiActive(false);
      onApiKeyChange(null);
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <>
      {message && (
        <div className={`fixed top-0 left-0 w-full text-center py-3 px-4 font-medium text-white z-50 ${
          messageType === "success"
            ? "bg-green-700"
            : messageType === "warning"
            ? "bg-yellow-700"
            : "bg-red-900"
        }`}>
          {message}
        </div>
      )}

      <header className="w-full bg-white shadow-sm border-b flex items-center justify-between px-6 py-3">
        <div>
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            Gerador de Currículos
          </h1>
          <p className="text-sm text-gray-500">
            Gerador inteligente de currículos com IA
          </p>
        </div>

        <div className="flex items-center gap-2 ml-auto mr-18">
          Configurar IA: 
          <div className="relative flex items-center">
            <FiKey className="absolute left-3 text-gray-500" size={20} />
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Cole sua API Key"
              className="block w-full rounded-md bg-(--form-field-bg-color) pl-10 pr-8 py-1.5 text-base text-(--form-text-color) outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-(--form-field-border-color) sm:text-sm/6 border"
            />
            {aiActive && (
              <button
                onClick={() => {
                  setApiKey("");
                  setAiActive(false);
                  setMessage("API Key removida - IA desabilitada");
                  setMessageType("error");
                  onApiKeyChange(null);
                }}
                className="absolute right-2 text-gray-600 hover:text-red-700"
              >
                ✕
              </button>
            )}
          </div>

          {aiActive && (
            <span className="flex items-center gap-1 text-green-700 font-medium ml-4 mr-6 whitespace-nowrap">
              <FiCheckCircle size={18} /> IA Ativa
            </span>
          )}

          <button
            onClick={validateApiKey}
            className="rounded-md bg-[var(--button-add-skill-bg-color)] border border-[var(--button-add-skill-border-color)] px-3 py-2 text-sm font-semibold text-[var(--form-text-color)] hover:scale-105"
          >
            Enviar
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;