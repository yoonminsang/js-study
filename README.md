# 자바스크립트 기본기 공부

[자바스크립트의 특징](#자바스크립트의-특징)

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
for(let i=0;i<10;i++){
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

#### 헷갈리기 쉬운 bind 예제

mdn에서 예제를 참고해 조금 변형해봤다. 한번 살펴보자

```
var x = 10;
const modules = {
  x: 20,
  getX: function () {
    return this.x;
  },
};

console.log(modules.getX());
// 1 : expected output: 20

const unboundGetX = modules.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// 2 : expected output: 10
```

unboundGetX라는 변수에 module.getX를 할당한다. 함수이기 때문에 참조값이 복사되고 module.getX와 unboundGetX는 정확히 일치한다. 그런데 1의 결과와 2의 결과가 다르다. 어째서 2에서는 전역 객체에서 x의 값을 가져오는 것일까?? (참고로 const로 x를 선언하면 당연히 undefined를 뱉는다. var는 함수레벨스코프이기 때문에 전역객체이고 const는 지역레벨스코프이고 전역 스코프에서 값을 할당해도 전역 객체에 저장되지 않는다)

자바스크립트는 렉시컬 스코프임을 생각해보자. 함수를 어디서 선언했는지에 따라 상위 스코프를 결정한다. 어디서 호출했는지는 상관이 없다. 즉 unboundGetX 함수는 전역에서 실행을 했고 실행된 함수는 일반함수이기 때문에 this는 전역 객체를 가리키게 된다. modules.getX에서는 객체에서 객체의 메서드를 호출했다. 즉 this는 호출한 객체를 가리키게 된다. 객체의 메서드를 함수로 저장하고 객체의 this에 접근할 방법이 있을까?? 이런 경우에 bind를 사용할 수 있다.

```
const boundGetX = unboundGetX.bind(modules);
console.log(boundGetX());
// expected output: 20
```

#### 리액트 컴포넌트에서의 bind 사용 예시

리액트에서도 마찬가지다. 클래스형 리액트 예시를 보면 꼭 bind를 해주는 부분이 있을 것이다. 위에서 말한 예시와 일치한다. 버튼의 onclick에 넣는 함수는 일반 함수에서 선언한 것이 되기 때문에 this는 전역 객체를 가리키게 된다. 그래서 보통 생성자에서 bind를 해준다. 이 귀찮은 작업을 막기위해 화살표 함수나 커링 방식을 이용하기도 한다. 하지만 커링 방식은 가독성이 떨어지고 화살표함수는 클래스에서 성능이 떨어진다. 그래서 autobind decorator라는 라이브러리를 사용하기도 한다.

```
import React from 'react';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState((state) => ({ count: state.count + 1 }));
  }

  render() {
    return <button onClick={this.onClick}>+</button>;
  }
}
```

## 실행 컨텍스트

### 실행 컨텍스트 정의

실행 컨텍스트는 실행할 코드에 제공할 환경 정보들을 모아놓은 객체이다.

### 실행 컨텍스트 생성되는 시점

1. 자동으로 생성되는 전역 컨텍스트
2. eval 함수 실행
3. 함수 실행
4. {}코드 블록 사용시에 생성된다.

### 실행 컨텍스트 구성

- VariableEnvironment : 최초의 스냅샷의 개념으로 변경되는 컨텍스트 정보에 대해 업데이트를 하지 않는다.

- LexicalEnvironment : environmentRecord 와 outerEnvironmentReference 의 객체를 가지고 있다

- ThisBinding : 상황에 따라 적절한 this를 지정한다.(environmentRecord 내부의 슬롯에 바인딩)

#### environmentRecord

현재 컨텍스트와 관련된 코드의 식별자 정보들이 저장된다.

- 매개변수 식별자
- 함수 자체
- 함수 내부의 식별자

코드가 실행되기 전에 식별자를 알기 때문에 자바스크립트에서 호이스팅이 일어난다는 말을 하는 것이다.

그리고 global environmentRecord는 조금 다르다. object environment record, declarative environment record 두 record로 구성된다.

##### this 바인딩

environment record의 내부 슬롯에 this가 바인딩된다. 참고로 전역 environment record를 구성하는 object environment record와 declarative environment record에는 this 바인딩이 없다. this 바인딩은 전역 환경 레코드와 함수 환경 레코드에만 존재한다.

##### object environment record

object environment record는 var 키워드로 선언한 전역 변수와 함수 선언문으로 정의한 전역 함수, 빌트인 전역 프로퍼티와 빌트인 전역 함수, 표준 빌트인 객체를 관리한다.

object environment record는 BindingObject(전역 객체)라고 부르는 객체와 연결된다.

var 키워드로 선언한 전역 변수와 함수 선언문으로 정의된 전역 함수는 전역 environment record의 object environment record에 연결된 BindingObject를 통해 전역 객체의 프로퍼티와 메서드가 된다. 그리고 이때 등록된 식별자를 전역 environment record의 object environment record에서 검색하면 전역 객체의 프로퍼티를 검색하여 반환한다.

이때 var는 선언 단계와 초기화 단계가 동시에 진행되기 때문에 코드 실행 단계 이전에 참조할 수 있다.

##### declarative environment record

declarative environment record는 let, const 키워드로 선언한 전역 변수를 관리한다.

let, const 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 되지 않고 개념적인 블록 내에 존재하게 된다고 했는데, 이때 개념적인 블록이 바로 전역 환경 레코드의 declarative environment record다. 따라서 window.y로 참조할 수 없고 const 키워드로 선언한 변수는 선언 단계와 초기화 단계가 분리되어 진행하기 때문에 일시적 사각지대가 있다.(호이스팅은 일어남)

#### outerEnvironmentReference

현재 호출된 함수가 선언될 당시의 LexicalEnvironment를 참조한다.(상위 LexicalEnvironment를 참조한다) 이것으로 scope chain이 가능해진다.

scope는 식별자에 대한 유효범위이다. scope A의 내부에서 선언된 변수는 오직 A 내부에서만 접근할 수 있고 A의 외부에서 선언된 변수는 A의 외부, 내부에서 모두 접근할 수 있다.

scope chain은 식별자의 유효범위를 안에서 바깥으로 차례차례 검색하는 것이다.

ex)

```
// 전역 컨텍스트
var x = 1; // window에 저장(this=window) (object environment record의 BindingObject에 접근, window에 연결
const y = 2; // declarative envrionmentRecord에 저장
function foo(a) {
  // foo 컨텍스트
  var x = 10; // window에 저장(this=window)
  const y = 20; // foo 함수의 envrionmentRecord에 저장
  function bar(b) {
    // bar 컨텍스트
    const z = 30; // bar 함수의 envrionmentRecord에 저장
    console.log(a, b, x, y, z);
  }
  bar(2); // bar가 실행될 때 foo의 LexcicalEnvironemnt를 outerEnvironmentReference로 참조
}
foo(1); // foo가 실행될 때 전역 컨텍스트의 LexcicalEnvironemnt를 outerEnvironmentReference로 참조

```

참고블로그
[https://junilhwang.github.io/TIL/Javascript/Domain/Execution-Context](https://junilhwang.github.io/TIL/Javascript/Domain/Execution-Context)
[https://medium.com/crocusenergy/js-%EC%8B%A4%ED%96%89-%EC%BB%A8%ED%85%8D%EC%8A%A4%ED%8A%B8-2b8ab8da4f4](https://medium.com/crocusenergy/js-%EC%8B%A4%ED%96%89-%EC%BB%A8%ED%85%8D%EC%8A%A4%ED%8A%B8-2b8ab8da4f4)

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

## AJAX(Asynchronous JavaScript and XML)

자바스크립트를 사용하여 브라우저가 서버에게 비동기 방식으로 데이터를 요청하고, 서버가 응답한 데이터를 수신하여 웹페이지를 동적으로 갱신하는 프로그래밍 방식이다.

1. 변경할 부분을 갱신하는 데 필요한 데이터만 서버로부터 전송받기 때문에 불필요한 데이터 통신이 발생하지 않는다.

2. 변경할 필요가 없는 부분은 다시 렌더링하지 않는다. 따라서 화면이 순간적으로 깜박이는 현상이 발생하지 않는다.

3. 클라이언트와 서버와의 통신이 비동기 방식으로 동작하기 때문에 서버에게 요청을 보낸 이후 블로킹이 발생하지 않는다.

## XMLHTTPRequest

브라우저는 주소창이나 HTML의 form, a태그를 통해 HTTP 요청 전송 기능을 기본 제공한다. 자바스크립트를 사용하여 HTTP 요청을 전송하려면 XMLHttpRequest 객체를 사용한다. Web API인 XMLHttpRequest 객체는 HTTP 요청 전송과 HTTP 응답 수신을 위한 다양한 메서드와 프로퍼티를 제공한다.

## fetch vs axios

fetch는 es6에서 추가된 XMLHTTPRequest를 간편하게 사용하기 위한 api이다. promise도 지원한다.

axios도 fetch와 기능적으로는 크게 다르지 않다. 하지만 몇가지 차이점이 존재한다.

1. fetch는 es6에 내장되어 있지만 axios는 설치가 필요하다.

2. fetch는 es6에 내장되어 있기 때문에 브라우저 호환성이 좋지 않다.(폴리필을 고려하더라도) 하지만 react native 같은 경우에는 업데이트 버전을 못 따라오기 때문에 fetch를 사용한다고 한다.(나는 native에 대해 무지해서 정확히는 모른다)

3. axios는 fetch에 비해 추가적인 기능들이 있고 개발자를 고려한 부분들이 많다. 예를들면 자동 json 변환이나 보안기능, request 취소 타임아웃, http request에 따른 throw err를 지원한다. 나도 fetch를 사용할때 axios에서 자동으로 지원하는 기능들이 되지 않아서 당황한 기억이 있다.

## REST API

REST는 HTTP를 기반으로 클라이언트가 서버의 리소스에 접근하는 방식을 규정한 아키텍처고, REST API는 REST를 기반으로 서비스 API를 구현한 것을 의미한다.

REST API의 구성 : 자원(URI(엔드포인트)), 행위(HTTP 요청 메서드), 표현(페이로드)

![image](https://user-images.githubusercontent.com/57904979/147813669-de7a2958-628f-4837-b14c-9642c5f220b0.png)

### RESTful

제대로 찾아보니 좀 어렵다. 기본적으로는 REST 방식을 잘 지키면 restful하다고 한다. 예를들면 행위가 post인데 데이터를 업데이트를 하거나 uri를 getpost로 구현하면 restful하지 않다. 아래에 참고한 블로그의 내용을 적어두었다. 후에 정리하겠다.

1. Server-Client(서버-클라이언트 구조)
   자원이 있는 쪽이 Server, 자원을 요청하는 쪽이 Client가 된다.
   REST Server: API를 제공하고 비즈니스 로직 처리 및 저장을 책임진다.
   Client: 사용자 인증이나 context(세션, 로그인 정보) 등을 직접 관리하고 책임진다.
   서로 간 의존성이 줄어든다.
2. Stateless(무상태)
   HTTP 프로토콜은 Stateless Protocol이므로 REST 역시 무상태성을 갖는다.
   Client의 context를 Server에 저장하지 않는다.
   즉, 세션과 쿠키와 같은 context 정보를 신경쓰지 않아도 되므로 구현이 단순해진다.
   Server는 각각의 요청을 완전히 별개의 것으로 인식하고 처리한다.
   각 API 서버는 Client의 요청만을 단순 처리한다.
   즉, 이전 요청이 다음 요청의 처리에 연관되어서는 안된다.
   물론 이전 요청이 DB를 수정하여 DB에 의해 바뀌는 것은 허용한다.
   Server의 처리 방식에 일관성을 부여하고 부담이 줄어들며, 서비스의 자유도가 높아진다.
3. Cacheable(캐시 처리 가능)
   웹 표준 HTTP 프로토콜을 그대로 사용하므로 웹에서 사용하는 기존의 인프라를 그대로 활용할 수 있다.
   즉, HTTP가 가진 가장 강력한 특징 중 하나인 캐싱 기능을 적용할 수 있다.
   HTTP 프로토콜 표준에서 사용하는 Last-Modified 태그나 E-Tag를 이용하면 캐싱 구현이 가능하다.
   대량의 요청을 효율적으로 처리하기 위해 캐시가 요구된다.
   캐시 사용을 통해 응답시간이 빨라지고 REST Server 트랜잭션이 발생하지 않기 때문에 전체 응답시간, 성능, 서버의 자원 이용률을 향상시킬 수 있다.
4. Layered System(계층화)
   Client는 REST API Server만 호출한다.
   REST Server는 다중 계층으로 구성될 수 있다.
   API Server는 순수 비즈니스 로직을 수행하고 그 앞단에 보안, 로드밸런싱, 암호화, 사용자 인증 등을 추가하여 구조상의 유연성을 줄 수 있다.
   또한 로드밸런싱, 공유 캐시 등을 통해 확장성과 보안성을 향상시킬 수 있다.
   PROXY, 게이트웨이 같은 네트워크 기반의 중간 매체를 사용할 수 있다.
5. Code-On-Demand(optional)
   Server로부터 스크립트를 받아서 Client에서 실행한다.
   반드시 충족할 필요는 없다.
6. Uniform Interface(인터페이스 일관성)
   URI로 지정한 Resource에 대한 조작을 통일되고 한정적인 인터페이스로 수행한다.
   HTTP 표준 프로토콜에 따르는 모든 플랫폼에서 사용이 가능하다.
   특정 언어나 기술에 종속되지 않는다.

[참조 블로그](https://gmlwjd9405.github.io/2018/09/21/rest-and-restful.html)

## 프로미스

### 프로미스의 배경, 설명

프로미스는 자바스크립트 비동기 처리에 사용되는 객체이다. 이전에 비동기를 처리할 때는 콜백함수를 사용했다. 그런데 콜백함수가 많아지면 굉장히 복잡한 코드가 된다. 이를 해결하기 위해서 프로미스가 나왔다. 프로미스를 사용하면 마치 동기 메서드처럼 값을 반환할 수 있다. 다만 최종결과를 반환하지는 않는다.

프로미스는 pending, fullfilled, rejected 상태를 가진다. 프로미스는 resolve, reject를 인자로 가진다. resolve를 하면 fullfilled가 return되고 reject를 하면 rejected가 된다.

ex)

```
const number = new Promise((resolve) => {
  setTimeout(() => resolve('success'));
});
console.log(number); // Promise { <pending> }
number.then((v) => console.log(v)); // success

const number2 = new Promise((resolve) => {
  setTimeout(() => setTimeout(() => resolve('success')));
});
number2.then((v1) => v1).then((v2) => console.log(v2)); // success

const error = new Promise((resolve, reject) => {
  setTimeout(() => reject('fail'));
});

error.then((v) => console.log(v)).catch((err) => console.error(err));
```

### 프로미스 메서드

- Promise.all : iterable 내의 모든 프로미스가 이행한 뒤 이행한다. 어떤 프로미스가 거부하면 즉시 거부하는 프로미스를 반환한다. 특이점으로는 iterable의 순서를 보장한다.

```
const promise1 = new Promise((resolve) =>
  setTimeout(() => {
    console.log(1);
    resolve(1);
  })
);
const promise2 = new Promise((resolve) =>
  setTimeout(() => {
    console.log(2);
    resolve(2);
  })
);
const promise3 = new Promise((resolve) =>
  setTimeout(() => {
    console.log(3);
    resolve(3);
  })
);
Promise.all([promise1, promise2, promise3]).then((v) => {
  console.log(v);
});

1
2
3
[ 1, 2, 3 ]

const promise1 = new Promise((resolve) => setTimeout(() => resolve(1)));
const promise2 = new Promise((resolve, reject) =>
  setTimeout(() => reject('fail'))
);
const promise3 = new Promise((resolve) => setTimeout(() => resolve(3)));
Promise.all([promise1, promise2, promise3])
  .then((v) => {
    console.log(v);
  })
  .catch((err) => {
    console.log(err);
  });
// fail
```

- Promise.race : iterable 내의 어떤 프로미스가 이행하거나 거부하는 즉시 스스로 이행하거나 거부하는 프로미스를 반환한다. 즉 순서를 보장하지 않는다. 순서를 보장할 필요 없는 경우는 all보다 race를 사용하는 것이 좋다.

```
const promise1 = new Promise((resolve) =>
  setTimeout(() => {
    console.log(1);
    resolve(1);
  }, 200)
);
const promise2 = new Promise((resolve) =>
  setTimeout(() => {
    console.log(2);
    resolve(2);
  }, 100)
);
const promise3 = new Promise((resolve) =>
  setTimeout(() => {
    console.log(3);
    resolve(3);
  }, 500)
);
Promise.race([promise1, promise2, promise3]).then((v) => {
  console.log('v', v);
});

2
v 2
1
3
```

- Promise.reject : 거부하는 프로미스 객체를 반환한다.

- Promise.resolve : 주어진 값으로 이행하는 Promise 객체를 반환한다.

```
const promise1 = Promise.resolve('success');
promise1.then((v) => {
  console.log(v);
});
success

const promise2 = Promise.reject('fail');
promise2.catch((err) => {
  console.log(err);
});
fail
```

## async await

비동기 함수를 사용할 때 콜백함수를 사용하고 이에 불편함을 느껴서 프로미스가 나왔다. 그런데 이것도 사용하다보니 조금 불편하다. then then then이 콜백헬까지는 아니지만 조금 불편하다. 그래서 이번에는 asyn await가 나왔다.

### async

먼저 async 함수를 만들어야 한다. async 함수에서 return한 값은 promise를 return 한다. fullfil promise가 반환되기 때문에 then을 사용해야 한다.

```
async function hi() {
  return 'hi';
}
console.log(hi());
Promise { 'hi' }

hi().then((v) => {
  console.log(v);
});
hi
```

### await

이제 비동기 함수를 await와 함께 사용하면 엄청난 장점이 보인다. await는 promise 기반 함수 앞에 놓을 수 있다. 그러면 promise가 fulfil될 때 까지 잠시 중단하고 결과를 반환하다. 그리고 실행을 기다리는 다른 코드들은 중지되지 않고 실행된다.(async 함수 내부에서만 중지되고 다른 코드는 중지x) await 키워드는 웹 API를 포함하여 Promise를 반환하는 함수를 호출할 때 사용할 수 있다.

```
const resolveA = () => new Promise((resolve) => setTimeout(() => resolve('a')));
const resolveB = () => new Promise((resolve) => setTimeout(() => resolve('b')));
const resolveC = () => new Promise((resolve) => setTimeout(() => resolve('c')));

async function asyncEx() {
  const a = await resolveA();
  const b = await resolveB();
  const c = await resolveC();
  console.log(a, b, c);
}

asyncEx();
```

## 마이크로 테스크 큐 vs 매크로 테스크 큐

자바스크립트의 이벤트 루프에서 테스크 큐를 생각해보자. 테스크 큐에는 마이크로 테스크큐와 매크로 테스크큐가 있다.

### 테스크 큐(마이크로, 매크로) 동작 방식

1. 현재 호출 스택에 있는 모든 함수가 실행된다. 값을 반환하면 스택에서 pop된다.
2. 호출 스택이 비어 있으면 대기중인 모든 마이크로 태스크가 호출 스택에 하나씩 push한다.
3. 호출 슽택과 마이크로 작업 대기열이 모우 비어있으면 이벤트 루프는 매크로 큐를 확인하고 존재한다면 호출 스택에 push한다.

- 마이크로 테스크 큐에 넣는 함수

  - process.nextTick
  - Promise
  - Object.observe
  - MutationObserver

- 매크로 테스크 큐에 넣는 함수
  - setTimeout
  - setInterval
  - setImmediate
  - requestAnimationFrame
  - I/O
  - UI 렌더링

ex)

```
console.log('start');
setTimeout(() => {
  console.log(1);
}, 0);
Promise.resolve()
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  });
console.log('end');
start
end
2
3
1
```

## undefined vs null

### undefined

- 값을 할당하지 않은 변수
- parameter가 있는 함수를 parameter의 개수보다 작은 argument로 호출했을 때 변수를 전달받지 않은 값
- 함수가 값을 return 하지 않을 때

### null

- 의도적인 비어있음

결론 : 코드를 작성할 때는 null을 사용하는 것이 좋다. 하지만 유저 정보같이 서버에서 받아오기 전에 존재하는 상태는 undefined로 할당하는게 좋지 않을까?? 보편적으로는 null을 사용하는 것 같다.

## 프로퍼티 어트리뷰트

## 프로토타입

https://ms3864.tistory.com/404

https://ms3864.tistory.com/329

https://poiemaweb.com/js-prototype

## 이터러블

Symbol.iterator를 프로퍼티 키로 사용한 메서드를 직접 구현하거나 프로토타입 체인을 통해 상속 받은 Symbol.iterator 메서드를 가지고 있다면 이터러블 프로토콜을 만족하며 이터러블이다. for...of 문으로 순회할 수 있으며 스프레드 문법과 배열 디스트럭처링 할당의 대상으로 사용할 수 있다.

## 이터레이터

이터러블의 Symbol.iterator 메서드를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환한다. 이터레이터는 next 메서드를 소유하며 next 메서드를 호출하면 이터러블을 순회하며 value와 done 프로퍼티를 갖는 이터레이터 리절트 객체를 반환한다. 이터레이터 프로토콜을 준수한 객체를 이터레이터라 한다. 이터레이터는 이터러블의 요소를 탐색하기 위한 포인터 역할을 한다. next메서드는 모든 요소를 순회하게 되면 value프로퍼티는 undefined, done프로퍼티는 true가 된다.

### for...of문

for of 문은 내부적으로 이터레이터의 next 메서드를 호출하여 이터러블을 순회하며 next 메서드가 반환한 이터레이터 리절트 객체의 value 프로퍼티 값을 for .. of 문의 변수에 할당한다. 그리고 이터레이터 리절트 객체의 done 프로퍼티 값이 false이면 이터러블의 순회를 계속하고 true이면 이터러블의 순회를 중단한다.

아래는 for of문 예시와 for of문을 사용하지 않고 for of 문을 구현한 코드다.

```
for (const item of [1, 2, 3]) {
  // item 변수에 순차적으로 1, 2, 3이 할당된다.
  console.log(item); // 1 2 3
}

// 이터러블
const iterable = [1, 2, 3];

// 이터러블의 Symbol.iterator 메서드를 호출하여 이터레이터를 생성한다.
const iterator = iterable[Symbol.iterator]();

for (;;) {
  // 이터레이터의 next 메서드를 호출하여 이터러블을 순회한다. 이때 next 메서드는 이터레이터 리절트 객체를 반환한다.
  const { done, value } = iterator.next();

  // next 메서드가 반환한 이터레이터 리절트 객체의 done 프로퍼티 값이 true이면 이터러블의 순회를 중단한다.
  if (done) break;

  // 이터레이터 리절트 객체의 value 프로퍼티 값을 item 변수에 할당한다.
  console.log(value); // 1 2 3
}

```

### 사용자 정의 이터러블(피보나치)

직접 이터러블을 정의해보자.

```
// 피보나치 수열을 구현한 사용자 정의 이터러블을 반환하는 함수. 수열의 최대값을 인수로 전달받는다.
const fibonacciFunc = function (max) {
  let [pre, cur] = [0, 1];

  // Symbol.iterator 메서드를 구현한 이터러블을 반환한다.
  return {
    [Symbol.iterator]() {
      return {
        next() {
          [pre, cur] = [cur, pre + cur];
          return { value: cur, done: cur >= max };
        }
      };
    }
  };
};

// 이터러블을 반환하는 함수에 수열의 최대값을 인수로 전달하면서 호출한다.
for (const num of fibonacciFunc(10)) {
  console.log(num); // 1 2 3 5 8
}
```

만약 이터레이터를 생성하려면 이터러블의 Symbol.iterator 메서드를 호출해야 한다.

이터러블이면서 이터레이터인 객체를 생성하면 Symbol.iterator 메서드를 호출하지 않아도 된다.

```
// 이터러블이면서 이터레이터인 객체를 반환하는 함수
const fibonacciFunc = function (max) {
  let [pre, cur] = [0, 1];

  // Symbol.iterator 메서드와 next 메서드를 소유한 이터러블이면서 이터레이터인 객체를 반환
  return {
    [Symbol.iterator]() { return this; },
    // next 메서드는 이터레이터 리절트 객체를 반환
    next() {
      [pre, cur] = [cur, pre + cur];
      return { value: cur, done: cur >= max };
    }
  };
};

// iter는 이터러블이면서 이터레이터다.
let iter = fibonacciFunc(10);

// iter는 이터러블이므로 for...of 문으로 순회할 수 있다.
for (const num of iter) {
  console.log(num); // 1 2 3 5 8
}

// iter는 이터러블이면서 이터레이터다
iter = fibonacciFunc(10);

// iter는 이터레이터이므로 이터레이션 리절트 객체를 반환하는 next 메서드를 소유한다.
console.log(iter.next()); // { value: 1, done: false }
console.log(iter.next()); // { value: 2, done: false }
console.log(iter.next()); // { value: 3, done: false }
console.log(iter.next()); // { value: 5, done: false }
console.log(iter.next()); // { value: 8, done: false }
console.log(iter.next()); // { value: 13, done: true }
```

```
// 무한 이터러블을 생성하는 함수
const fibonacciFunc = function () {
  let [pre, cur] = [0, 1];

  return {
    [Symbol.iterator]() { return this; },
    next() {
      [pre, cur] = [cur, pre + cur];
      // 무한을 구현해야 하므로 done 프로퍼티를 생략한다.
      return { value: cur };
    }
  };
};

// fibonacciFunc 함수는 무한 이터러블을 생성한다.
for (const num of fibonacciFunc()) {
  if (num > 10000) break;
  console.log(num); // 1 2 3 5 8...4181 6765
}

// 배열 디스트럭처링 할당을 통해 무한 이터러블에서 3개의 요소만 취득한다.
const [f1, f2, f3] = fibonacciFunc();
console.log(f1, f2, f3); // 1 2 3
```

- 참고책 : 자바스크립트 딥 다이브

## 제너레이터

코드 블록의 실행을 일시 중지했다가 필요한 시점에 재개할 수 있는 특수한 함수

### 제너레이터와 일반 함수와 차이점

1. 제너레이터 함수는 함수 호출자에게 함수 실행의 제어권을 양도할 수 있다.

2. 제너레이터 함수는 함수 호출자와 함수의 상태를 주고받을 수 있다.

3. 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.

### 제너레이터 함수 예시

```
// 제너레이터 함수 선언문
function* genDecFunc() {
  yield 1;
}

// 제너레이터 함수 표현식
const genExpFunc = function* () {
  yield 1;
};

// 제너레이터 메서드
const obj = {
  * genObjMethod() {
    yield 1;
  }
};

// 제너레이터 클래스 메서드
class MyClass {
  * genClsMethod() {
    yield 1;
  }
}

// 화살표 함수, 생성자 함수 xxxxxxxx
```

### 제너레이터의 메서드

제너레이터 객체는 next 메서드를 갖는 이터레이터이지만 이터레이터에는 없는 return, throw 메서드를 갖는다. 제너레이터 객체의 세 개의 메서드를 호출하면 다음과 같이 동작한다.

1. next 메서드를 호출하면 제너레이터 함수의 yield 표현식까지 코드 블록을 실행하고 yield된 값을 value 프로퍼티 값으로, false를 done 프로퍼티 값으로 갖는 이터레이터 리절트 객체를 반환한다.

2. return 메서드를 호출하면 인수로 전달받은 value 프로퍼티 값으로, true를 done 프로퍼티 값으로 갖는 이터레이터 리절트 객체를 반환한다.

3. throw 메서드를 호출하면 인수로 전달받은 에러를 발생시키고 undefined를 value 프로퍼티 값으로, true를 done 프로퍼티 값으로 갖는 이터레이터 리절트 객체를 반환한다.

### 제너레이터 예시(피보나치)

```
// 무한 이터러블을 생성하는 제너레이터 함수
const infiniteFibonacci = (function* () {
  let [pre, cur] = [0, 1];

  while (true) {
    [pre, cur] = [cur, pre + cur];
    yield cur;
  }
}());

// infiniteFibonacci는 무한 이터러블이다.
for (const num of infiniteFibonacci) {
  if (num > 10000) break;
  console.log(num); // 1 2 3 5 8...2584 4181 6765
}
```

### 제너레이터는 이터러블 객체를 편하게 사용하기 위한것??

그것도 맞지만 'yield’를 사용해 제너레이터 안·밖으로 정보 교환하는 강력한 기능이 있다.

```
function* gen() {
  // 질문을 제너레이터 밖 코드에 던지고 답을 기다립니다.
  let result = yield "2 + 2 = ?"; // (*)

  alert(result);
}

let generator = gen();

let question = generator.next().value; // <-- yield는 value를 반환합니다.

generator.next(4); // --> 결과를 제너레이터 안으로 전달합니다.
```

```
function* gen() {
  let ask1 = yield "2 + 2 = ?";

  alert(ask1); // 4

  let ask2 = yield "3 * 3 = ?"

  alert(ask2); // 9
}

let generator = gen();

alert( generator.next().value ); // "2 + 2 = ?"

alert( generator.next(4).value ); // "3 * 3 = ?"

alert( generator.next(9).done ); // true
```

- 참고 코드 : https://ko.javascript.info/generators

### async await

제너레이터보다 가독성 좋게 비동기 처리를 동기 처리처럼 구현할 수 있는 async await. 프로미스를 기반으로 동작

https://meetup.toast.com/posts/73

https://medium.com/@la.place/async-await%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EA%B5%AC%ED%98%84%ED%95%98%EB%8A%94%EA%B0%80-fa08a3157647

https://ko.javascript.info/async-iterators-generators

## 래퍼객체

생성자 함수에 prototype이 존재하고 이를 이용할 수 있다. 생성자 함수를 사용하지 않으면 임시로 래퍼 객체를 만들어서 생성자함수(String 등등).prototype의 메서드를 상속받아 사용할 수 있다.

문자열이나 숫자, 불리언 등의 원시값이 있는데도 문자열, 숫자 불리언 객체를 생성하는 String, Number, Boolean 등의 표준 빌트인 생성자 함수가 존재한다.

ex) arr.sort();

## 객체지향
