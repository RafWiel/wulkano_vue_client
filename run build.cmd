@echo on
call npm run build
copy web.config dist
