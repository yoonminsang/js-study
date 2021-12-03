# 웹 기본기 공부

## 로컬스토리지, 세션스토리지, 쿠키

## jwt vs session

## oauth

## 웹팩 바벨

## 최적화

## 디자인패턴

## 무한 스크롤 vs 페이징

## cors

### cors란

Cross-Origin Resource Sharing의 약자다. 다른 출처의 리소스를 공유할 때 발생할 수 있는 문제다. 출처는 protocol, host, port가 모두 같안 경우에만 같은 출처이고 하나라도 다르면 다른 출처다. 예를들어 프로토콜은 http, https, host는 www.naver.com, port는 :80, :3000이다. 동일 출처 정책은 XSS, XSRF 등의 보안 취약점을 노린 공격을 방어할 수 있다.

### cors 동작방식

1. simple request

단순 요청은 서버에 API를 요청하고, 서버는 Access-Control-Allow-Origin 헤더를 포함한 응답을 브라우저에 보낸다. 브라우저는 Access-Control-Allow-Origin 헤더를 확인해서 CORS 동작을 수행할지 판단합니다. 그런데 세가지 조건이 만족해야 simple request로 동작한다.

- 요청 메서드는 GET, HEAD, POST 중 하나여야 한다.
- Accept, Accept-Language, Content-Language, Content-Type, DPR, Downlink, Save-Data, Viewport-Width, Width를 제외한 헤더를 사용하면 안 된다.
- Content-Type 헤더는 application/x-www-form-urlencoded, multipart/form-data, text/plain 중 하나를 사용해야 한다.

사실상 지켜지기 어려운 조건들이다. 당장 첫번째만 해도 사용할 수 있는 메서드가 너무 적다. restful하지 않은 방식이 되어버린다. 두번째 조건을 보면 authorization도 사용할 수 없다. 세번째 조건에서도 application/json을 사용할 수 없다.

2. preflight request

서버에 예비 요청을 보내서 안전한지 판단한 후 본 요청을 보내는 방법이다.
![image](https://user-images.githubusercontent.com/57904979/144571079-47936604-543a-4fca-8b06-780c1b95376d.png)

네트워크 탭을 열어보면 preflight를 확인할 수 있다. 이게 3 hand shake인가?? 했었는데 cors때문에 요청이 있었던 것이다.

### HTTP 요청 헤더

나는 nodejs express를 이용하는데 cors 라이브러리를 이용하면 쉽게 해결할 수 있다. 하지만 당연하게도 직접 해줄수 있다. 근데 조금 귀찮기때문에 라이브러리를 사용한다.

#### Access-Control-Allow-Origin : \<origin> | \*

헤더에 작성된 출처만 브라우저가 접근 가능(\*은 모든 출처)

#### Access-Control-Allow-Methods \<method>[, \<method>]\*

리소스 접근을 허용하는 HTTP 메서드를 지정해 주는 헤더(GET, PUT~~)

#### Access-Control-Expose-Headers : \<header-name>[, \<header-name>]\*

브라우저의 자바스크립트에서 헤더에 접근할 수 있게 해준다.

#### Access-Control-Allow-Headers : \<header-name>[, \<header-name>]\*

브라우저에서 보내는 요청 헤더에 포함된 Access-Control-Request-Headers 헤더에 대한 응답 결과

#### Access-Control-Max-Age : \<delta-seconds>

preflight 요청 결과를 캐시 할 수 있는 시간

#### Access-Control-Allow-Credentials : true

자바스크립트 요청에서 credentials가 include일 때 요청에 대한 응답을 할 수 있는지를 나타낸다. false로 설정해 주고 싶을 경우에는 헤더를 생략

### HTTP 요청 헤더

#### Origin : \<origin>

출처 ex)www.naver.com

#### Access-Control-Request-Method : \<method>

실제 요청이 어떤 HTTP 메서드를 사용하는지 서버에 알려주기 위해 사용.

#### Access-Control-Request-Headers : \<field-name>[, <field-name>]

브라우저에서 보내는 커스텀 헤더 이름을 서버에 알려주기 위해 사용

### 기타 해결 방법

1. JSONP

JSONP는 HTML의 script 요소로부터 요청되는 호출에는 보안상 정책이 적용되지 않는다는 점을 이용한 우회 방법이다.

프론트엔드

```
<!-- Frontend -->
<!DOCTYPE html>
<html>
  <script>
    function jsonpFn (data) {
      console.log(data) // beomy
    }
  </script>
  <script
    type="application/javascript"
    src="http://localhost:3000/cors?callback=jsonpFn"
  >
  </script>
</html>
```

백엔드

```
router.get('/cors', (req, res, next) => {
  res.send(`${req.query.callback}('beomy')`)
})
```

2. 프록시 서버

브라우저에서 서버로 요청할 때 cors 문제가 발생하기 때문에 서버에서 서버로 요청을 하면 cors 문제가 발생하지 않는다. 나는 Webpack Dev Server 등의 라이브러리를 사용해서 프록시 설정을 한다.

- [참고 블로그](https://beomy.github.io/tech/browser/cors/)
