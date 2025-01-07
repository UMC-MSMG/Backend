# **Mansumugang**
건강의 시작, 활기찬 노후를 위한 우리들의 약속, 만수무강

## 프로젝트 소개 
만수무강은 건강을 챙겨야하는 노약자분들을 위한 맞춤 건강 챙김 서비스 

## 프로젝트 기간
2024.01.01(수) ~ 

## Backend 팀원 소개
- 손채민
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
