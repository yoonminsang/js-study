# 자바스크립트 기본기 공부

## 자바스크립트의 특징

자바스크립트는 인터프리터, 동적 타입, 프로토타입 기반 객체지향 언어이다. 웹에 기본적으로 내장되어 있어서 html, css와 함께 유일하게 웹에서 사용할 수 있는 언어다. 또한 nodejs를 이용해 서버나 cli 프로그램을 만들수도 있다.

### 인터프리터 언어 vs 컴파일러 언어

인터프리터 언어는 한 줄마다 기계어로 번역해서 속도가 느리고 수정이 편하다.
컴파일러 언어는 컴파일 하는데 시간이 걸리지만 속도가 빠르다.
자바스크립트는 인터프리터 언어지만 두 가지 장점을 결합해 속도가 빠르다.

### 동적 타입 언어 vs 정적 타입 언어

정적 타입 언어는 변수를 선언할 때 데이터 타입을 미리 지정한다.
동적 타입 언어는 데이터 타입을 미리 지정하지 않는다. 그래서 편하지만 복잡한 프로그래밍에서는 변수를 추적하기 어렵다. 그래서 자바스크립트에서는 스코프를 좁게 만들고 모듈을 사용하고 전역 변수 사용을 최소화하고 상수를 만든다. 요즘에는 타입 지정이 필요하다고 생각해서 타입스크립트를 사용하는 추세다.

### 웹 vs nodejs

자바스크립트는 기본적으로 ECMAScript를 따른다. 그리고 웹에서는 client-side API를 nodejs에서는 nodejs-host API를 가지고 있다. 참고로 nodejs는 Chrome V8 자바스크립트 엔진으로 빌드된 자바스크립트 런타임이다. 서버가 아니다!! 서버로 많이 이용될 뿐이다.

## 원시값 vs 객체

원시값은 immutable이고 객체는 mutable이다. 즉 원시값은 실제 값이 저장되고 객체는 참조 값이 저장되는 것이다. 그래서 원시값을 갖는 변수를 다른 변수에 할당하면 원시값이 복사가 되는데 객체를 갖는 변수를 다른 변수에 할당하면 참조값이 복사가 된다.

ex)

```
var a=10;
var b=a;
b=5;
console.log(a);  // => 10
var obj = { a: 10, b: 20};
var copy = obj;
delete copy.a;
console.log(obj);  // => {b: 20}
```

## 스코프

- 정의 : 식별자가 유효한 범위(전역, 지역)

스코프 체인 : 스코프가 계층적으로 연결된 것

스코프는 함수의 중첩에 의해 계층적 구조를 갖는다.

변수를 참조할 때 자바스크립트 엔진은 스코프 체인을 통해 변수를 참조하는 코드의 스코프에서 시작하여 상위 스코프 방향으로 선언된 변수를 검색한다.

동적 스코프 : 함수를 어디서 호출했는지에 따라 함수의 스코프를 결정

렉시컬 스코프 : 함수를 어디서 정의했는지에 따라 함수의 상위 스코프를 결정(js)

## 전역변수의 문제점

1. 암묵적 결합 : 전역변수를 사용하고 다음 스코프에서 같은 변수명을 사용할 때 원하지 않는 결합을 하는 경우가 존재
2. 긴 생명주기 : 전역변수면 변수가 계속 존재하기 때문에 메모리 측면에서 낭비
3. 스코프 체인 상에서 종점에 존재 : 여러 스코프를 통과해야 하기 때문에 검색 속도가 느림
4. 네임 스페이스의 오염 : 파일이 분리되어 있다고 해도 자바스크립트는 하나의 전역 스코프를 공유

과거에는 전역변수의 사용을 막기 위해서 즉시실행함수를 많이 사용했다. 요즘에는 모듈을 사용한다. 그리고 전역 변수가 필요하다면 옵저버블 패턴을 이용해 가져올 수 있다. 이를 이용한 대표적인 라이브러리가 리덕스다.

## var, let, const

과거에 자바스크립트는 변수를 선언할 방법이 var만 존재했다. 가장 큰 var의 문제점은 함수 레벨 스코프라는 것이다. 그리고 다른 몇 가지의 문제점도 존재한다.

1. 함수 레벨 스코프

var는 함수 레벨 스코프다. 즉, 함수에서 선언한 var는 지역변수로 저장되지만 다른 곳에서 선언한 var는 전역 변수로 저장된다. 예시를 살펴보자

함수가 아닌 곳에서 선언된 var

