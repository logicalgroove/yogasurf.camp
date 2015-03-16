#!/bin/bash

ssh -t dorian@openmarket.od.ua <<'ENDSSH'
cd yogasurf.camp
git pull
ENDSSH
