FROM python:3.12-slim

WORKDIR /server

RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    python3-dev \
    libffi-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt ./

RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir --default-timeout=100 -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]