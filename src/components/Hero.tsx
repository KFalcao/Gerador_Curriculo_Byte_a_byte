import React from "react";
import Particles from "./Particles";
import ComecarButton from "./UI/ComecarButton";

export default function Hero() {
  return (
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
        <ComecarButton
          onClick={() => {
            const form = document.getElementById("formulario");
            form?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Começar agora
        </ComecarButton>
      </div>
    </section>
  );
}
