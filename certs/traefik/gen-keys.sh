#!/bin/bash

# copied fronm https://stackoverflow.com/a/12907165
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem -addext "subjectAltName = DNS:mydnsname.com"