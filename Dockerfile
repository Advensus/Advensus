# syntax=docker/dockerfile:1
FROM python:3.9.0
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN mkdir /app
WORKDIR /app
COPY . /app /app/

COPY ./requirements.txt /requirements.txt
RUN pip install -r requirements.txt


RUN adduser -D user
USER user