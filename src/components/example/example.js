export const examplePeople = [
  { name: "철수", color: "#f87171" },
  { name: "영희", color: "#60a5fa" },
  { name: "민수", color: "#34d399" },
];

export const exampleItems = [
  {
    name: "아침밥",
    cost: 9000,
    person: "철수",
    includedPeople: ["철수", "영희", "민수"],
  },
  {
    name: "점심밥",
    cost: 12000,
    person: "영희",
    includedPeople: ["철수", "영희", "민수"],
  },
  {
    name: "저녁밥",
    cost: 15000,
    person: "민수",
    includedPeople: ["철수", "영희", "민수"],
  },
];
