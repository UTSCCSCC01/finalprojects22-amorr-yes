# Pull base image
FROM python:3.8

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /amorr

# Install dependencies for backend
COPY Pipfile Pipfile.lock /amorr/
RUN pip install pipenv && pipenv install --system

# Copy frontend
COPY frontend/build/ /amorr/frontend/build/

# Copy backend
COPY backend/ /amorr/backend/

# Copy start script
COPY docker-run.py /amorr/

CMD ["python3", "/amorr/docker-run.py"]