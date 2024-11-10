FROM minio/minio:latest

COPY create-bucket.sh /usr/bin/create-bucket.sh

RUN chmod +x /usr/bin/create-bucket.sh

ENTRYPOINT ["sh", "-c", "minio server /data --console-address ':9001' & /usr/bin/create-bucket.sh && wait"]
