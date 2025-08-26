# 📄 CV Builder AI

Este projeto é uma aplicação web fullstack desenvolvida com **React 19 + TypeScript + TailwindCSS v4 + OpenAI API + Vite**. A aplicação permite aos usuários criar currículos profissionais com preview instantâneo e melhorias por inteligência artificial. 

## 📌 Visão Geral

Este projeto faz parte das Aulas 31 e 34 do curso, onde foi proposto desenvolver uma aplicação completa com integração à API da OpenAI. A aplicação permite ao usuário criar um currículo personalizado, visualizar um preview em tempo real e receber sugestões de melhoria baseadas em inteligência artificial.

---

## 🎯 Objetivos Gerais  

Ao final do projeto, os participantes aprenderam a:  

- Desenvolver uma aplicação web **fullstack** moderna com React + TypeScript  
- Criar e organizar **componentes reutilizáveis** para formulários e preview  
- Integrar com APIs externas (ex: **OpenAI/Gemini**) para melhorias por IA  
- Implementar **validações em tempo real** nos formulários  
- Gerenciar estados de **loading, erro e feedback ao usuário**  
- Aplicar **boas práticas de UX/UI**, com layout split-screen otimizado para desktop  

---

## 📂 Estrutura do Projeto  

O projeto está estruturado de forma modular, priorizando organização e reutilização:  

```bash
cv-builder-ai/
├── src/
│   ├── App.tsx
│   ├── components/
│   │   ├── Layout/           # Estrutura da tela (Form + Preview)
│   │   ├── Form/             # Componentes do formulário (dados, skills, experiências)
│   │   ├── Preview/          # Componentes de preview do currículo
│   │   └── UI/               # Elementos de interface (spinners, toasts, errors)
│   ├── services/             # Integração com APIs (OpenAI/Gemini)
│   ├── hooks/                # Hooks customizados de estado e lógica
│   ├── utils/                # Funções auxiliares (validação, processamento de texto)
│   └── types/                # Definições de tipos e interfaces
└── index.css                 # Estilos globais com Tailwind
---

## 🧠 Conceitos Aplicados  

- **React 19 + TypeScript** → Desenvolvimento de componentes reutilizáveis e tipados  
- **TailwindCSS v4** → Estilização moderna e produtiva com layout Split-Screen (Form ↔ Preview)  
- **Gerenciamento de estado com hooks** → `useCVData`, `useAIEnhancement`, `useToast`  
- **Validação em tempo real** → Inputs controlados com feedback visual  
- **Integração com APIs externas (OpenAI/Gemini)** → Comunicação assíncrona com `fetch` + `async/await`  
- **UX aprimorada** → Preview instantâneo, loading spinners, skeleton screens e toasts  
- **Tratamento de erros robusto** → Error boundaries, retries automáticos e mensagens amigáveis  
- **Segurança** → Uso de variáveis de ambiente para API keys e validação segura de dados  
- **Performance** → `useCallback`, debouncing de chamadas e lazy loading de componentes  

---

## ⚙️ Configuração e Uso

### Pré-requisitos

- Um navegador moderno (Chrome, Firefox, Safari, Edge)
- Editor de código (VS Code recomendado)
- Git instalado na sua máquina
- Uma chave de API da [OpenAI](https://platform.openai.com/) ou do [Google AI Studio (Gemini)](https://aistudio.google.com/)

### 📋 Fluxo da Aplicação

1. O usuário acessa a aplicação no navegador  
2. Preenche o **formulário de dados pessoais** (nome, email, telefone, LinkedIn, resumo)  
3. Adiciona suas **habilidades** com nível de proficiência  
4. Cadastra suas **experiências profissionais** (empresa, cargo, período, descrição)  
5. Visualiza o **preview do currículo em tempo real** no lado direito da tela  
6. (Opcional) Clica nos botões de **IA ("Melhorar")** para aprimorar textos automaticamente  
7. A aplicação exibe o texto atualizado no preview instantaneamente  
8. (Opcional) O usuário pode exportar o currículo em **PDF profissional** (se implementado) 

---
