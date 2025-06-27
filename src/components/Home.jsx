import React, { useState, useEffect } from "react";
import Modal from "./common/Modal";
import { examplePeople, exampleItems } from "./example/example";
import { help } from "./example/help";

const colors = ["#f87171", "#fbbf24", "#34d399", "#60a5fa", "#a78bfa", "#f472b6"];

const Home = ({ people, setPeople, items, setItems }) => {
  const [personModalOpen, setPersonModalOpen] = useState(false);
  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [personName, setPersonName] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemCost, setItemCost] = useState("");
  const [itemError, setItemError] = useState("");
  const [personError, setPersonError] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [excludedPerson, setExcludedPerson] = useState([]);
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  useEffect(() => {
    setPeople(examplePeople);
    setItems(exampleItems);
  }, []);

  function getAvailableColors() {
    const usedColors = people.map((p) => p.color);
    return colors.filter((color) => !usedColors.includes(color));
  }

  function getRandomColor() {
    const available = getAvailableColors();
    if (available.length === 0) return null;
    return available[Math.floor(Math.random() * available.length)];
  }

  const handleDeletePerson = (personName) => {
    setPeople(people.filter((p) => p.name !== personName));
    setItems(items.filter((item) => item.person !== personName));
  };

  const handleAddPerson = () => {
    if (!personName.trim()) {
      setPersonError("이름을 입력하세요.");
      return;
    }
    const color = getRandomColor();
    if (!color) {
      setPersonError("인원수가 초과되었습니다!");
      return;
    }
    setPeople([...people, { name: personName, color }]);
    setPersonName("");
    setPersonError("");
  };

  const handleAddItem = () => {
    if (!itemName.trim() || !itemCost.trim()) {
      setItemError("항목과 비용을 모두 입력하세요.");
      return;
    }
    if (isNaN(itemCost) || Number(itemCost) <= 0) {
      setItemError("비용에는 0보다 큰 숫자만 입력할 수 있습니다.");
      return;
    }
    if (!selectedPerson) {
      setItemError("지불한 사람을 선택하세요.");
      return;
    }
    const includedPeople = people
      .filter((p) => !excludedPerson.includes(p.name))
      .map((p) => p.name);
    setItems([
      ...items,
      {
        name: itemName,
        cost: Number(itemCost),
        person: selectedPerson,
        includedPeople,
      },
    ]);
    setItemName("");
    setItemCost("");
    setItemError("");
    setSelectedPerson(null);
    setExcludedPerson([]);
    setItemModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center mt-10 w-full max-w-6xl mx-auto mb-20">
      <Modal open={personModalOpen} onClose={() => setPersonModalOpen(false)}>
        <h1 className="text-2xl font-bold mb-7">인원 추가</h1>
        {personError && <div className="text-red-500 mb-3">{personError}</div>}
        <div className="flex gap-5 mb-5">
          <input
            type="text"
            placeholder="이름"
            value={personName}
            onChange={(e) => setPersonName(e.target.value)}
            className="border-1 border-black/60 rounded-md p-2"
          />
          <button
            className="bg-black/60 text-white rounded-md p-2 px-4 cursor-pointer"
            onClick={handleAddPerson}
          >
            추가
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-md font-bold">인원 제거</span>
          <div className="flex gap-2 overflow-x-auto whitespace-nowrap py-2">
            {people.map((p) => (
              <div
                key={p.name}
                className={
                  "inline-block rounded-md p-2 px-4 cursor-pointer min-w-[80px] flex-shrink-0"
                }
                style={{ backgroundColor: p.color }}
                onClick={() => handleDeletePerson(p.name)}
              >
                {p.name}
              </div>
            ))}
          </div>
        </div>
      </Modal>
      <Modal open={itemModalOpen} onClose={() => setItemModalOpen(false)}>
        <h1 className="text-2xl font-bold mb-7">항목 추가</h1>
        {itemError && <div className="text-red-500 mb-3">{itemError}</div>}
        <div className="flex gap-5 mb-5">
          <input
            type="text"
            placeholder="항목"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="border-1 border-black/60 rounded-md p-2 w-1/3"
          />
          <input
            type="text"
            placeholder="비용"
            value={itemCost}
            onChange={(e) => setItemCost(e.target.value)}
            className="border-1 border-black/60 rounded-md p-2 w-1/3"
          />
          <button
            className="bg-black/60 text-white rounded-md p-2 px-4 cursor-pointer"
            onClick={handleAddItem}
          >
            추가
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-md font-bold">지불한 사람</span>
          <div className="flex gap-2 overflow-x-auto whitespace-nowrap py-2">
            {people.map((p) => (
              <div
                key={p.name}
                className={`inline-block rounded-md p-2 px-4 cursor-pointer min-w-[80px] flex-shrink-0
                ${selectedPerson === p.name ? "border-1 border-black" : ""}`}
                style={{ backgroundColor: p.color }}
                onClick={() => setSelectedPerson(p.name)}
              >
                {p.name}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-md font-bold">지불 제외할 인원</span>
          <div className="flex gap-2 overflow-x-auto whitespace-nowrap py-2">
            {people.map((p) => (
              <div
                key={p.name}
                className={`inline-block rounded-md p-2 px-4 cursor-pointer min-w-[80px] flex-shrink-0
                ${excludedPerson.includes(p.name) ? "border-1 border-black" : ""}`}
                style={{ backgroundColor: p.color }}
                onClick={() =>
                  setExcludedPerson(
                    excludedPerson.includes(p.name)
                      ? excludedPerson.filter((name) => name !== p.name)
                      : [...excludedPerson, p.name]
                  )
                }
              >
                {p.name}
              </div>
            ))}
          </div>
        </div>
      </Modal>
      <Modal
        className="min-w-[800px] overflow-y-auto"
        open={helpModalOpen}
        onClose={() => setHelpModalOpen(false)}
      >
        <h1 className="text-2xl font-bold mb-7">도움말</h1>
        {help.map((h) => (
          <div key={h.title} className="mb-10">
            <h2 className="relative text-lg font-bold mb-2 border-b border-gray-300 pb-2">
              {h.title}
            </h2>

            {h.image && <img src={h.image} alt={h.title} className="w-1/2 mb-2" />}
            <p className="text-base mb-2">{h.description1}</p>
            <p className="text-base mb-2">{h.description2}</p>
            <p className="text-base mb-2">{h.description3}</p>
          </div>
        ))}
      </Modal>
      <h1 className="text-4xl font-bold mb-10">N빵 계산기</h1>
      <div className="flex gap-2 self-end mb-4">
        <button
          className="btn-through cursor-pointer"
          onClick={() => setPersonModalOpen(true)}
        >
          인원 추가
        </button>
        <button
          className="btn-through cursor-pointer"
          onClick={() => setItemModalOpen(true)}
        >
          항목 추가
        </button>
        <button
          className="btn-through cursor-pointer"
          onClick={() => {
            setPeople([]);
            setItems([]);
          }}
        >
          전체 리셋
        </button>
        <button
          className="btn-through cursor-pointer border-radius-full"
          onClick={() => setHelpModalOpen(true)}
        >
          ?
        </button>
      </div>
    </div>
  );
};

export default Home;
