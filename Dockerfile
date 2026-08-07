FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY proxy.py .

# Use environment variables
ENV BOT_TOKEN=${BOT_TOKEN}
ENV CHAT_ID=${CHAT_ID}

CMD ["python", "proxy.py"]
