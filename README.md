# Divide-N (N빵 계산기)

N빵 계산기는 여러 인원이 지불해야 하는 비용을 계산해주는 웹 애플리케이션입니다.

## 🚀 주요 기능

- **인원 관리**: 인원 추가/제거 및 색상 자동 할당
- **항목 관리**: 비용 항목 추가 및 지불자 설정
- **제외 인원 설정**: 특정 인원을 비용 분담에서 제외 가능
- **실시간 계산**: 항목별 내야 할 금액과 인원별 정산 매트릭스 제공
- **도움말 시스템**: 사용법 가이드 제공

## 📖 사용법

### 1. N빵 계산기 기본 사용법

N빵 계산기는 여러인원이 지불해야 하는 비용을 계산해주는 계산기입니다.
인원추가를 먼저 한 뒤에 항목을 추가해야 합니다.
전체리셋을 누르면 전체 데이터가 초기화됩니다.

### 2. 인원 추가

![인원 추가](/public/help/add_people.png)

- 이름에 이름을 작성하고 추가 버튼을 누르면 인원이 추가됩니다.
- 인원을 삭제하려면 인원 제거에 있는 인원 이름 버튼을 누르면 삭제됩니다.

### 3. 항목 추가

![항목 추가](/public/help/add_item.png)

- 항목에 항목 이름과 비용을 작성합니다.
- 그 후 지불한 사람의 이름을 눌러 선택할 수 있습니다(한명만 가능)
- 지불시 제외할 인원들이 있으면 제외할 인원들을 눌러 선택할 수 있습니다(여러명 가능)

### 4. 항목 별 내야 할 금액

![항목별 금액](/public/help/first_table.png)

- 항목이 추가되면 항목 칸의 색깔은 지불한 사람의 색깔과 같아집니다.
- 지불에서 제외된 인원의 칸에는 '없음'이라고 뜹니다
- 항목칸에 있는 X를 누르면 항목이 삭제됩니다.

### 5. 인원 별 정산 매트릭스

![정산 매트릭스](/public/help/second_table.png)

- 행은 지불할 사람, 열은 지불받을 사람입니다.
- 예를 들면 철수는 영희에게 4,000원 민수에게 5,000원을 지불해야 하며 총 9,000원을 지불해야 합니다.
- 본인은 자기 자신에게 지불하는 금액이므로 제외됩니다.

## 🛠️ 기술 스택

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **Language**: JavaScript (JSX)

## 🚀 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/mhojune/Divide-N.git

# 프로젝트 폴더로 이동
cd Divide-N

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 📱 주요 특징

- **반응형 디자인**: 모바일과 데스크톱에서 모두 사용 가능
- **직관적인 UI**: 색상 코딩으로 쉽게 구분 가능
- **실시간 계산**: 입력 즉시 결과 확인 가능
- **모던한 인터페이스**: 깔끔하고 사용하기 쉬운 디자인

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 👨‍💻 개발자

**mhojune** - [GitHub](https://github.com/mhojune)

---

⭐ 이 프로젝트가 도움이 되었다면 스타를 눌러주세요!
