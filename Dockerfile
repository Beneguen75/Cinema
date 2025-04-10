# Usa a imagem oficial do Nginx
FROM nginx:alpine

# Remove o conteúdo padrão do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia todos os arquivos do projeto para o diretório padrão do Nginx
COPY . /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]

FROM nginx:latest
# Remove o HTML padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*
# Copia seus arquivos HTML e JS para a pasta padrão do Nginx
COPY . .

# Expõe a porta padrão do Nginx
EXPOSE 80
# Inicia o servidor Nginx

CMD ["nginx", "-g", "daemon off;"]