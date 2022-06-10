web:ENV_SILENT=true node ./build/server.js
web: node build/server.js
release: node build/ace migration:rollback
release: node build/ace migration:run --force
