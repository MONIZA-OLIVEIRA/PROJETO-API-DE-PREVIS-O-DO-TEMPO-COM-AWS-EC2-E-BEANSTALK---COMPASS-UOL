# Clima Cast

Uma aplicação que consome uma API de previsão do tempo utilizando Node.js, Express, Axios e Docker.

## Estrutura do Projeto

src/
│
├── Dockerfile
├── package.json
├── server.js
│ ├── routes/
│ │ └── previsao.js
│ ├── views/
│ │ └── index.hbs
│ ├── public/
│ │ ├── css/
│ │ │ └── style.css
│ │ ├── js/
│ │ │ └── modal.js
│ │ └── assets/
│ │ └── clima.png
└── README.md

## Pré-requisitos

- Docker
- Node.js (opcional, se quiser rodar localmente sem Docker)

## Instalação e Uso

### Com Docker

1. Construa a imagem Docker:

    ```bash
    docker build -t ClimaCast .
    ```

2. Rode o container:

    ```bash
    docker run -p 3000:3000 ClimaCast
    ```

3. Acesse a aplicação em seu navegador:

    [http://localhost:3000](http://localhost:3000)

### API de Previsão do Tempo

Este projeto utiliza a API do OpenWeatherMap para obter dados de previsão do tempo. Para configurar a API, substitua a variável `apiKey` em `src/routes/previsao.js` com a sua chave da API.

## Criando uma Instância EC2 e Implantando o Contêiner Docker

### Passo 1: Criar uma Instância EC2

1. Acesse o console da AWS e vá para a seção EC2.
2. Clique em "Launch Instance".
3. Escolha uma AMI (Amazon Machine Image). Para este exemplo, use a "Amazon Linux 2 AMI (HVM), SSD Volume Type".
4. Escolha o tipo de instância. Uma `t2.micro` é suficiente para este exemplo.
5. Configure as configurações de instância conforme necessário.
6. Adicione o armazenamento (o padrão é suficiente).
7. Adicione tags (opcional).
8. Configure o grupo de segurança:
   - Adicione uma regra para permitir o tráfego HTTP na porta 80.
   - Adicione uma regra para permitir o tráfego SSH na porta 22 (para acesso ao servidor).
9. Revise e lance a instância.
10. Crie um novo par de chaves ou use um existente para acessar a instância via SSH.

### Passo 2: Conectar-se à Instância EC2

1. Faça o download do arquivo `.pem` do par de chaves.
2. Conecte-se à sua instância via SSH:

    ```bash
    ssh -i "seupar.de.chave.pem" ec2-user@seu-endereco-ec2.amazonaws.com
    ```

### Passo 3: Instalar o Docker na Instância EC2

Execute os seguintes comandos para instalar o Docker:

```bash
sudo yum update -y
sudo amazon-linux-extras install docker
sudo service docker start
sudo usermod -a -G docker ec2-user

Passo 4: Fazer Login no Docker Hub (Opcional)
Se você criou a imagem Docker localmente e a enviou para o Docker Hub, faça login:

docker login

Passo 5: Baixar e Executar o Contêiner Docker na Instância EC2
Puxe a imagem Docker do Docker Hub (substitua seu-usuario e ClimaCast pelo nome do seu repositório e imagem):

docker pull seu-usuario/ClimaCast

Rode o contêiner Docker:

docker run -d -p 80:3000 seu-usuario/ClimaCast

Passo 6: Acessar a Aplicação
Acesse a aplicação em seu navegador usando o endereço público da sua instância EC2:

http://seu-endereco-ec2.amazonaws.com