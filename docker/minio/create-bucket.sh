#!/bin/sh

until curl -f ${MINIO_ENDPOINT}/minio/health/live; do
    echo "Waiting for Minio to be ready..."
    sleep 3
done

/usr/bin/mc alias set local ${MINIO_ENDPOINT} ${MINIO_ROOT_USER} ${MINIO_ROOT_PASSWORD}

/usr/bin/mc admin user add local "${MINIO_KEY}" "${MINIO_SECRET}"

/usr/bin/mc admin policy attach local readwrite --user ${MINIO_KEY}

/usr/bin/mc mb local/${MINIO_BUCKET}

echo "Bucket '${MINIO_BUCKET}' created with private policy."