```
for(var i=0;i<10;i++){
    console.log(i);
}
0
1
2
3
4
5
6
7
8
9
console.log(i);
10
```

함수에서 선언된 var

```
function hi(){
    for(var i=0;i<10;i++){
        console.log(i);
    }
}
hi()
0
1
2
3
4
5
6
7
8
9
console.log(i);
Uncaught ReferenceError: i is not defined
    at <anonymous>:1:1
```

이는 자바스크립트를 사용하는 개발자들을 혼란시킨다. 위는 매우 간단한 예제이지만 코드가 복잡해질 수록 더욱 더 혼란스러워진다.

let과 const는 블록 레벨 스코프이다. 즉, 모든 블록에서 선언된 변수가 지역변수로 저장된다.

함수가 아닌 곳에서 선언된 let

```
for(var i=0;i<10;i++){
    console.log(i);
}
0
1
2
3
4
5
6
7
8
9
console.log(i);
Uncaught ReferenceError: i is not defined
    at <anonymous>:1:13
```

2. 호이스팅

자바스크립트는 코드 평가 과정을 거쳐서 실행된다. 이 과정중에 변수가 호이스팅된다. 즉 뒤에서 선언한 변수가 앞에서 참조할 수 있게 되는 것이다.

var에서 호이스팅 예시

```
console.log(i); // undefined
var i=1;
console.log(i); // 1
```

보통 다른 언어에서는(다른 언어를 잘 몰라서 틀릴지도 모른다) 변수를 맨 위에 선언한다. 자바스크립트에서는 이렇게 중간에 선언을 해도 괜찮다. 그런데 우리는 i가 선언되고 할당된 후에 로그가 찍히는 것을 원한다. 그런데 선언만 되고 할당이 되지 않았다.(더 정확히는 undefined가 할당되고 1로 재할당 되기 이전에 undefined 로그가 찍힌것이다.) 이런 경우에는 에러를 발생시키는 것이 더 좋다.

let(const)에서 호이스팅 예시

```
console.log(i);
ReferenceError: i is not defined
let i=1;
console.log(i);
```

마치 호이스팅이 발생하지 않는 것 같다. 하지만 호이스팅은 발생한다. var와 다르게 동작할 뿐이다. let, const로 변수를 할당하면 선언은 되지만 초기화(undefined 할당)가 되지 않는다. 변수의 선언과 초기화 사이에 일시적으로 변수 값을 참조할 수 없는 구간을 TDZ(Temporal Dead Zone)라고 한다.

추가내용 : debugger를 찍어보니 undefined가 할당되어 있다. 찾아본 내용과 조금 다르다... 모르겠다. 초기화가 TDZ에서 되지 않는다고 했는데 브라우저 상에서는 undefined가 할당되어 있고 a에 접근할 수 없다. 잘 아시는 분 있다면 알려주세요

TDZ 확인 예시

```
let a=10;
console.log(a);
(function(){
    console.log(a);
    let a=1;
    console.log(a);
})()
Uncaught ReferenceError: Cannot access 'a' before initialization
```

3. 중복 선언

var는 중복선언이 가능하다. 이는 개발자에게 혼란을 준다. 그래서 let, const는 중복 선언이 되지 않는다. 물론 다른 스코프에서는 중복 선언이 가능하다.

let 중복 선언 에러 예시

```
let i=1;
let i=100;
SyntaxError: Identifier 'i' has already been declared
```

4. 재할당

var는 중복 선언 뿐만 아니라 재할당도 가능하다. 이것도 막는 것이 좋아 보인다. 그런데 재할당이 필요한 경우가 존재한다. 가장 대표적인 for문만 하더라도 재할당이 필요하다. 이것이 let과 const 두 가지 변수 선언방법이 추가된 이유이다. 재할당이 필요없는 경우는 const, 재할당이 필요한 경우는 let으로 선언하는 것이다. 즉 기본적으로 모든 변수는 const로 할당하고 필요한 경우만 let으로 변경하자.

5. 전역 객체 프로퍼티

함수 레벨 스코프를 설명하면서 나온 얘기긴 한데 조금 더 세부적으로 얘기하겠다. 함수 스코프를 제외한 나머지 스코프에서 선언된 var는 모두 전역 변수이다. 즉 window 객체 안에 존재한다. 위에서 설명했듯이 무분별한 전역 변수 생성은 좋지 않다.

```
let a=1; undefined
window.a undefined
```

## 콜백함수 vs 고차함수

