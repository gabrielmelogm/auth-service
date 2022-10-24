#!/bin/bash
npx prisma db push && npx prisma db seed && yarn && yarn dev