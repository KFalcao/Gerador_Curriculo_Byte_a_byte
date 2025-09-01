import { useState } from "react";
import Columns from "./components/Layout/Columns";
import ResumeForm from "./components/Form/ResumeForm";
import Hero from "./components/Hero";
import ResumePreview from "./components/Preview/ResumePreview";

export default function App() {
  const [resumo, setResumo] = useState("");
  return (
    <div
      className="w-screen min-h-screen flex flex-col"
      style={{
        background: `linear-gradient(180deg, #0A2248 0%, #0B2249 50%, #0A224A 75%, #092148 88%, #0A1F3C 100%)`,
      }}
    >
      <Hero />

      <section
        id="formulario"
        className="w-full min-h-screen px-6 py-16 flex justify-center items-start"
      >
        <Columns>
          <ResumeForm onResumoChange={setResumo} />
          <ResumePreview />
        </Columns>
      </section>
    </div>
  );
}
