FROM nestjs/cli AS jjc_clothes_backend_development

WORKDIR /app/jjc_clothes

COPY . .

RUN npm install

RUN npm run build

EXPOSE 4000

CMD ['npm run start:dev']