# Rust Wiki Front

## 관련 코드 및 서버 주소

- [Wiki Server Git](https://github.com/myyrakle/rustywiki-server)

- [Wiki Api Docs Git](https://github.com/myyrakle/rustywiki-api-document)

- [Swagger 서버 주소](https://myyrakle.github.io/rustywiki-api-document/)

- [개발용 백엔드 서버](http://125.133.80.144:11111)

## 사용하고 있는 기술스택

- [react](https://reactjs.org/)
- [next.js](https://nextjs.org/docs)
- [@emotion/react](https://emotion.sh/docs/introduction)
- [material-ui](https://material-ui.com/)
- [react-query](https://react-query.tanstack.com/overview)

- [recoil](https://recoiljs.org/docs/basic-tutorial/intro)  
  \* react-query를 사용하고 있고 상태관리가 크지않을거라고 생각해서 현재 recoil을 사용하고 있어요!
- [storybook](https://storybook.js.org/tutorials/intro-to-storybook/react/en/get-started/)

## 문서

- [실행 및 개발방법](https://github.com/myyrakle/rustywiki-front/blob/main/docs/실행_및_개발방법.md)

## 구현해야할 기능 목록

1. [ ] 회원가입
   - [x] 회원가입시 이메일과 패스워드 사용자 닉네임을 입력받는다.
   - [ ] 성공시 이메일 링크요청 페이지로 보내고 이메일 인증링크를 보내야한다.(현재는 그냥 바로 가입가능)
   - [ ] 인증링크로 접속시 회원가입완료 페이지로 보내야 한다.
2. [x] 로그인 처리
   - [x] 패스워드는 10자 이상 되어야 한다.
   - [x] 틀릴시 실패팝업이 떠야 한다.
   - [x] 리프레쉬 토큰을 저장해야한다.
   - [x] 성공시에는 성공 팝업이 떠야한다.
3. [x] 로그아웃 처리
   - [x] 로그아웃시에 서버로 로그아웃 요청을 보낸다.
   - [x] 리프레쉬 토큰을 제거한다.
4. [x] 리프레쉬처리
   - [x] 액세스 토큰 만료라고 뜰시에 리프레쉬 토큰을 포함하여 액세스 토큰을 다시 얻어온다.
   - [x] refresh도 만료시에는 리프레쉬 토큰을 제거한다.
5. [ ] 패스워드 찾기 기능
6. [x] 기본 레이아웃
   - [x] 헤더에는 검색, 비로그인시 로그인 및 회원가입이 존재해야 한다.
   - [ ] sidebar의 최근 수정,등록 목록과 광고 영역이 나와야 한다.
   - [x] children만 prop으로 노출하여 메인 컨텐츠를 주입할 수 있어야 한다.
7. [ ] 검색기능
   - [ ] 헤더 검색에 입력시 자동완성 목록이 나와야 한다.
   - [ ] 존재하는 페이지라면 페이지로 즉각 이동해야한다.
   - [ ] 존재하지 않는 페이지라면 유사한 검색결과 목록페이지와 해당 검색어로 문서를 생성할지 물어본다.
8. [ ] 최근 수정 목록
   - [ ] polling 혹은 websocket을 활용하여 일정주기로 최근 수정 목록을 갱신 할 수 있어야 한다.
   - [ ] 최근 수정목록의 아이템을 누르면 해당 위키페이지로 이동한다.
9. [ ] 위키 메인페이지

   - [x] md기반의 문법으로 페이지를 렌더링 해야한다.
   - [x] html은 위생화 처리 해야한다.
   - [x] \[\[wiki 링크 문법\]\]으로 페이지 링크를 걸 수 있어야 한다.
   - [ ] redirect기능(문법 미정) 처리로 같은 의미를 가진 페이지에 대해서 다른페이지로 이동할 수 있어야한다 (Ex: #redirect Test 라면 같은 뜻을 가진 한글단어 문서 테스트 페이지로 이동한다.)
     - [ ] 리다이렉트 되었다면 리다이렉트된 페이지에서 이전 단어를 사용하여 들어온 페이지를 수정할지 물어봐야 한다.
   - [ ] include(문법미정)가 있으면 해당 include한 페이지를 해당구문에서 치환하여 렌더링 해야한다.
   - [ ] 페이지이름을 url에 표현할때는 url에서 일부특수문자에 대해서만 encode시켜야 한다. (직관성을 위해서 한글이나 한문등에 대해서 encode하지 않는다.)
   - [x] 각주기능이 포함되어야 한다.
   - [ ] 소제목 (==제목==)을 사용하여 문서의 목차를 렌더링 하고 id링크로 연결할 수 있어야 한다.
     - heading 대신 이것을 사용할 것 인지? #. ## md기반 헤딩문법으로 목차 생성하는게 좋지 않을지 토론 필요
   - [ ] 파일(문법 미정)을 사용하여 파일 이미지를 불러올 수 있어야 한다.
   - [ ] #heading 에서는 편집버튼이 존재하고 해당 버튼을 누르면 편집페이지로 이동하여 해당 위치로 스크롤 이동해야 한다.

10. [ ] 편집페이지
    - [ ] Monaco편집기, RAW 편집기, 미리보기 탭으로 화면을 보여줘야 한다.
    - [x] 코드스플리팅을 위해서 페이지에 들어왔을때 동적으로 import한다.
    - [x] md문법에 대해서 prettify?가 적용이 되어야 한다.
    - [ ] 버그: 일부 페이지 이동시에 다시 접속하면 깨지는 부분 존재
    - [ ] 편집내용에 대한 저작권이 명시되어야 한다.
11. [ ] 토론페이지
    - [ ] 각 토론 내용도 MD기반 문법으로 렌더링 되어야 한다.
    - [x] 토론 내용 렌더링을 위한 md는 Markdown Heading (#, ##) 문법은 제외 한다.
    - [ ] 토론 내용 인덱스 참조링크 기능으로 #1 #2 페이지내 id로 이동할 수 있어야 한다.
    - [x] 토론내용은 인피니티 스크롤로 렌더링 되어야 한다.
    - [ ] 토론내용 md도 html은 위생화 처리되어야 한다.
12. [ ] 접근권한 관리 기능 및 페이지
    - [ ] 역할은 추가, 수정, 삭제 할 수 있어야 한다.
    - [ ] 리소스에서 기능에 대한 역할 목록으로 접근제어 해야한다.
13. [ ] 역링크 페이지
    - [ ] 다른 페이지에 링크를 걸면 링크가 걸린 페이지에서 역링크 목록페이지에 링크를 건 페이지가 나와야 한다.
    - [ ] 해당 목록은 초성별 목록으로 분리해서 보여줘야 한다.
14. [ ] 파일업로드 페이지
    - [ ] 파일, 제목, md및 위키문법으로 내용설명, 라이센스를 입력할 수 있어야 한다.
