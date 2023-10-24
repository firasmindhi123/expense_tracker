"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let todo = [];
router.get('/', (req, res, next) => {
    res.status(200).json({ todo: todo });
});
router.post('/todo', (req, res, next) => {
    const body = req.body;
    const newtodo = {
        id: new Date().toISOString(),
        text: body.text
    };
    todo.push(newtodo);
    res.status(201).json({ message: 'created', todo: todo });
});
router.put('/todo/:todoId', (req, res, next) => {
    const params = req.params;
    const tid = params.todoId;
    console.log(todo);
    const todoIndex = todo.findIndex((todoitem) => todoitem.id === tid);
    console.log(tid, todoIndex);
    todo[todoIndex] = { id: todo[todoIndex].id, text: req.body.text };
    return res.status(200).json({ message: "updated", todo: todo });
});
router.delete('/todo/:todoId', (req, res, next) => {
    const params = req.params;
    todo = todo.filter((todoitem) => {
        todoitem.id !== params.todoId;
    });
    res.status(200).json({ message: "deleted", todo: todo });
});
exports.default = router;
