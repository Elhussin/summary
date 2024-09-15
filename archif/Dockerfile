
# Use an official Python runtime as a parent image
FROM python:3
# هذا الأمر يقوم بتعطيل كتابة الملفات البايتية (.pyc) على القرص.
ENV PYTHONDONTWRITEBYTECODE=1
# هذا الأمر يقوم بتعطيل التخزين المؤقت للإخراج (output buffering) في Python.

ENV PYTHONUNBUFFERED=1
# Set the working directory

WORKDIR /app
# Install dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy the rest of the application code
COPY . /app/

# Expose the port the app runs on
EXPOSE 8000

# Command to run the application
CMD ["gunicorn", "--workers", "3", "--bind", "0.0.0.0:8000", "summary.wsgi:application"]