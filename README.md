# summary

- creat requirements File
  `pip freeze > requirements.txt`

  pip install -r .\requirements.txt
  ``
- install python

  ```
  python -m pip install --upgrade pip
  python -m pip --version
  ```
- install django
  `pip install django`
- creat env
  ` python -m venv env`
- active vnev

  - command

  ```sh
  cd env
  Scripts\activate
  ```

  `deactivate`

* In PowerShell :

```sh
cd venv
Scripts\Activate.ps1
```

- install requirements
  ``

<!-- *TO  Create projeact

```python
python -m django startproject summayies_app
``` -->

<!--
TO Create App

``python manage.py startapp summary`` -->

## DatBase

## sqlit is alread configer in the djanjo projeact

### Mysql Creat db ad configer

    - use Xampp server
    -Creat Dat base in php my admin

    - add database configer in app setting file``        DATABASES = {             'default': {                 'ENGINE': 'django.db.backends.mysql',                 'NAME': 'cs50_summary',                 'USER': 'root',                 'PASSWORD': '',                 'HOST': 'localhost',                 'PORT': '3306',             }         }        ``

    - install mysqlclient

    ``        pip install mysqlclient        ``

### Use  PostgreSQL

- [Downloud](https://www.postgresql.org/download/)
- ofter install App
- open sql Shell
    ``sh
      psql -U postgres
      CREATE DATABASE postgres
      5432 <!--#port--> 
      Username: postgres
      Password :*****
    ``

    ``sh
    CREATE DATABASE cs50_summary;
    CREATE USER postgres WITH PASSWORD '123456';
    GRANT ALL PRIVILEGES ON DATABASE postgres TO postgres;
    ``
  cheeeck db work

  ``psql -h localhost -U postgres postgres``
 - update setting.py
  ``
  ALLOWED_HOSTS = ['localhost', '127.0.0.1']
  ``
  -optian:add pgpass.conf
  ``
  localhost:5432:postgres:your_db_user:postgres

  ``



### Make makemigrations
- ofterc choise db make imgratian

```
python manage.py makemigrations
```

```
  python manage.py migrate
```

- run app
  `python manage.py runserver`
- createsuperuser

  `  python manage.py createsuperuser`
- usee Sass

  ```
  sass --watch style.scss styles.css
  ```

# USE axios To handel JavaScript API

    ``
    npm install axios
    or use it in page`<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>`

    ``
