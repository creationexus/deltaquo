# Random Questions

Version 2 is still under development... 

This version supports each response with *n* selectable alternatives.
The way to configure questions and answers is as follows:

```javascript
//Preguntas
var preguntas = [
    "PREGUNTA 1",
    "PREGUNTA 2",
];
//Respuestas
var respuestas = [
    [
        { name: "alternativa 1 (no)", isTrue: false },
        { name: "alternativa 2 (no)", isTrue: false },
        { name: "alternativa 3 (si)", isTrue: true },
    ],
    [
        { name: "alternativa 1 (si)", isTrue: true },
        { name: "alternativa 2 (no)", isTrue: false },
        { name: "alternativa 3 (si)", isTrue: true },
        { name: "alternativa 3 (no)", isTrue: false },
        { name: "alternativa 3 (si)", isTrue: true },
    ]
];
```