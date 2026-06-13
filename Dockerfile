# Use an official Python runtime
FROM python:3.9

# Hugging Face strictly requires a non-root user with ID 1000
RUN useradd -m -u 1000 user
USER user
ENV PATH="/home/user/.local/bin:$PATH"

WORKDIR /app

# Install our heavy AI dependencies first
COPY --chown=user ./requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

# Copy all your aesthetic code and datasets into the container
COPY --chown=user . /app

# Boot up the FastAPI brain on Hugging Face's specific port
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]