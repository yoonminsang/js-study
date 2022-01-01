# 웹 기본기 공부

- [로컬스토리지, 세션스토리지, 쿠키](#로컬스토리지-세션스토리지-쿠키)
- [jwt vs session](#jwt-vs-session)
- [oauth](#oauth)
- [debounce, throttle](#debounce-throttle)
- [무한 스크롤 vs 페이징](#무한-스크롤-vs-페이징)
- [cors](#cors)
- [디자인 패턴](#디자인-패턴)
- [웹팩 바벨](#웹팩-바벨)
- [모듈, 컴포넌트](#모듈-컴포넌트)
- [최적화](#최적화)
- [디자인패턴](#디자인패턴)
- [마이크로서비스 아키텍쳐](#마이크로서비스-아키텍쳐)

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

세션이란 일정 시간동안 같은 사용자(브라우저)로부터 들어오는 일련의 요구를 하나의 상태로 보고 그 상태를 일정하게 유지시키는 기술이다. http 통신은 connectionless, statelss이기 때문에 상태를 유지할 수 없다. 그렇기 때문에 session 방식이 필요하다.

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

## debounce, throttle

### debounce

짧은 시간 간격으로 발생하는 이벤트를 그룹화해서 마지막에 한 번만 이벤트 핸들러가 호출되도록 한다.

#### debounce 구현하기

먼저 클로저 개념을 이용한다. 그리고 timerId가 존재하는 경우 clearTimeout을 하고 setTimeout을 실행하고 그 아이디 값을 timerId에 재할당하는 방식이다. if문은 사실 처음 실행하는 경우를 제외하고는 모두 실행된다. 즉 이전 setTimeout 이벤트를 clear하는 것이다. 만약 지정한 delay시간이 지났다면 clear를 해도 이미 함수가 실행되었기 때문에 상관이 없고 delay시간이 지나지 않았다면 이전 함수들은 실행되지 않는 것이다. 즉 delay시간보다 짧은 시간동안 아무리 많이 함수를 호출해도 콜백함수가 실행되지 않는다.

```
const debounce = (callback, delay) => {
  let timerId;
  return () => {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(callback, delay);
  };
};
```

#### debounce 사용 예시

검색자동완성에 사용된다.

### throttle

짧은 시간 간격으로 연속해서 발생하는 이벤트를 그룹화해서 일정시간 단위로 이벤트 핸들러가 호출되도록 호출 주기를 만든다.

#### throttle 구현하기

여기서도 클로저 개념을 이용한다. 위와는 다른점이 timerId가 존재한다면 return을 한다. 그리고 setTimeout함수의 첫번째 인자에 throttle의 첫번째 인자인 callback을 실행하고 timerId를 null로 할당한다. 이렇게되면 첫번째 이벤트가 발생하고 delay시간 이전에 클릭하게 된다면 if문의 조건에 걸려서 return하게 되고 그 다음 이벤트가 발생하지 않는다. 이렇게 보면 debounce와 다른점이 없어보이는데 0.5초의 delay가 있고 버튼을 0.1초 간격으로 클릭한다고 생각해보자. debounce를 적용하면 100만번 클릭해도 한번만 클릭이 될 것이다. 이제 throttle을 살펴보자. 첫번째는 콜백함수가 실행되고 두번째부터 다섯번째까지는 콜백함수가 실행되지 않는다. 그리고 0.5초가 지나는 순간 콜백함수가 실행되고 timerId가 null로 재할당된다. timerId가 null이기 때문에 여섯번째 클릭은 setTimeout함수가 실행된다.

```
const throttle = (callback, delay) => {
  let timerId;
  return () => {
    if (timerId) return;
    timerId = setTimeout(
      () => {
        callback();
        timerId = null;
      },
      delay,
    );
  };
};
```

#### throttle 사용 예시

스크롤 이벤트에 사용된다.

#### 버튼 클릭 예시

```
<!DOCTYPE html>
<html>

<body>
  <button>click me</button>
  <pre>일반 클릭 이벤트 카운터    <span class="normal-msg">0</span></pre>
  <pre>디바운스 클릭 이벤트 카운터 <span class="debounce-msg">0</span></pre>
  <pre>스로틀 클릭 이벤트 카운터   <span class="throttle-msg">0</span></pre>
  <script>
    const $button = document.querySelector('button');
    const $normalMsg = document.querySelector('.normal-msg');
    const $debounceMsg = document.querySelector('.debounce-msg');
    const $throttleMsg = document.querySelector('.throttle-msg');

    const debounce = (callback, delay) => {
      let timerId;
      return () => {
        if (timerId) clearTimeout(timerId);
        timerId = setTimeout(callback, delay);
      };
    };

    const throttle = (callback, delay) => {
      let timerId;
      return () => {
        if (timerId) return;
        timerId = setTimeout(
          () => {
            callback();
            timerId = null;
          },
          delay
        );
      };
    };

    $button.addEventListener('click', () => {
      $normalMsg.textContent = +$normalMsg.textContent + 1;
    });

    $button.addEventListener(
      'click',
      debounce(() => {
        $debounceMsg.textContent = +$debounceMsg.textContent + 1;
      }, 500)
    );

    $button.addEventListener(
      'click',
      throttle(() => {
        $throttleMsg.textContent = +$throttleMsg.textContent + 1;
      }, 500)
    );
  </script>
</body>

</html>
```

- 출처 : 모던자바스크립트 deep dive

### 실제 사용

실제로는 위와같이 구현하기 보다는 lodash나 underscore, redux saga 등의 라이브러리에 있는 함수로 사용한다.

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

## 디자인 패턴

### MVC

웹 어플리케이션을 분리하지 않은 상태에서 규모가 커지면 커질수록 버그 수정이나 코드 확장, 단위 테스트를 하기 힘들어진다. 이를 개선하기 위해 MV 패턴이 나왔다. 데이터를 나타내는 모델과 사용자 인터페이스 뷰를 분리하는 형태인데 이를 조금 더 개선한 것이 MVC 패턴이다. 기존 패턴의 뷰의 비지니스로직과 모델의 데이터를 컨트롤러로 연결하는 형태이다. 이렇게 함으로써 모델과 뷰 사이가 느슨하게 된다. 즉 의존성을 줄일 수 있다.

간단하게 예시를 하나 들어보겠다. 프론트에서 기본 인터렉션 흐름이 이벤트 -> 상태변경 -> 화면의변화 라고 한다면, 컨트롤러에서 이벤트가 발생하면 모델의 상태를 변경하고 화면의 변화를 일으키는 방식이다.

---

사용자 인터페이스로부터 비즈니스 로직을 분리하여 애플리케이션의 시각적 요소나 그 이면에서 실행되는 비즈니스 로직을 서로 영향 없이 쉽게 고칠 수 있는 애플리케이션을 만들 수 있다. MVC에서 모델은 애플리케이션의 정보(데이터)를 나타내며, 뷰는 텍스트, 체크박스 항목 등과 같은 사용자 인터페이스 요소를 나타내고, 컨트롤러는 데이터와 비즈니스 로직 사이의 상호동작을 관리한다.

<!-- 프론트엔드에서 mvc 패턴을 예로 들면 모델에는 ajax를 이용해 데이터를 나타내고 뷰는 컴포넌트로 나타내고 컨트롤러에서는 이벤트를 걸 수 있겠다. 리액트라면 프레젠테이션 컴포넌트와 컨트롤러 컴포넌트를 분리하고 자주 사용되는 데이터를 모델에 저장하면 된다. -->

그림으로 나타내면 아래와 같다. 컨트롤러에서 모델을 변경하고 모델과 뷰는 서로 상호작용한다. MV 패턴도 존재하는데 컨트롤러는 모델과 뷰 사이를 느슨하게 해주는 역할을 한다.

![image](https://user-images.githubusercontent.com/57904979/147593845-ce37d2f2-8663-4321-957f-d29042dae30f.png)

그리고 이런 흐름은 어플리케이션이 커지면서 아래 그림과 같이 복잡해졌다. 원래의 의도와는 다르게 컨트롤러의 역할이 커지게 되고, 이런 흐름은 데이터의 흐름을 파악하기 어렵고 페이스북에서 알람 버그와 같은 버그를 유발시켰다.

![image](https://user-images.githubusercontent.com/57904979/147593959-5d8a8e16-4c68-4233-adc5-9ddc11664b40.png)

### flux

페이스북에서는 MVC패턴을 보완하기 위해서 flux 패턴을 도입했다. flux 패턴은 mvc패턴과 다르게 단방향 데이터 흐름을 가진다.

먼저 액션을 발생시킨다. 액션에는 타입과 페이로드가 있으며 디스패처로 액션을 넘긴다.

디스패처에는 콜백함수가 등록되어 있다. 액션이 발생하면 스토어에 액션을 보낸다.

스토어는 상태와 그와 관련된 로직을 가지고 있다. 그리고 스토어의 상태는 디스패처의 콜백함수를 이용해 변경한다. 그리고 변경된 상태를 뷰에 알려주고 뷰는 리렌더링하게 된다. flux는 react와 redux를 합친 말인데 리덕스에서는 컨트롤러와 컴포넌트를 분리하는 패턴을 많이 따른다. 즉 컨트롤러에 변경된 상태를 알려주고 컨트롤러에서 컴포넌트에 필요한 데이터를 넘겨준다.

![image](https://user-images.githubusercontent.com/57904979/147594053-99fbb0a2-f84c-4f8a-9851-757a4b8609e8.png)

### 옵저버패턴

리덕스에서 사용하는 패턴이 옵저버패턴이다. 옵저버패턴에는 구독(subscribe)와 발행(publish)이 존재한다.

스토어에서 콜백함수를 구독한다. 그리고 발행으로 모든 구독된 콜백함수를 실행시켜준다.

mvc 패턴이라면 모델이 옵저버블이고 뷰가 옵저버다. 주로 내가 사용하는 형태는 재사용성이 높은(전역 상태로 관리해야 할 필요가 있는) 상태라면 옵저버패턴을 적용한 모델(스토어)에 저장한다. 리액트와 비슷한 컴포넌트로 만들때 prop drilling을 막기위해 사용하기도 한다. 그리고 필요한 경우에 발행을 해서 매번 모델에서 뷰로(혹은 컨테이너로) 정보를 넘겨주는 코드를 작성할 필요없이 구독된 콜백함수를 실행해서 해결한다.

### mvc, flux, 옵저버 패턴 혼자서 질문 대답해보기

- 프론트에서 mvc 패턴 설명해봐

기존에 웹 어플리케이션은 규모가 작았기 때문에 하나의 코드에 모든 로직을 담아도 문제가 없었다.
하지만 웹 어프리케이션의 규모가 커지게 되고 분리의 필요성이 대두되었다.

- 분리가 왜 필요한데??

분리를 하지 않고 코드가 길어지게 되면 흐름 파악을 하기도 어렵고 버그 수정, 코드 확장을 하기가 어려워진다. 테스트 코드의 작성도 어려워진다.

- 계속해봐

그래서 mv 패턴이라는 것이 나왔다. 모델과 뷰를 나눈 것인데 모델은 데이터를 저장하는 곳이고 store라고도 부른다. 뷰는 사용자 인터페이스다.
그런데 이 mv패턴도 규모가 더 커짐에 따라 너무나도 복잡해졌고 서로간의 의존성이 깊어졌다.

- 의존성이 왜 깊으면 안돼??

코드를 변경할 경우에 의존성이 높으면 변경해야 할 코드가 많아지고 유지보수에 어려움을 겪는다.

- 계속해봐

그 의존성을 줄이기 위해서 mvc 패턴을 도입. 참고로 mv를 기반으로 하는 굉장히 많은 디자인 패턴들이 존재.
기존의 패턴에서 컨트롤러를 도입. 컨트롤러는 모델의 데이터와 뷰의 비지니스로직 사이를 느슨하게 연결시킴

- 어떻게 느슨하게 하는데??

모델과 접근하는 코드를 컨트롤러에 작성.

- 뷰와 모델 사이의 직접 접근도 허용하는 거 아닌가??

뷰의 상태를 직접 변경후에 모델에 접근하는 방법도 있다.

1. 컨트롤러가 모델의 상태 변경을 요청하고 그 이벤트를 받고 뷰에 전달할수도 있고
2. 컨트롤러는 요청만 전달하고 뷰가 모델의 상태 변경을 구독할 수도 있고(이건 옵저버패턴 도입)
3. 컨트롤러에서 뷰에 상태변경을 요청하고 뷰가 자신의 상태를 변경 후 모델에 상태 변경을 요청하는 경우도 있다.

이렇게 mvc패턴은 계속 발전하고 조금씩 다르게 사용되어 왔으며 모두 공통적인 것은 뷰와 모델의 의존성을 낮추는 것이다.

- 그러면 프론트에서 mvc 패턴을 지금도 사용하는가??

정확히 MVC 패턴만을 사용하지는 않는다. 하지만 이것을 바탕으로 많은 디자인 패턴이 생겼고 이 기본적인 흐름을 이해하는 것은 중요하다.
그리고 MVC 패턴을 사용하고 어플리케이션의 규모가 커지게 되면서 컨트롤러의 규모가 커지게 되었다.
하나의 컨트롤러에 여러개의 모델과 뷰가 연결되게 됬고 페이스북에서도 알람버그와 같은 버그를 유발하게 되었고 데이터의 흐름을 파악하기 힘들게되었다.
그리고 FLUX 패턴을 도입했다.

- FLUX는 뭔데??

일단 MVC에서 양방향 데이터 흐름이 문제였다고 생각했기 때문에 단방향 데이터 흐름을 원했다.

액션 => 디스패처 => 스토어 => 뷰 =>액션

액션에는 타입과 페이로드 값을 넣는다. 액션을 발행하면 디스패처로 이동한다.
디스패처에서는 콜백함수가 등록되어 있고 스토어에 액션을 넘겨준다.
스토어는 상태와 그에 관련된 로직을 가지고 있다. 스토어의 상태는 디스패처의 콜백함수를 이용해 변경한다.
그리고 변경된 상태는 뷰에 전달되고 업데이트가 일어난다.

## 웹팩 바벨

### 웹팩

자바스크립트 모듈 번들러로써 여러개로 나누어져 있는 파일들을 하나의 자바스크립트 코드로 압축하고 최적화하는 라이브러리다. 우리가 정의한 의존성 파일에서 모든 의존성을 찾아서 의존성그래프(dependency graph)를 만든다음, 어플리케이션에 필요한 모든 모듈을 하나의 번들로 만들어준다.

하나의 파일로 합침으로써 spa를 가능하게 하고 네트워크 비용을 줄일 수 있다. 프로젝트가 커지면 파일의 크기가 지나치게 커지고 로딩 시간이 오래 걸릴 수 있는데 코드 스플리팅을 이용해 몇개의 파일로 나눌 수도 있다.

### 바벨

바벨은 자바스크립트 컴파일러이다. 바벨이 나오기 이전에는 브라우저마다 지원하는 범위가 다르기 때문에 최신 문법을 사용하지 못했는데 바벨이 최신 문법을 예전 문법으로 변경해줘서 모든 브라우저에서 최신 문법 사용이 가능하다.(옵션에 따라 버전이나 브라우저 등을 적용할 수 있다)

## 모듈, 컴포넌트

### 모듈

프로그래밍 관점에서 특정 기능을 갖는 작은 코드 단위다.

아래 파일은 2가지 기능을 가지고 있는 모듈이다.

```
// ex.js
function hi() {
  console.log('hi');
}

function hello() {
  console.log('hello')
}

export { hi, hello }
```

### 컴포넌트

재사용이 가능한 각각의 독립된 모듈이다. 즉 하나의 페이지를 만들때 여러개의 컴포넌트(헤더, 버튼, 리스트, 메뉴 등등)을 조합해서 만든다.

https://hanamon.kr/%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-component%EB%9E%80/

### 모듈 vs 컴포넌트

두 개의 개념이 다르기 때문에 하나의 모듈이 여러개의 컴포넌트를 포함할 수도 있고 그 반대일 수도 있다.

- 모듈은 가장 상위에 위치하는 구현의 단위

- 컴포넌트는 런타임 엔티티를 참조하는 단위

- 참조 블로그 https://imcreator.tistory.com/7

## 최적화

## 디자인패턴

## 마이크로서비스 아키텍쳐
