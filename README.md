# shape-drawing

[![Build Status](https://travis-ci.org/zzzze/canvas-word-wrap.svg?branch=master)](https://travis-ci.org/zzzze/canvas-word-wrap)
[![Coverage Status](https://coveralls.io/repos/github/zzzze/canvas-word-wrap/badge.svg?branch=master)](https://coveralls.io/github/zzzze/canvas-word-wrap?branch=master)

A function for word-wrap and return a string array.

## Usage
```javascript
var wrap = require('canvas-word-wrap')
var canvas = document.createElement('canvas')
var ctx = canvas.getContext('2d')
var text = 'abc 123 一二三四五六七 abc 123 一二三四五六七 abc 123 一二三四五六七'
var textArray = wrap(ctx, text, 20, 100, {lineClamp: 2}    ===>  ['abc 123 一', '二三四五...']
```
