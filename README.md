# STOCK (feat. websocket)

## ⚠️ ERRORS

[1]. __ESLint__ no babel config file detected 에러
- vscode에 settings.json에 들어가서 아래 코드 추가
```
"editor.formatOnSave": false,
"editor.codeActionsOnSave": {
   "source.fixAll.eslint": true
},

"eslint.alwaysShowStatus": true,
"eslint.workingDirectories": [{ "mode": "auto" }],
"eslint.validate": ["javascript", "typescript"]

```
