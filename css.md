# css 기본기 공부

## styled component vs sass

### sass

원래는 css로 스타일링을 했다. 물론 지금도 css를 사용한다. 그런데 기본 css의 기능은 조금 아쉬운 부분들이 있다. 셀렉터의 중첩이나 반복문 등의 여러가지 기능을 추가해서 만든것이 sass(scss)이다. scss는 css의 상위 집합이기 때문에 모든 css 기능이 사용가능하다. sass는 css 전처리기 중에서 가장 유명한 라이브러리다.

### styled component

sass는 지금도 사용되는 방법이다. 하지만 새로운 css를 사용하는 새로운 방법이 나오게 된다. css-in-js는 js안에 css를 작성하는 것을 의미한다. 이렇게 하면 프로젝트에 css파일이 존재하지 않고도 css를 적용할 수 있다. css-in-js의 가장 대표적인 라이브러리가 styled component이다.

1. css-in-js를 사용하면 css 파일을 유지보수할 필요가 없어진다.
2. css를 문서 전체에서 관리하는 것이 아니라 컴포넌트 단위로 사용하기 용이하다. 특히 리액트같이 컴포넌트 단위로 개발하는 곳에서 유용하다.
3. 스타일 컴포넌트는 먼저 클래스를 파싱 과정중에 만들어주기 때문에 클래스를 작명하는데 시간을 쏟거나 클래스명이 겹치는 경우를 고려하지 않아도 된다.
4. sass에서 사용하는 기능들도 비슷하게 사용이 가능하다.
5. 커스터마이징이 용이하다. ui 라이브러리를 이용하다보면 css를 커스터마이징하기 쉽지 않다. 이런 경우에 굉장히 유용하고 직접 만든 컴포넌트들도 수정하기가 쉽다.
6. react에서 props를 넘겨줄 수 있기 때문에 유사한 컴포넌트를 재사용하는데 유리하다(color, weight 등등)
7. 유지보수에 용이하다. css-in-js, 컴포넌트 방식으로 관리하기 때문에 버튼을 바꾸고 싶다면 버튼 컴포넌트에서 직접 수정하면 된다. 또한 컴포넌트에 스타일을 덧붙여서 사용할 수 있기 때문에 유지보수가 더 쉽다.

```
자동 중요 CSS : styled-components는 페이지에서 렌더링되는 구성 요소를 추적하고 완전히 자동으로 해당 스타일만 삽입합니다. 코드 분할과 결합하면 사용자가 필요한 최소한의 코드를 로드할 수 있습니다.
클래스 이름 버그 없음 : styled-components는 스타일에 대한 고유한 클래스 이름을 생성합니다. 중복, 중복 또는 철자 오류에 대해 걱정할 필요가 없습니다.
CSS의 더 쉬운 삭제 : 클래스 이름이 코드베이스의 어딘가에서 사용되는지 여부를 알기 어려울 수 있습니다. styled-components는 스타일의 모든 비트가 특정 구성 요소에 연결되어 있기 때문에 이를 명확하게 합니다. 구성 요소가 사용되지 않고(도구가 감지할 수 있음) 삭제되면 해당 구성 요소의 모든 스타일도 함께 삭제됩니다.
단순 동적 스타일링 : 수십 개의 클래스를 수동으로 관리할 필요 없이 props 또는 전역 테마를 기반으로 구성 요소의 스타일을 적용하는 것이 간단하고 직관적입니다.
손쉬운 유지 관리 : 구성 요소에 영향을 주는 스타일을 찾기 위해 다른 파일을 검색할 필요가 없으므로 코드베이스가 아무리 크더라도 유지 관리는 케이크 조각입니다.
자동 공급업체 접두사 : CSS를 현재 표준으로 작성하고 나머지는 styled-components가 처리하도록 합니다.
```

[공식문서](https://styled-components.com/docs/basics#motivation)

```
Global namespace: => class명이 build time에 유니크한 해시값으로 변경되기 때문에 별도의 명명 규칙이 필요하지 않다.
Dependencies: => CSS가 컴포넌트 단위로 추상화되기 때문에 CSS 파일(모듈)간에 의존성을 신경 쓰지 않아도 된다.
Dead Code Elimination: => 컴포넌트와 CSS가 동일한 구조로 관리되므로 수정 및 삭제가 용이하다.
Minification: => 네임스페이스 충돌을 막기위해 BEM 같은 방법론을 사용하면 class 명이 길어질 수 있지만, CSS-in-JS는 짧은 길이의 유니크한 클래스를 자동으로 생성한다.
Sharing Constants: => CSS 코드를 JS에 작성하므로 컴포넌트의 상태에 따른 동적 코딩이 가능하다.
Non-deterministic Resolution: => CSS가 컴포넌트 스코프에서만 적용되기 때문에 우선순위에 따른 문제가 발생하지 않는다.
Isolation: => CSS가 JS와 결합해 있기 때문에 상속에 관한 문제를 신경 쓰지 않아도 된다
```

[블로그 글 인용](https://blueshw.github.io/2020/09/14/why-css-in-css/)

### styled component의 단점

먼저 scss, styled component가 어떻게 동작하는지 알아야한다. 말 그대로 scss는 css 전처리기이고 컴파일 과정을 통해 css파일로 변경한다. 그리고 styled component는 js에서 css로 변환해야하기 때문에 성능이 scss에 비해 저하된다. 또한 당연하게도 번들크기가 크다. 성능면에서는 가장 기초적인 css를 적용하는 것이 좋다. BEM 방법론도 존재하고(Blcok, Element, Modifier로 나눠서 이름짓기) 충분히 가능하다. 다만 개발자가 조금 불편하다. 조금 더 편하게 사용하려면 scss를 그리고 더 편하게 사용하려면 styled component를 사용한다.

### 그래서 결론

젇답은 없다. 미래에는 어떤 기술이 생기고 사라질지모른다. 인터렉티브한 웹페이지라면 styled component를 사용하지 말자. 다만 인터렉티브하지 않고 속도가 비교적 덜 중요하다면 styled component 사용도 좋다. 가독성 좋은 코드가 성능적으로 뛰어난 코드보다 좋다는 얘기가 있다.(O(n) vs O(n^2)같은 극단적인 경우가 x) 프로젝트의 상황에 따라 적당히 선택하자. 나는 개인적으로 styled component를 선호한다.

## css 최적화