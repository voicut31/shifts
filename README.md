# Shifts Project

## Description:
Project is using API Generator:
```git clone https://github.com/voicut31/api_generator.git```

Available also in packagist:

https://packagist.org/packages/voicut31/api_generator

can be installed with:

```composer require voicut31/api_generator```

The frontend part was made using React JS

Sample unit tests can be found in `api_generator/tests`
Run the unit-tests command:
```
php vendor/bin/phpunit
```

## 1. Setup the project:
### 1.1. Backend side setup
#### 1.1.1. Run composer install inside api_generator:
(composer package is required: https://getcomposer.org/)
```
cd api_generator
composer install
```
#### 1.1.3. Create a config file
copy file `config.php.dist` to `config.php`
```cp config.php.dist config.php```

copy file `phpunit.xml.dist` to `phpunit.xml`
```cp phpunit.xml.dist phpunit.xml```

#### 1.1.4. Create the database
- create a database with mysql/mariadb
- use `migration\data.sql` to create tables and data samples;
- configure access to database in `api_generator\config.php`

### 1.2. Frontend setup
Go to frontend directory and run:
```
cd frontend
npm install
```

## 2. Start the project
### 2.1. Backend start
Go to `api_generator`:
```
php -S localhost:8081
```

### 2.2. Frontend start
```  
cd frontend
npm start
```
