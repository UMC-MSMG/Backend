# **Mansumugang**

건강의 시작, 활기찬 노후를 위한 우리들의 약속, 만수무강

## 프로젝트 소개

만수무강은 건강을 챙겨야하는 노약자분들을 위한 맞춤 건강 챙김 서비스

## 프로젝트 기간

2024.01.01(수) ~

## Backend 팀원 소개

- 몰챔/손채민
- 쥬디/양진주
- 유니/이소윤
- 만타/한서정

## 개발 환경 / 기술 스택

- Framework : Node.js, Express
- Database : AWS RDS
- ORM : Prisma
- Code Convention : MVC 패턴

## Branch 전략

1. 배포용 브랜치: main
2. 개발용 브랜치: develop
3. 기능별 브랜치: 맡은 기능에 따라 별도의 브랜치 생성

## Coding Convention

- 기능/작업별로 브랜치를 생성. (예: `feature/이슈-번호-기능명`)
- 브랜치 이름 규칙:
  ```
  feature/<기능명>
  fix/<이슈-번호-버그수정>
  hotfix/<긴급수정>
  ```

## 커밋 메시지 규칙

### 형식

- 커밋 메시지는 `{타입}: {변경 내용}` 형식을 따릅니다.

### 타입

| 타입         | 설명                |
| ------------ | ------------------- |
| **Add**      | 새로운 기능 추가    |
| **Fix**      | 버그 수정           |
| **Update**   | 기능 개선           |
| **Remove**   | 코드 또는 파일 삭제 |
| **Refactor** | 코드 리팩토링       |
| **Docs**     | 문서 추가 또는 수정 |

### 커밋 메시지 작성 예시

- `Add: JWT 기반 사용자 인증 구현`
- `Fix: API 응답 시간 지연 문제 해결`
- `Update: DB 스키마에 새로운 컬럼 추가`
- `Remove: 불필요한 로그 출력 코드 삭제`
- `Refactor: 컨트롤러 로직 리팩토링`
- `Docs: README에 설치 방법 추가`

## 환경 변수

다음의 환경 변수를 `.env` 파일에 설정해야 합니다.

- `DATABASE_URL`: AWS RDS 데이터베이스 연결 문자열
- `PORT`: 서버 포트 (기본값: 3000)

## 배포 환경

- AWS EC2: 애플리케이션 서버
- AWS RDS: 데이터베이스
- AWS S3: 정적 파일 저장

## API 문서

API 명세는 [Swagger](https://github.com/swagger-api/swagger-ui)를 통해 제공됩니다:

- 로컬 실행 시: `http://localhost:3000/api-doc
