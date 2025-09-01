import React from "react";
import Particles from "./components/Particles";
import Cols from "./components/Cols";

export default function App() {
  return (
    <div
      className="w-screen min-h-screen flex flex-col"
      style={{
        background: `linear-gradient(180deg, #0A2248 0%, #0B2249 50%, #0A224A 75%, #092148 88%, #0A1F3C 100%)`,
      }}
    >
      <section className="relative flex justify-center items-center h-screen">
        <div className="absolute inset-0">
          <Particles
            particleColors={["#0c499c", "#1c9fff", "#0066f7"]}
            particleCount={200}
            particleSpread={20}
            speed={0.2}
            particleBaseSize={800}
            moveParticlesOnHover={true}
            alphaParticles={true}
            disableRotation={false}
          />
        </div>
        <div className="relative flex flex-col justify-center items-center text-center">
          <h1 className="text-white font-semibold text-6xl mb-10">PROBY</h1>
          <p className="text-white font-medium-200 text-6xs mb-10 tracking-wider">
            Crie seu currículo de forma inteligente e profissional
          </p>
          <button
            className="
        btn-comecar 
        bg-transparent 
        cursor-pointer 
        text-white 
        px-4 py-2 
        border border-blue-200 
        rounded-lg 
        mt-10
        transition-all duration-300 ease-in-out
        hover:scale-105 hover:text-blue-300 hover:border-blue-300
        active:scale-110 active:text-blue-400 active:border-blue-400"
            onClick={() => {
              const form = document.getElementById("formulario");
              form?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Começar agora
          </button>
        </div>
      </section>

      <section
        id="formulario"
        className="w-full min-h-screen px-6 py-16 flex justify-center items-start"
      >
        <div className="w-full max-w-7xl grid grid-cols-2 gap-8 h-full">
          <Cols />
        </div>
      </section>
    </div>
  );
}