### 콜백함수

- 정의 : 다른 함수에 매개 변수(argument)로 넘겨준 함수

즉 함수를 호출할 때 인자에 함수를 넣는 다면 그 함수가 바로 콜백함수다. 이게 가능한 이유는 자바스크립트는 함수는 일급 객체이기 때문이다.
자바스크립트에서 콜백함수는 많이 사용되는 패턴이다. 콜백함수를 사용하는 여러가지 이유가 있겠지만 가장 큰 이유는 비동기 처리 방식의 문제점을 해결하기 때문이다.
ajax 통신을 생각해보자. 페이스북에 접속하면 로그인 정보를 확인하고 그에 따른 처리를 한다. 로그인 정보를 확인할 때 비동기 통신이 이용된다. 그런데 우리는 데이터를 받아오고 그 후에 처리를 해야한다. 즉 비동기를 동기적으로 만들필요가 있다. 이런 경우에 콜백함수를 이용한다. 데이터를 받아오고 그 후에 콜백함수를 실행하는 것이다. 그런데 이 콜백함수를 사용하다보면 콜백지옥이라는 문제에 빠지게 된다. 이를 개선하기 위해 promise가 나왔고 그 promise를 기반으로 발전시킨 기술이 async await다.

### 고차함수

- 정의 : 함수를 인자(argument)로 전달받거나 함수를 결과로 리턴하는 함수

배열에서 흔하게 사용하는 sort, forEach, map, filter 등이 고차함수의 대표적인 예시다. 고차함수와 비슷한 개념으로 리액트에서 고차 컴포넌트를 사용하기도 한다.

## this

자바스크립트에서 this는 함수를 호출하는 방법에 의해 결정된다.

1. 일반함수 : this는 전역객체(웹이라면 window)를 가리킨다.

```
function hi(){
    console.log(this);
}
hi();
// Window {0: Window, window: Window, self: Window, document: document, name: '', location: Location, …}
```

2. 메서드 : this는 호출한 객체를 가리킨다.

```
const obj={
    a:10,
    b(){
        console.log(this);
    },
    c:function(){
        console.log(this);
    }
}

obj.b()
// {a: 10, b: ƒ, c: ƒ}

obj.c()
// {a: 10, b: ƒ, c: ƒ}
```

3. 생성자 함수 : 생성자 함수가 생성한 인스턴스를 가리킨다.

4. 화살표 함수 : 외부 스코프의 this를 가리킨다.

```
function Animal(name){
    this.name=name;
    console.log(this);
}

const dog=new Animal('dog')
// Animal {name: 'dog'}
```

5. apply, call, bind : 인수에 의해 결정

## 화살표함수

1. 화살표 함수는 인스턴스를 생성할 수 없는 non-constructor이다. 즉 생성자 함수 불가

2. 중복된 매개변수 이름을 선언할 수 없다.

3. 화살표 함수는 함수 자체의 this, arguments, super, new.target 바인딩을 갖지 않는다.

여기서 this 바인딩을 갖지 않는다는 것이 가장 중요하다. 자바스크립트에서는 스코프를 잘 생각해야한다. 바로 한단계 위의 스코프를 가져오고 싶다면 화살표 함수를 이용하자.

## apply, call, bind

### apply, call

apply와 call 메서드의 본질적인 기능은 함수를 호출하는 것이다. 첫번째 인자는 호출할 함수의 this에 바인딩 된다. apply는 두번째 인자에 배열을 넣고 call은 여러개의 인자를 쉼표로 구분해 넣어준다. 이렇게 하면 함수에 인수를 전달하게 된다.

```
function hi() {
  console.log(arguments);
  console.log(this);
}
hi.apply({ 1: 10 }, [1, 2, 3]);
[Arguments] { '0': 1, '1': 2, '2': 3 }
{ '1': 10 }

hi.call({ 2: 20 }, 4, 5, 6);
[Arguments] { '0': 4, '1': 5, '2': 6 }
{ '2': 20 }
```

### bind

bind 메서드는 this로 사용할 객체만 전달한다.

```
function hi() {
  console.log(this);
}
hi.bind({1:10});
hi.bind({1:10})();
{ '1': 10 }

const person = {
  name: 'min',
  hi(callback) {
    callback.bind(this)();
  },
};

person.hi(function () {
  console.log(`my name is ${this.name}`);
});
```

## 실행 컨텍스트

## 클로저

