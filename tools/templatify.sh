for f in *ejs; do mv "$f" $(echo "$f" | sed 's/ejs/ejs.template/g'); done