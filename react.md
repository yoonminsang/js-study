# 리액트 기본기 공부

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

## 디자인 패턴

## 클래스형 vs 함수형
