# summary

* creat requirements File
``
pip freeze > requirements.txt
``

  pip install -r .\requirements.txt
  ``
* install python
    ```
    python -m pip install --upgrade pip
    python -m pip --version
    ```
*  install django
    ``
    pip install django
    ``

* creat env 
    ``
    python -m venv env
    ``
* active vnev
  - command
  ```sh
  cd env
  Scripts\activate
  ```
  ``
  deactivate
  ``
 - In PowerShell :

  ```sh
  cd venv
  Scripts\Activate.ps1
  ```

* install  requirements
  ``

<!-- *TO  Create projeact

```python
python -m django startproject summayies_app
``` -->

<!-- 
TO Create App

``python manage.py startapp summary`` -->

### Creat db in mysql server
* add database configer in app setting file 
``
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'cs50_summary',
        'USER': 'root',
        'PASSWORD': '',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
``


<!-- * install mysqlclient

  ```
  pip install mysqlclient
  ``` -->
### Make  makemigrations

  ```
  python manage.py makemigrations
  ```

  ```
    python manage.py migrate
  ```

* run app
  ``python manage.py runserver``


* createsuperuser 

     ``
     python manage.py createsuperuser
     ``

* usee Sass 
    ```
    sass --watch style.scss styles.css
    ```


# USE To handel JavaScript API

    ``
    npm install axios
    or use it in page
      <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

    ``