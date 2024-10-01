# استخدام صورة Python الأساسية
FROM python:3.10-slim

# تثبيت المكتبات الأساسية المطلوبة
RUN apt-get update && apt-get install -y \
    python3-dev \
    default-libmysqlclient-dev \
    build-essential \
    libssl-dev \
    libffi-dev \
    pkg-config \
    && apt-get clean

# تعيين دليل العمل
WORKDIR /app

# نسخ ملفات المشروع
COPY . /app/

# إنشاء بيئة افتراضية
RUN python -m venv /opt/venv

# تفعيل البيئة الافتراضية
ENV PATH="/opt/venv/bin:$PATH"

# تحديث pip وتثبيت التبعيات
RUN pip install --upgrade pip \
    && pip install -r requirements.txt

# جمع الملفات الثابتة
RUN python manage.py collectstatic --noinput

# تشغيل أوامر الترحيل
RUN python manage.py makemigrations
RUN python manage.py migrate

# فتح المنفذ 8000
EXPOSE 8000

# الأوامر لتشغيل التطبيق
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "summayies_app.wsgi:application"]
