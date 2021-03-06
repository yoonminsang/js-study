# 리액트 기본기 공부

- [리액트의 특징](#리액트의-특징)
- [리액트 단점](#리액트-단점)
- [코드 스플리팅](#코드-스플리팅)
- [context](#context)
- [재조정(reconciliation)](#재조정reconciliation)
- [데이터 흐름](#데이터-흐름)
- [immutable](#immutable)
- [리액트 훅스 동작원리(클로저)](#리액트-훅스-동작원리클로저)
- [고차 컴포넌트(hoc)](#고차-컴포넌트hoc)
- [디자인 패턴](#디자인-패턴)
- [클래스형 vs 함수형](#클래스형-vs-함수형)
- [setState 비동기](#setState-비동기)
- [hooks 종류](#hooks-종류)

## 리액트의 특징

리액트는 사용자 인터페이스를 만들기 위한 JavaScript 라이브러리다. 이게 끝이다. 그저 view를 위한 라이브러리리다. 그런데 왜 그렇게 리액트에 열광할까?? 그러기 위해서 먼저 리액트의 특징부터 알아보자

1. virtual dom

리액트는 virtual dom 즉 가상 돔을 사용한다. 이전과 현재 값(state)을 비교해 달라지는 부분을 변경하는데 이 과정에서 가상 돔과 diff 알고리즘을 이용한다. 가상 돔이 있어서 손쉽게 개발자가 코드를 작성할 수 있다. 가상 돔이 없다고 가정해보자. 원하는 부분만 변경하는게 쉽지 않다. 물론 가능은 하지만 코드가 굉장히 지저분해진다. 그래서 전체를 렌더링하기도 한다. 나는 불완전한 방법으로 업데이트가 가능한 컴포넌트 추상 클래스밖에 만들지 못했다. 리액트를 사용하면 편하게 원하는 부분만 변경할 수 있다. 또한 브라우저 속도에서도 이점이 있다. DOM 조작을 할때 reflow, repaint가 발생하는데 virtual dom으로 바뀌는 부분을 한번에 바꿔버리면 연산 비용이 줄어든다. 이 연산이 끝나고 최종적인 변화만 실제 dom에 적용시켜준다.

2. 컴포넌트

리액트는 캡슐화된 컴포넌트를 조합해서 UI를 만든다. DOM을 신경쓰지 않아도 되기때문에 바닐라자바스크립트를 이용하는 것 보다 편하고 컴포넌트 기반이라 구조를 파악하기 쉽고 재사용도 용이하다.

3. JSX

JSX는 JavascriptXml의 약자이다. 말 그대로 자바스크립트를 xml처럼 사용할 수 있게 해주는 리액트의 문법이다. 이를 사용하면 컴포넌트를 쉽게 구성할 수 있다. jsx를 바벨을 통해서 변환해주는 과정을 거친다. map을 사용하는 경우에는 key를 사용한다. Key는 React가 어떤 항목을 변경, 추가 또는 삭제할지 식별하는 것을 돕는다. key는 엘리먼트에 안정적인 고유성을 부여하기 위해 배열 내부의 엘리먼트에 지정해야 한다. 그렇기 때문에 map의 index를 절대 key로 넣어서는 안된다.

ex)
변환전

```
const ex = () => {
  const [state, useState]=useState([1, 2, 3]);
  return (
    <div>
      {state.map((v) => (
        <div key={v}>v</div>
      ))}
    </div>
  );
};
```

변환후

```
const ex = () => {
  const [state, useState] = useState([1, 2, 3]);
  return /*#__PURE__*/React.createElement("div", null, state.map(v => /*#__PURE__*/React.createElement("div", {
    key: v
  }, "v")));
};
```

4. 오직 유저 인터페이스를 위한 라이브러리

리액트의 공식 홈페이지 설명처럼 인터페이스 즉 뷰를 위한 라이브러리다. 그말은 다른 여러가지 라이브러리, 프레임워크와 호환성이 좋다는 것이다. 리액트를 사용하면서 거의 대부분의 라이브러리가 호환이 가능하다. 이것은 엄청난 장점이다.

5. 압도적인 이용자 수

리액트의 특징은 아니지만 이용자 수가 많다는 것은 엄청난 장점이다. 커뮤니티도 활성화 되어있고 자료도 굉장히 많다. 국내에만 해도 리액트 책, 강의가 쏟아져나온다. 또한 취직을 해도 가장 많이 사용하는 기술 스택이 리액트다. 기술 스택이 가장 중요한 것은 아니지만 그래도 기술 스택이 맞으면 유리하다. 2021 12 02기준으로 angular:vue:react = 1:2:5 정도 된다.

## 리액트 단점

1. 리액트는 한번에 모든 내용을 가져오기 때문에 프로젝트가 커지게 되면 시간이 많이 걸린다.

코드 스플리팅 사용

2. 리액트는 CSR(Client Side Rendering)이다. 이는 장단점이 있는데 로딩이 느린대신 작업이 빠르다. 가장 큰 단점은 검색엔진 문제이다. CSR은 처음에 HTML이 비어있기 때문에 웹 크롤링을 하지 못한다.

구글은 CSR을 크롤링할 수 있고 앞으로 다른 사이트들도 가능해질 것이다. + 리액트는 SSR(Server Side Rendering)을 지원한다.

3. 단방향 데이터 바인딩

리액트는 단방향 데이터 바인딩을 한다. 그렇기 때문에 데이터의 흐름을 파악하기 쉽지만 코드량이 많아진다. 꼭 단점이라고 할 수는 없지만 단방향 데이터 바인딩을 선호하지 않는 사람들은 리액트를 선호하지 않는다.

4. 느리다

리액트는 느리다. 응?? virtaul dom으로 빠르다며?? 정확히는 직접 구현하면 더 빠르게 만들 수 있다. 하지만 프로젝트 규모가 커지면 이를 직접 관리하기가 어렵기 때문에 리액트를 사용한다. 그래서 간단한 프로젝트라면 리액트를 꼭 사용하지 않아도 좋다. 뭐든지 유동적으로...

5. 무식한 업데이트

리액트는 트리구조로 되어있는데 a트리의 한 부분과 b트리의 한 부분이 다르다면 거 아래 전체를 바꿔버린다. 이건 효율적인 방법이 아니다. 리액트가 그래도 빠르다고 하는 이유는 diff 알고리즘의 시간 복잡도를 줄였기 때문이다. 조금 효율적으로 사용하려면 react memo, usecallback, usememo등을 이용해 최적화를 해줘야 한다. 여기서도 무조건적으로 memo를 적용하는게 아니라 적절한 상황에만 memo를 해줘야한다. 이는 개발자의 역량에 달렸다.

## 코드 스플리팅

웹팩에서는 모든 파일을 하나의 파일로 합친다. 이에 따른 장점도 있지만 프로젝트의 규모가 커지게되면 파일이 매우 커지게된다. 그러면 로딩이 오래 걸리고 트래픽이 많이 나오고 유저 경험도 나빠진다. 이를 해결하기 위해서 코드를 나누고 필요한 경우에만 불러오게 하는 것이 코드 스플리팅이다.

### dynamic import

먼저 유저가 원하는 경우에 import 하는 방법을 알아보자. 아직 표준 자바스크립트는 아니지만 stage 단계에 있는 dynamic import라는 문법이 있다. cra에서는 기본 설정이 되어 있지만 그렇지 않다면 직접 설정을 해줘야 한다.

npm install babel-plugin-syntax-dynamic-import 으로 설치

babel.config.json

```
{
  "plugins": ["@babel/plugin-syntax-dynamic-import"]
}
```

webpack.config.js

```
module.exports = {
  entry: {
    main: './src/app.js',
  },
  output: {
    // `filename` provides a template for naming your bundles (remember to use `[name]`)
    filename: '[name].bundle.js',
    // `chunkFilename` provides a template for naming code-split bundles (optional)
    chunkFilename: '[name].bundle.js',
    // `path` is the folder where Webpack will place your bundles
    path: './dist',
    // `publicPath` is where Webpack will load your bundles from (optional)
    publicPath: 'dist/'
  }
};
```

사용법은 어렵지 않다. 다음과 같이 사용하면 끝이다. onClick을 했을 때 비동기적으로 ./ex파일을 import하고 then으로 후처리를 해주면 된다.

```
const onClick = () => {
  import('./ex').then(result => result.default());
}
```

### React.lazy, Suspense

코드 스플리팅을 위해 16.6버전부터 리액트에 내장된 기능으로 React.lazy와 Suspense가 있다. 이전에는 위에서처럼 dynamic import를 사용하고 가져온 값을 setState로 넣어주고 그 값을 렌더링해줘야 했다. 하지만 위의 기능이 나오고부터는 훨씬 편리해졌다.

다음과 같이 손쉽게 바로 컴포넌트를 불러올 수 있다. visible이 true가 될때 split 파일을 불러오는 것이다. 그리고 로딩중에는 fallback의 값이 나타난다.

```
import React, { Suspense } from 'react';
const Split = React.Lazy(() => import('./split'));

<Suspense fallback={<div>loading...</div>}>
  {visible && <Split />}
</Suspense>;

```

### Loadable Components

React.lazy와 Suspense는 서버 사이드 렌더링을 지원하지 않는다.(21.12.26 기준) 일년전에도 지원하지 않았는데 언제쯤 지원할까?? 사용법은 React.lazy와 비슷하다. 그리고 몇가지 추가 기능들이 존재한다.

yarn add @loadable/component

```
import React, { useState } from "react";
import loadable from "@loadable/component";

const Split = loadable(() => import("./split"), {
  fallback: <div>loading...</div>,
});

const App = () => {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(true);
  };
  const onMouseOver = () => {
    Split.preload();
  };
  return (
    <div>
      {visible && <Split />}
    </div>
  );
};

export default App;
```

## context

리액트에서는 context API가 존재한다.
리액트에서는 props로 data를 넘겨준다. 그리고 이 props를 모든 컴포넌트에 넘겨줘야 한다던가 여러 곳에 적용해야 한다면 구조가 복잡해진다. 그리고 코드 확장과 유지 보수에도 문제가 생긴다. 그런 경우에 context를 이용해 관리하면 컴포넌트 트리 전체에 데이터를 제공할 수 있다. createContext로 컨텍스트를 만들고 이 컨텍스트의 Provider로 react component를 감싸주면 된다. 그리고 useContext(클래스는 조금 다름)로 데이터를 불러올 수 있다. 리액트 라우터, 리덕스, styled-components 등의 라이브러리는 conext api를 기반으로 만들어졌다.

### vs redux

단순한 전역 상태 관리라면 context api를 사용해도 괜찮다. 하지만 리덕스는 더욱 향상된 성능과 미들웨어, 강력한 개발자 도구, 코드의 높은 유지 보수성을 제공하기 때문에 상황에 맞게 적절히 사용하자. 물론 리덕스가 아니라 다른 상태관리 라이브러리도 마찬가지다.

## 재조정(reconciliation)

리액트는 트리 구조를 가지고 있고 state나 props가 바뀔때마다 새로운 트리를 만들고 기존의 트리와 새로운 트리를 비교해서 효율적으로 ui를 업데이트한다. 최첨단의 dffing 알고리즘도 n개의 엘리먼트가 있는 트리에서 O(n^3)의 복잡도를 가진다. 이 복잡도를 줄이기 위해서 O(n) 복잡도의 휴리스틱 알고리즘을 구현했다.

### 휴리스틱 알고리즘

1. 서로 다른 타입의 두 엘리먼트는 서로 다른 트리를 만들어낸다.
2. 개발자가 key prop을 통해, 여러 렌더링 사이에서 어떤 자식 엘리먼트가 변경되지 않아야 할지 표시해 줄 수 있다.

### diffing 알고리즘

두 개의 트리를 비교할 때 리액트는 루트 엘리먼트부터 비교한다.

#### 엘리먼트의 타입이 다른 경우

타입이 다르면 이전 트리를 버리고 새로운 트리를 구축한다.

#### DOM 엘리먼트의 타입이 같은 경우

변경된 속성만 변경한다. DOM 노드의 처리가 끝나면, 리액트는 이어서 해당 노드의 자식들을 재귀적으로 처리한다.

#### 같은 타입의 컴포넌트 엘리먼트

컴포넌트가 갱신되면 인스턴스는 동일하게 유지되어 렌더링 간 state가 유지된다. React는 새로운 엘리먼트의 내용을 반영하기 위해 현재 컴포넌트 인스턴스의 props를 갱신한다. 그리고 useEffect를 호출한다.(depth에 포함되어 있는 경우)(class형이라면 componentDidUpdate를 호출)

### 자식에 대한 재귀적 처리

DOM 노드의 자식들을 재귀적으로 처리할 때, React는 기본적으로 동시에 두 리스트를 순회하고 차이점이 있으면 변경을 생성한다. 이 경우의 문제점이라고 한다면 데이터의 순서가 바뀔 때 발생한다. state가 배열이고 push하는 경우라면 문제가 없다. 그런데 unshift로 앞에서 추가한다면 형편없이 비교를 한다.

```
<ul>
  <li>A</li>
  <li>B</li>
</ul>

<ul>
  <li>C</li>
  <li>A</li>
  <li>B</li>
</ul>
```

#### keys

그래서 리액트는 key 속성을 사용한다. key 끼리 비교해서 효율적인 비교를 한다. 이 때 주의할 점은 map의 index를 사용해서는 안된다. 재배열되지 않는 경우라면 상관없겠지만 재배열이 되는 경우는 효율적인 비교를 하지 못하게 된다.

```
<ul>
  <li key="A">A</li>
  <li key="B">B</li>
</ul>

<ul>
  <li key="C">C</li>
  <li key="A">A</li>
  <li key="B">B</li>
</ul>
```

## 데이터 흐름

리액트는 단방향 바인딩이다. 그래서 데이터의 흐름을 파악하기 쉽지만 코드량이 많아진다는 단점이 있다.

## immutable

리액트에서 setstate는 immutable로 넣어야한다. immutable의 장점도 있지만 리액트에서는 무조건 immutable을 유지해야 한다. 리액트에서는 virtual dom을 이용해 이전과 이후 트리를 비교해서 업데이트를 한다. 리액트는 클로저를 이용해서 상태값에 접근하는데 mutable로 상태를 바꾸게 되면 이전 트리의 상태도 바뀌게 되서 업데이트가 정상적으로 작동하지 않게된다. 그래서 리액트에서는 꼭 immutable로 상태를 변경하자. immutable 라이브러리를 사용하는 것도 좋은 방법이다.

## 리액트 훅스 동작원리(클로저)

진짜 좋은 글이다. 기존의 클래스 형은 this와의 싸움이였다면 훅스는 클로저와의 싸움...

https://hewonjeong.github.io/deep-dive-how-do-react-hooks-really-work-ko/

## 고차 컴포넌트(hoc)

## 디자인 패턴

## 클래스형 vs 함수형

### 함수형이 나온 이유

원래 리액트는 클래스형으로 시작됬다. 그리고 현재 리액트 공식 홈페이지에서는 훅스를 권장하지만 클래스형을 지양하지는 않는다. 클래스형에서 몇 가지 문제점이 발생했기 때문에 훅스를 만들었다.

1. 컴포넌트 사이에서 상태와 관련된 로직을 재 사용하기 어렵다.

클래스에서는 이를 해결하기 위해서 고차컴포넌트나 render props를 이용했다. 이는 콜백지옥처럼 코드를 알아보기 어려워진다. Hook를 사용하면 컴포넌트로 부터 상태 관련 로직을 추상화 할 수 있다. 이것은 독립적인 테스트와 재사용이 가능하다. Hook는 계층 변화 없이 상태 관련 로직을 재 사용할 수 있도록 한다. 이것은 많은 컴포넌트들이 공유하기 쉬워지는 역할을 한다. 리액트의 내장 훅과 커스텀 훅을 조립해서 새로운 커스텀 훅을 만들수도 있다.

2. 복잡한 컴포넌트들은 이해하기 어렵다.

이것을 해결하기 위해, 생명주기 메서드를 기반으로 쪼개는 데 초점을 맞추기 보다는, Hook을 통해 서로 비슷한 것을 하는 작은 함수의 묶음으로 컴포넌트를 나누는 방법을 사용할 수 있다.

3. Class는 사람과 기계를 혼동 시킨다.

자바스크립트가 탄탄하지 않은 개발자는 클래스형으로 코드를 작성하는 것이 쉽지 않다. this, bind의 기본 개념을 이해하고 있어야 한다. 함수형에서는 이를 신경쓰지 않아도 된다. 하지만 클로저의 개념이...

- 공식문서

## setState 비동기

setState는 비동기로 동작한다. 동기적으로 동작하면 편할것같은데 말이다. setstate에서 ajax 처리를 하는 것도 아니고 settimeout 처리를 하는것도 아닌데 말이다. 조금 관점을 바꿔보자. 굉장히 짧은 시간동안 setstate 동작이 여러번 일어난다고 생각해보자. 그러면 계속해도 렌더링이 일어난다. 이때 setState는 비동기로 동작하고 한번만 리렌더링이 된다. 이런 효율성 문제로 setstate는 비동기로 동작한다. 조금 더 깊게들어가면 shouldComponentUpdate 메서드가 종료되고 render 메서드가 실행되기 직전에 처리된다.(클래스형) 참고로 모든 setstate가 처리되기 전에 컴포넌트가 렌더링되지 않는다.

### setstate 동기 처리 방법

일단 클래스형에서는 setstate 두번째 인자로 콜백함수를 넣어주면 상태를 업데이트하고 콜백함수를 실행한다. 그리고 componentdidupdate에서 처리하는 방법도 있다. 훅스라면 useEffect를 이용한다.

## hooks 종류

### usestate

`const [state, setState] = useState(initialState);`

상태 유지 값과 그 값을 갱신하는 함수를 반환한다. State Hook을 현재의 state와 동일한 값으로 갱신하는 경우 React는 자식을 렌더링 한다거나 무엇을 실행하는 것을 회피하고 그 처리를 종료한다. (React는 Object.is 비교 알고리즘을 사용)

### useEffect

useEffect에 전달된 함수는 화면에 렌더링이 완료된 후에 수행된다. 두번째 배열의 요소가 변경될 때마다 재생성된다. 첫번째 콜백함수의 리턴으로 뒷정리도 가능하다.

### useLayoutEffect

모든 DOM 변경 후에 동기적으로 발생한다. 이것은 DOM에서 레이아웃을 읽고 동기적으로 리렌더링하는 경우에 사용된다. useLayoutEffect의 내부에 예정된 갱신은 브라우저가 화면을 그리기 이전 시점에 동기적으로 수행될 것이다. 화면 갱신 차단의 방지가 가능할 때 표준 useEffect를 먼저 사용해야 한다.

- useEffect의 이펙트는 DOM이 화면에 그려진 이후에 호출된다.
- useLayoutEffect의 이펙트는 DOM이 화면에 그려지기 전에 호출된다.
- 렌더링할 상태가 이펙트 내에서 초기화되어야 할 경우, 사용자 경험을 위해 useLayoutEffect를 활용하자!

https://merrily-code.tistory.com/46

### useContext

`const value = useContext(MyContext);`

context 객체(React.createContext에서 반환된 값)를 받아 그 context의 현재 값을 반환한다. context의 현재 값은 트리 안에서 이 Hook을 호출하는 컴포넌트에 가장 가까이에 있는 \<MyContext.Provider>의 value prop에 의해 결정된다.

useContext의 인자값은 context 그 자체여야 한다.

useContext를 호출한 컴포넌트는 context 값이 변경되면 항상 리렌더링 된다. 컴포넌트를 리렌더링 하는 것에 비용이 많이 든다면, 메모이제이션을 사용하여 최적화할 수 있습니다. https://github.com/facebook/react/issues/15156#issuecomment-474590693

### useReducer

`const [state, dispatch] = useReducer(reducer, initialArg, init);`

useState의 대체 함수다. (state, action) => newState의 형태로 reducer를 받고 dispatch 메서드와 짝의 형태로 현재 state를 반환합니다. (Redux와 비슷)

다수의 하윗값을 포함하는 복잡한 정적 로직을 만드는 경우나 다음 state가 이전 state에 의존적인 경우에 보통 useState보다 useReducer를 선호한다. 또한 useReducer는 자세한 업데이트를 트리거 하는 컴포넌트의 성능을 최적화할 수 있게 하는데, 이것은 콜백 대신 dispatch를 전달 할 수 있기 때문이다. dispatch는 리렌더링될 때 변경되지 않는다. 즉 useEffect, useCallback의 의존성 목록에 포함하지 않아도 괜찮다.

기본적으로 초기 state는 두번째 인자로 지정할 수 있다. 초기 state를 조금 지연해서 생성하고 싶다면 세번째 인자에 함수를 전달한다. 이것은 reducer 외부에서 초기 state를 계산하는 로직을 추출할 수 있도록 한다. 또한, 어떤 행동에 대한 대응으로 나중에 state를 재설정하는 데에도 유용하다.

### useCallback

```
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

의존성이 변경되었을 때만 콜백함수가 실행된다.(메모제이션)

기본적으로 리액트는 props, state, 상위 컴포넌트가 리렌더링 되면 새롭게 생성한다. 이때 변경할 필요가 없는 함수도 새롭게 생성되는데 useCallback으로 이를 막을 수 있다. 또한 자식 컴포넌트에 콜백을 전달할 때 같은 값을 전달할 수 있어서 React.memo와 함께 사용해서 최적화를 한다.

useCallback(fn, deps)은 useMemo(() => fn, deps)와 같다.

### useMemo

의존성이 변경되었을 때에만 메모이제이션된 값을 다시 계산 한다. 모든 렌더링 시의 고비용 계산을 방지하게 해준다. useCallback과 마찬가지로 React.memo와 함께 사용된다.

### useRef

useRef는 .current 프로퍼티로 전달된 인자(initialValue)로 초기화된 변경 가능한 ref 객체를 반환한다. 반환된 객체는 컴포넌트의 전 생애주기를 통해 유지된다.

useRef는 내용이 변경될 때 그것을 알려주지는 않는다. .current 프로퍼티를 변형하는 것이 리렌더링을 발생시키지 않는다.

#### ref를 사용하는 이유

리액트에서는 virtual dom을 이용한다. 그리고 ref를 사용하지 않은 dom의 접근은 실제 dom 요소에 접근한다. 리액트에서는 virtual dom을 바탕으로 dom을 그리기 때문에 virtual dom을 통해 접근하는 것이 조금더 확실하다. 또한 리액트의 생명주기도 고려해야한다.

#### ref가 필요한 경우

- 포커스, 텍스트 선택영역, 혹은 미디어의 재생을 관리할 때.
- 애니메이션을 직접적으로 실행시킬 때.
- 서드 파티 DOM 라이브러리를 React와 같이 사용할 때.

https://mingule.tistory.com/61
https://yoonjong-park.tistory.com/entry/React-useRef-%EB%8A%94-%EC%96%B8%EC%A0%9C-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94%EA%B0%80

### useImperativeHandle

### useDebugValue
