# Use a imagem oficial do Node.js
FROM node:18-alpine

# Crie e defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie o package.json e package-lock.json para dentro do contêiner
COPY package*.json ./

# Instale as dependências
RUN npm install

# Instale o TypeScript globalmente
RUN npm install -g typescript

# Copie o restante dos arquivos da aplicação para dentro do contêiner
COPY . .

# Transpile o código TypeScript para JavaScript
RUN tsc

# Exponha a porta onde o servidor irá rodar
EXPOSE 5000

# Comando para rodar a aplicação
CMD ["node", "dist/index.js"]
