export const help = [
  {
    title: "N빵 계산기",
    description1: "N빵 계산기는 여러인원이 지불해야 하는 비용을 계산해주는 계산기입니다.",
    description2: "인원추가를 먼저 한 뒤에 항목을 추가해야 합니다.",
    description3: "전체리셋을 누르면 전체 데이터가 초기화됩니다.",
  },
  {
    image: "/help/add_people.png",
    title: "인원 추가",
    decription1: "이름에 이름을 작성하고 추가 버튼을 누르면 인원이 추가됩니다.",
    description2:
      "인원을 삭제하려면 인원 제거에 있는 인원 이름 버튼을 누르면 삭제됩니다.",
  },
  {
    image: "/help/add_item.png",
    title: "항목 추가",
    decription1: "항목에 항목 이름과 비용을 작성합니다.",
    description2: "그 후 지불한 사람의 이름을 눌러 선택할 수 있습니다(한명만 가능)",
    description3:
      "지불시 제외할 인원들이 있으면 제외할 인원들을 눌러 선택할 수 있습니다(여러명 가능)",
  },
  {
    image: "/help/first_table.png",
    title: "항목 별 내야 할 금액",
    description1: "항목이 추가되면 항목 칸의 색깔은 지불한 사람의 색깔과 같아집니다.",
    description2: "지불에서 제외된 인원의 칸에는 '없음'이라고 뜹니다",
    description3: "항목칸에 있는 X를 누르면 항목이 삭제됩니다.",
  },
  {
    image: "/help/second_table.png",
    title: "인원 별 정산 매트릭스",
    description1: "행은 지불할 사람, 열은 지불받을 사람입니다.",
    description2:
      "예를 들면 철수는 영희에게 4,000원 민수에게 5,000원을 지불해야 하며 총 9,000원을 지불해야 합니다.",
    description3: "본인은 자기 자신에게 지불하는 금액이므로 제외됩니다다.",
  },
];
