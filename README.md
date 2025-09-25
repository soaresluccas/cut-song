<div align="center">
  
  <h1>🎵 Cut Song</h1>
  <p><strong>Corte de áudio simples, rápido e moderno</strong></p>
  
  <p>
    <em>SaaS/Micro-SaaS para recortar trechos de áudio: faça upload, defina o intervalo e baixe o resultado.</em>
  </p>
  
  <p>
    <img src="https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white" alt="Node.js"/>
    <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white" alt="TypeScript"/>
    <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" alt="React"/>
    <img src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white" alt="Vite"/>
    <img src="https://img.shields.io/badge/FFmpeg-static-FF6C37" alt="FFmpeg"/>
  </p>
  
</div>

---

## ✨ Visão Geral

O Cut Song é um projeto full-stack composto por:

- API em Node.js + TypeScript (Express, Multer, Fluent-FFmpeg/ffmpeg-static)
- Front-end em React + Vite + Tailwind CSS

Ele oferece um fluxo direto: upload do arquivo, escolha do intervalo (HH:MM:SS), processamento com FFmpeg e download do trecho gerado.

## 🧩 Principais Recursos
- Upload de arquivos de áudio com validação básica (tamanho/formato)
- Seleção de tempo com validação em HH:MM:SS e atalhos rápidos
- Processamento via FFmpeg com geração de arquivo temporário
- Download direto do áudio processado (streaming)
- CORS configurado para rodar API e front em portas diferentes

## 🏗️ Arquitetura (high-level)
```
Front-end (React + Vite)
  └── Upload + Form (start/end) → POST /audio/cut → Download do arquivo

API (Express + TypeScript)
  ├── Controller: recebe multipart + valida query
  ├── UseCase: orquestra corte
  ├── Providers: FFmpeg (corte) + Storage temporário
  └── Stream de resposta + limpeza de arquivos
```

## 🚀 Demo Local Rápida

1) API (porta 3000)
```cmd
cmd /c npm install
cmd /c npm run dev
```

2) Front-end (porta 5173)
```cmd
cmd /c "cd front-end && npm install"
cmd /c "cd front-end && npm run dev"
```

URL: http://localhost:5173

## 🔌 Endpoint Principal

POST `/audio/cut`

- multipart/form-data: `file`
- query: `start` (HH:MM:SS ou segundos), `end` (HH:MM:SS ou segundos), `outputExtension` (opcional)
- resposta: stream do áudio cortado (Content-Type dinâmico)

## 🧱 Stack Técnica
- Back-end: Node.js, Express, TypeScript, Multer, Fluent-FFmpeg, ffmpeg-static
- Front-end: React, Vite, Tailwind CSS
- Qualidade: Jest (unitário), ESLint, Prettier

## 🗺️ Roadmap
- Barra de progresso e estado do processamento
- Visualização do áudio (waveform) para seleção precisa
- Suporte a múltiplos formatos de saída e presets
- Deploy com Docker e CI/CD
- Integração com S3/link temporário

## 📄 Licença
Este projeto é distribuído sob a licença MIT.

---

Feito com ❤️ usando Node.js, TypeScript, React e Tailwind.
