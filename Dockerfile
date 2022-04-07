FROM ubuntu
MAINTAINER Dave dave@birdfolk.co.uk

RUN apt-get update
RUN apt-get upgrade -y

RUN mkdir -p /flick
WORKDIR /flick
COPY . .