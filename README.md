# README - Chatbot com Next.js e Ollama

## Descrição do Projeto

Este projeto é um **chatbot** desenvolvido com **Next.js 15** que utiliza a API do **Ollama** para processamento de linguagem natural, permitindo interações em tempo real com qualquer modelo de IA disponível no Ollama (por padrão, configurado para `deepseek-r1`). A interface é responsiva, com uma janela de chat que exibe mensagens do usuário e do bot, suporte a streaming de respostas e um design moderno com Tailwind CSS. **Observação**: O histórico de mensagens não é salvo em um banco de dados ou armazenamento persistente; as mensagens são mantidas apenas em memória durante a sessão atual.

---

## Funcionalidades

- **Interface de Chat**: Exibe mensagens do usuário e do bot em balões de conversa, com timestamps.
- **Streaming de Respostas**: As respostas do bot são renderizadas em tempo real, à medida que o modelo Ollama gera o texto.
- **Componentização**: O projeto é modular, com componentes reutilizáveis como `ChatInput`, `ChatWindow`, `MessageBubble` e `LoadingDots`.
- **Configuração via `.env.local`**: Permite personalizar o nome do chatbot, o modelo Ollama (qualquer modelo disponível no Ollama) e a URL base editando o arquivo `.env.local`.
- **Estilização Moderna**: Usa Tailwind CSS para uma interface limpa e responsiva, com tema escuro.
- **Feedback de Carregamento**: Indicador visual de carregamento (`LoadingDots`) enquanto o bot processa a resposta.
- **Scroll Automático**: A janela de chat rola automaticamente para a última mensagem.

---

## Tecnologias Utilizadas

- **Next.js 15**: Framework React para construção da aplicação.
- **React**: Biblioteca para construção de interfaces de usuário.
- **TypeScript**: Para tipagem estática e maior robustez do código.
- **Tailwind CSS**: Para estilização da interface.
- **Ollama**: Plataforma de IA para processamento de linguagem natural.
- **Lucide React**: Ícones para a interface (ícone de envio).
- **Fetch API**: Para comunicação com a API do Ollama.

---

## Estrutura do Projeto

```
├── components/
│   ├── ChatInput.tsx        # Componente de entrada de texto
│   ├── ChatWindow.tsx       # Janela de exibição das mensagens
│   ├── MessageBubble.tsx    # Componente para balões de mensagens
│   ├── LoadingDots.tsx      # Indicador de carregamento
├── pages/
│   ├── index.tsx           # Página principal do chatbot
├── .env.local              # Configurações de ambiente
├── README.md               # Documentação do projeto
├── package.json            # Dependências e scripts
```

---

## Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **Ollama** instalado e rodando localmente (`http://localhost:11434`)
- Um modelo Ollama instalado (ex.: `deepseek-r1`, `llama3`, ou qualquer outro modelo compatível)
- **NPM** ou **Yarn** para gerenciamento de pacotes

---

## Instalação

1. **Clone o repositório**:
   ```bash
   git clone git@github.com:GaussNoob/Chatbot-com-Next.js-e-Ollama.git
   cd Chatbot-com-Next.js-e-Ollama
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure o arquivo `.env.local`**:
   Crie um arquivo `.env.local` na raiz do projeto e edite as variáveis para personalizar o nome do chatbot, o modelo Ollama e a URL base. Qualquer modelo disponível no Ollama pode ser usado, desde que configurado corretamente. Exemplo de configuração:
   ```env
   # Nome do Chatbot que aparecerá no cabeçalho
   NEXT_PUBLIC_CHATBOT_NAME="Chatbot com Deepseek-R1"
   # Nome do modelo Ollama a ser usado (qualquer modelo instalado no Ollama)
   OLLAMA_MODEL_NAME="deepseek-r1"
   # URL base do seu servidor Ollama (geralmente não muda)
   OLLAMA_BASE_URL="http://localhost:11434"
   ```

4. **Inicie o servidor Ollama**:
   Certifique-se de que o Ollama está rodando localmente e que o modelo especificado está instalado:
   ```bash
   ollama run <NOME_DO_MODELO>
   # Exemplo: ollama run deepseek-r1
   ```

5. **Inicie a aplicação**:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

6. Acesse a aplicação em `http://localhost:3000`.

