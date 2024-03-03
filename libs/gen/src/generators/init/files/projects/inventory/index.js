const { readFileSync } = require("fs");

const content = readFileSync('./product.model.yaml');

content.toString();