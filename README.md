# summary

* creat requirements File
``
pip freeze > requirements.txt
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
  cd venv
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


* Create projeact

```python
python -m django startproject summayies_app
```


Create App

``python manage.py startapp summary``

* run app
  ``python manage.py runserver``
* install mysqlclient

  ```
  pip install mysqlclient
  ```
* makemigrations

  ```
  python manage.py makemigrations
  ```

  ```
    python manage.py migrate
  ```
* createsuperuser 

     ``
     python manage.py createsuperuser
     ``

* 
    ```
    sass --watch style.scss styles.css
    ```
