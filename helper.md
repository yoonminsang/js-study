링크 적용하기

```
var h2 = document.body.querySelectorAll('h2');
var str = '';
[...h2].slice(1).forEach((v) => {
  const [first, second] = v.childNodes;
  const value = second.textContent;
  const link = first.id.slice(13);
  str += `- [${value}](#${link})\n`;
});
```