클로저는 함수와 그 함수가 선언된 렉시컬 환경과의 조합이다. 상태가 의도치 않게 변경되지 않도록 안전하게 은닉하고 특정 함수에게만 상태 변경을 허용하여 상태를 안전하게 변경하고 유지하기 위해 사용한다.(설명 추가 예정)

[클로저 mdn 설명](https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures)

## 싱글스레드, 동기

자바스크립트튼 싱글스레드 동기 언어이다. 그런데 setTimeout이나 ajax함수를 사용할 때 그렇지 않은 것처럼 동작한다. 브라우저에서는 자바스크립트 엔진만으로 동작하지 않는다. web API가 존재한다. web API를 이용해서 비동기를 사용할 수 있다. 그런데 비동기로 동작하는데 스레드가 하나인것은 조금 이상하다. 그 이유는 자바스크립트 엔진과 이벤트루프에 있다.

## 자바스크립트 엔진과 이벤트루프

자바스크립트 엔진은 힙과 콜스택으로 이루어져 있다.

힙 : 객체가 저장되는 메모리 공간이다. 객체는 크기가 정해져있지 않기 때문에 구조화 되어있지 않다.

콜 스택 : 소스코드 평가 과정에서 생성된 실행 컨텍스트가 추가되고 제거되는 스택 자료구조인 실행 컨텍스트 스택이 바로 콜 스택이다. 함수를 호출하면 함수 실행 컨텍스트가 순차적으로 콜 스택에 푸시되어 순차적으로 실행된다. 자바스크립트 엔진은 하나의 콜 스택을 사용하기 때문에 최상위 실행 컨텍스트(실행 중인 실행 컨텍스트)가 종료되어 콜 스택에서 제거되기 전까지는 다른 어떤 테스크도 실행되지 않는다.

태스크 큐 : 비동기 함수의 콜백 함수 또는 이벤트 핸들러가 일시적으로 보관되는 영역이다. 태스크 큐와는 별도로 프로미스의 후속 처리 메서드의 콜백 함수가 일시적으로 보관되는 마이크로태스크 큐도 존재한다.

이벤트 루프 : 이벤트 루프는 콜 스택에 현재 실행 중인 실행 컨텍스트가 있는지, 그리고 태스크 큐에 대기 중인 함수가 있는지를 반복해서 확인한다. 만약 콜 스택이 비어 있고 태스크 큐에 대기 중인 함수가 있다면 이벤트 루프는 순차적FIFO으로 태스크 큐에 대기 중인 함수를 콜 스택으로 이동시킨다. 이때 콜 스택으로 이동한 함수는 실행된다. 즉, 태스크 큐에 일시 보관된 함수들은 비동기 처리 방식으로 동작한다.

## 이벤트(버블링, 캡쳐링, 위임)

### 이벤트 버블링

이벤트는 상위 태그로 전달된다. body>div>button에서 버튼을 선택한다면 button, div, body로 전달되는 것이다.

### 이벤트 캡쳐링

이벤트 버블링과 반대로 하위 태그로 이벤트가 전달되는 것을 말한다. addEventListener의 세번째 인자에 true를 넣으면 이벤트 버블링 대신에 이벤트 캡쳐링이 적용된다.

### 이벤트 위임

상위 요소에 이벤트 핸들러를 등록하는 것을 말한다. 이벤트를 일일히 요소마다 전달하면 비효율적이다. 이때 이벤트 위임을 사용하면 이벤트 수를 줄일 수 있다.

#### 이벤트 위임의 장점

1. 동적인 엘리먼트에 대한 이벤트 처리가 수월하다. 예를 들면 상위 엘리먼트에서만 이벤트 리스너를 관리하기 때문에 하위 엘리먼트는 자유롭게 추가 삭제할 수 있다.
2. 동일한 이벤트에 대해 한 곳에서 관리하기 때문에 각각의 엘리먼트를 여러 곳에 등록하여 관리하는 것보다 관리가 수월하다.
3. 메모리 사용량이 줄어든다. 동적으로 추가되는 이벤트가 없어지기 때문에 당연한 결과이다. 1000건의 각주를 등록한다고 생각해보면 고민할 필요로 없는 일이다.
4. 메모리 누수 가능성도 줄어든다. 등록 핸들러 자체가 줄어들기 때문에 메모리 누수 가능성도 줄어든다.

-- 출처 : https://ui.toast.com/weekly-pick/ko_20160826

## AJAX와 XMLHTTPRequest

## REST API

## 프로미스

## async await

## 제너레이터

## 프로토타입

## 객체지향