---

## Como Usar

1. **Digite uma mensagem**: No campo de texto na parte inferior da interface, insira sua mensagem e pressione **Enter** ou clique no ícone de envio.
2. **Receba respostas**: O chatbot processará sua mensagem via API do Ollama e exibirá a resposta em tempo real na janela de chat.
3. **Visualize o histórico**: As mensagens do usuário e do bot são exibidas com timestamps, e a janela rola automaticamente para a última mensagem. **Nota**: O histórico de mensagens é temporário e será perdido ao recarregar a página.
4. **Feedback visual**: Durante o processamento, um indicador de carregamento (três pontos animados) aparece na interface.
5. **Personalização**: Edite o arquivo `.env.local` para alterar o nome do chatbot, o modelo Ollama (qualquer modelo instalado no Ollama) ou a URL base conforme necessário.

---

## Componentes

### 1. `ChatInput`
- **Função**: Permite ao usuário inserir mensagens e enviá-las ao chatbot.
- **Características**:
  - Campo de texto (`textarea`) com suporte a Enter para envio (sem Shift).
  - Botão de envio desativado durante o carregamento ou se o campo estiver vazio.
  - Estilizado com Tailwind CSS.

### 2. `ChatWindow`
- **Função**: Exibe o histórico de mensagens e o indicador de carregamento.
- **Características**:
  - Rola automaticamente para a última mensagem.
  - Usa `MessageBubble` para renderizar cada mensagem.
  - Suporta indicador de carregamento (`LoadingDots`) durante o processamento.

### 3. `MessageBubble`
- **Função**: Renderiza mensagens do usuário e do bot em balões estilizados.
- **Características**:
  - Estilização diferente瘤 para mensagens do usuário (azul) e do bot (cinza).
  - Exibe timestamp abaixo de cada mensagem.
  - Suporta conteúdo dinâmico via `children` (ex.: `LoadingDots`).

### 4. `LoadingDots`
- **Função**: Indicador visual de carregamento durante o processamento da resposta.
- **Características**:
  - Animação de pulsação com três pontos.
  - Estilizado com Tailwind CSS.

---

## Integração com Ollama

- A aplicação faz chamadas à API do Ollama (`/api/chat`) usando `fetch` com método `POST`.
- As respostas do Ollama são processadas em tempo real via streaming (`ReadableStream`).
- Erros são capturados e exibidos como mensagens de erro na interface.

---

## Estilização

- **Tema Escuro**: Usa cores escuras (cinza e azul) para uma interface moderna.
- **Responsividade**: Layout flexível que se adapta a diferentes tamanhos de tela.
- **Sombras e Bordas**: Adicionam profundidade visual aos componentes.
- **Transições**: Efeitos suaves no botão de envio e no campo de texto.

---

## Possíveis Melhorias

- **Persistência de Dados**: Adicionar suporte a armazenamento de mensagens em um banco de dados ou `localStorage` para manter o histórico entre sessões.
- **Autenticação de Usuário**: Implementar login para histórico persistente.
- **Suporte a Múltiplos Modelos**: Permitir seleção de diferentes modelos Ollama diretamente na interface.
- **Modo Claro/Escuro**: Adicionar alternância de temas.
- **Suporte a Imagens**: Permitir envio e exibição de imagens no chat.
- **Testes Unitários**: Implementar testes com Jest ou Testing Library.

---

## Solução de Problemas

- **Erro "Modelo não encontrado"**: Certifique-se de que o modelo especificado em `OLLAMA_MODEL_NAME` está instalado no Ollama (`ollama pull <NOME_DO_MODELO>`).
- **Erro de conexão com Ollama**: Verifique se o servidor Ollama está rodando em `http://localhost:11434` e se a URL está corretamente configurada no `.env.local`.
- **Mensagens não aparecem**: Inspecione o console do navegador para erros na chamada à API `/api/chat`.

---

## Repositório

O código-fonte do projeto está disponível em:  
[git@github.com:GaussNoob/Chatbot-com-Next.js-e-Ollama.git](git@github.com:GaussNoob/Chatbot-com-Next.js-e-Ollama.git)
