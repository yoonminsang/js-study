# 웹 기본기 공부

## 로컬스토리지, 세션스토리지, 쿠키

### 쿠키

쿠키는 브라우저에 저장되는 작은 파일이다. key, value 형태로 저장된다. http 통신을 할 때 header에 cookie값으로 들어가며 만료시간, httpOnly, secure 등의 옵션이 있다.

### 로컬 스토리지

브라우저에 영구적으로 저장할 수 있는 저장소다. key, value 형태로 저장한다. 참고로 value에는 string으로 저장된다. 그래서 객체를 저장하기 위해서는 JSON.stringify를 사용하고 불러올 때는 JSON.parse를 사용해야 한다.

### 세션 스토리지

브라우저에 일시적으로 저장할 수 있다는 점만 다르고 로컬 스토리지와 같다. 탭/창을 닫으면 사라진다.

### 쿠키 vs 로컬 스토리지

먼저 쿠키는 용량이 더 작다. 그리고 위에서 말한 몇가지의 옵션도 존재한다. 로컬 스토리지는 http 통신을 할 때 header에 값이 들어가지 않는다.(직접 넣는 것은 당연히 가능) 그래서 보통 쿠키는 서버와 데이터를 주고받아 처리할 경우에 사용하고 브라우저 내부에서 가지고 있어도 되는 정보라면 로컬 스토리지에 저장한다. 용량이 더 크기 때문에 객체를 넣을수도 있다. 두가지 모두 적절하게 사용하는 것이 중요하다.

## jwt vs session

### session

우리는 웹사이트에서 로그인을 하고 페이지를 이동한다. 그런데 인증이 어떻게 유지되는걸까?? 가장 직관적으로 생각을 해보면 쿠키또는 로컬에 아이디 비밀번호를 저장하고 http 통신을 통해 서버에서 db를 통해 확인하면 된다. 당연히 비밀번호를 브라우저 내부에 저장하면 보안상에 문제가 생긴다. 그래서 과거에는(지금도) session 방식을 사용했다. 세션에는 store가 존재해서 그 store에 유저 정보를 저장한다. 더 세부적으로는 id에 세션 id를 value에 user id를 저장한다. 쉽게 말해서 브라우저에 저장하지 않고 웹서버에 저장한다고 생각하면 된다. 세션과 쿠키를 이용한 전체적인 인증방법을 살펴보자

1. 프론트에서 로그인
2. 서버로 아이디, 비밀번호가 전송
3. 아이디와 비밀번호가 matching된다면 session store에 session id와 user id를 저장
4. header의 setCookie에 session id를 저장
5. 서버로부터 받은 header의 setCookie때문에 브라우저의 cookie에 session id가 저장
6. 새로고침할때마다 서버와 통신을 하고 header의 cookie가 서버로 전송된다.
7. 서버에서 session store에 접근해서 match되는 session id가 있는지 확인
8. 존재한다면 user id를 db에서 검색
9. 필요한 인증 정보를 프론트에 전송(6의 통신)

### jwt

jwt는 jsonwebtoken의 약자이고 header, payload, signature 세 부분으로 나뉘어진다. header에는 토큰 타입과 어느 알고리즘을 사용할지, payload에는 데이터, signature에는 비밀키가 있다. 프론트에서 암호화된 토큰을 서버로 전송하고 서버에서 decode해서 정보를 읽는 것이다. session방식은 지금도 사용되는 방식이다. 그런데 당연하지만 뭔가 문제가 있기 때문에 jwt라는 새로운 방식이 나왔다. 일단 session 방식을 간단하게 훑어보면 front, server, database를 왔다갔다하면서 작동한다. 조그만 프로젝트라면 상관이 없지만 규모가 커지면 server, db를 확장해야한다. 그중에서도 db를 확장하는 것은 가장 어렵다. 그래서 인증과정중에 db에 접근하지 않는 방법이 jwt 방법이다. 당연히 단점도 존재한다. 보안쪽이 단점이다. 그래서 accessToken과 refreshToken 두 가지 방법을 사용하기도 한다.

## oauth

조그만 기업에서는 보안에 문제가 있을 수 있다. 대기업에 비해 비교적 보안이 약하다는 것은 부정할 수 없다. 그래서 큰 기업에 인증을 맡기는 것이다. 비밀번호를 저장하지 않고 google 같은 기업에 대신해서 맡긴다. 흐름을 간단하게 적겠다.

1. github에서 oauth app을 만든다.(homepage url, callback url 등을 지정)
2. 프론트에서 github로그인 버튼을 클릭
3. 서버의 특정 url에 redirect
4. 특정 url에서 github에서 지정한 url로 redirect(client id, redirect url 등등을 쿼리로)
5. github페이지에서 만들어놓은 브라우저가 나오고 연결을 하게되면 가입 완료
6. 개발자가 지정한 url로 redirect(쿼리에 code가 존재)
7. code를 서버로 전송
8. github에서 지정한 url로 http 통신.(client id, secret, code 등등을 쿼리로)
9. 8에서 통신한 결과로 accessToken을 얻는다.
10. github에서 지정한 url로 accessToken을 authorization header에 넣어서 보낸다.
11. 10으로부터 유저 정보를 얻는다.
12. 얻은 유저 정보를 바탕으로 내 서비스의 db에 아이디를 저장한다.
13. 아이디가 존재한다면 일반 로컬 로그인과 동일한 작업으로 인증을 해주면 된다.

## 웹팩 바벨

## 최적화

## 디자인패턴

## debounce, throttle

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

### HTTP 응답 헤더

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
