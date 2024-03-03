# Backend

Used:
* express;
* typescript;
* bcrypt;
* dotenv;
* postgres;
* docker compose;

## Install dependencies

Node 21
```shell
curl -fsSL https://deb.nodesource.com/setup_21.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```

npm
```shell
sudo apt install npm
```

Node dependencies
```shell
npm install
```

Postgresql
```shell
sudo sh -c 'echo "deb https://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt-get update
sudo apt-get -y install postgresql
```

```shell
# Connect to postgres
sudo -u postgres psql

# Change password
ALTER USER postgres WITH PASSWORD 'password';

# Create database
create database mydb;

# Quit from postgres
\q

# Connect with to your db with new password
sudo -u postgres psql -d mydb
```

## Start

Start server
```shell
npm run start
```

Start dev server
```shell
npm run dev
```

Build
```shell
npm run build
```
