#!/bin/bash
 
if [[ $VERCEL_ENV == "production"  ]] ; then
  npm run build:preview
else
  npm run build:preview
fi