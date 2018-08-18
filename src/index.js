const canvas = window.document.getElementById('canvas')
const ctx = canvas.getContext('2d')

function splitWord(text) {
  const array = text.split('')
  const reg = /[\d\w]/
  return array.reduce((newArray, item) => {
    if (!reg.test(item) || reg.test(item) && !reg.test(newArray[newArray.length - 1])) {
      newArray.push(item)
    } else if (!newArray.length) {
      newArray.push(item)
    } else {
      newArray[newArray.length - 1] += item
    }
    return newArray
  }, [])
}
const string = 'fdsfewg官方代购 范德萨fads here'
console.log(splitWord(string))

ctx.rect(0, 0, 100, 100)
ctx.fill()
function getTextLine(ctx, text, fontSize, containerWidth, {
  textOverflow = 'ellipsis',
} = {}) {
  let left = text
  let right = ''
  let result = ''
  let rest = ''
  ctx.font = `${fontSize}px Arial`

  const splitText = text => {
    const count = Math.ceil(text.length / 2)
    left = text.slice(0, count)
    right = text.slice(count)
  }

  while (true) {
    const width = ctx.measureText(result + left).width
    if (width <= containerWidth) {
      result =  result + left
      splitText(right)
    } else {
      rest = right + rest
      splitText(left)
    }
    if (left.length <= 1) break
  }

  if (textOverflow === 'ellipsis') {
    const postFix = '...'
    const postFixLength = postFix.length 
    result = result.slice(0, result.length - 1) + postFix
    while (true) {
      const width = ctx.measureText(result).width
      if (width <= containerWidth) {
        break
      } else {
        result = result.slice(0, result.length - 1 - postFixLength) + postFix
      }
    }
  }

  return {result, rest}
}

function wrap(ctx, text, fontSize, containerWidth, {
  lineClamp = -1,
  textOverflow = 'ellipsis',
} = {}) {
  ctx.font = `${fontSize}px`
  const resultArray = []
  let rest = text
  let i = 0
  while (true) {
    const _textOverflow = i >= lineClamp - 1 && lineClamp > 0 ? textOverflow : '' 
    if (ctx.measureText(rest).width <= containerWidth) {
      resultArray.push(rest)
      break
    } else {
      const {result: _result, rest: _rest} = getTextLine(ctx, rest, fontSize, containerWidth, {textOverflow: _textOverflow})
      resultArray.push(_result)
      rest = _rest
    }
    i += 1
    if (i == lineClamp) break
  }
  return resultArray
}
 
const text = '方法范德萨范德萨热热挖人而为额为他人'
const textArray = wrap(ctx, text, 20, 100, {lineClamp: 2})
console.log(textArray)
