for f in *ejs; do mv "$f" $(echo "$f" | sed 's/ejs/ejs.template/g'); done
for f in *.template; do mv "$f" $(echo "$f" | sed 's/.template//g'); done