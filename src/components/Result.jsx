import React from "react";

const Result = ({ people, items, setItems }) => {
  function calculateCost(item) {
    const n = item.includedPeople ? item.includedPeople.length : 0;
    if (n <= 0) return 0;
    return item.cost / n;
  }

  function calculateTotalCost(person) {
    return items.reduce((acc, item) => {
      if (!item.includedPeople || !item.includedPeople.includes(person.name)) {
        return acc;
      }
      const n = item.includedPeople.length;
      if (n <= 0) return acc;
      return acc + item.cost / n;
    }, 0);
  }

  function calculatePaid(person) {
    return items.reduce((acc, item) => {
      if (item.person && item.person.name === person.name) {
        return acc + item.cost;
      }
      return acc;
    }, 0);
  }

  function calculateGrandTotal() {
    return items.reduce((acc, item) => acc + item.cost, 0);
  }

  function calculateSettlement(person) {
    const paid = calculatePaid(person);
    const shouldPay = calculateTotalCost(person);
    return Math.round(paid - shouldPay);
  }

  function getSettlementTable() {
    const settlements = people.map((p) => ({
      name: p.name,
      value: calculateSettlement(p),
    }));
    const creditors = settlements.filter((s) => s.value > 0).map((s) => ({ ...s }));
    const debtors = settlements.filter((s) => s.value < 0).map((s) => ({ ...s }));
    const result = [];
    let i = 0,
      j = 0;
    while (i < debtors.length && j < creditors.length) {
      const debtor = debtors[i];
      const creditor = creditors[j];
      const amount = Math.min(-debtor.value, creditor.value);
      if (amount > 0) {
        result.push({ from: debtor.name, to: creditor.name, amount });
        debtor.value += amount;
        creditor.value -= amount;
      }
      if (debtor.value === 0) i++;
      if (creditor.value === 0) j++;
    }
    return result;
  }

  function calculatePersonToPerson(from, to) {
    let total = 0;
    items.forEach((item) => {
      if (
        item.includedPeople &&
        item.includedPeople.includes(from.name) &&
        item.person &&
        ((typeof item.person === "object" && item.person.name === to.name) ||
          (typeof item.person === "string" && item.person === to.name)) &&
        from.name !== to.name
      ) {
        const n = item.includedPeople.length;
        if (n > 0) {
          total += item.cost / n;
        }
      }
    });
    return Math.round(total);
  }

  function handleDeleteItem(item) {
    setItems(items.filter((i) => i.name !== item.name));
  }

  const settlementTable = getSettlementTable();

  function calculateRowTotal(from) {
    return people.reduce((sum, to) => {
      if (from.name === to.name) return sum;
      return sum + calculatePersonToPerson(from, to);
    }, 0);
  }

  function calculateColTotal(to) {
    return people.reduce((sum, from) => {
      if (from.name === to.name) return sum;
      return sum + calculatePersonToPerson(from, to);
    }, 0);
  }

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto mb-10">
      <div className="w-full max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-2">항목 별 내야 할 금액</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="border px-2 py-1">분류/인원</th>
              {people.map((p) => (
                <th
                  scope="col"
                  key={p.name}
                  style={{ backgroundColor: p.color }}
                  className="border px-2 py-1"
                >
                  {p.name}
                </th>
              ))}
              <th className="border px-2 py-1">합</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.name}>
                <td
                  className="relative border px-2 py-1"
                  style={{
                    backgroundColor: people.find(
                      (p) =>
                        p.name ===
                        (item.person && item.person.name ? item.person.name : item.person)
                    )?.color,
                  }}
                >
                  {item.name}
                  <span
                    className="cursor-pointer absolute top-0 right-2 text-xl text-red-500 text-center font-bold"
                    onClick={() => handleDeleteItem(item)}
                  >
                    X
                  </span>
                </td>
                {people.map((p) => (
                  <td key={p.name} className="border px-2 py-1">
                    {item.includedPeople && !item.includedPeople.includes(p.name)
                      ? "없음"
                      : Math.round(calculateCost(item))}
                  </td>
                ))}
                <td className="border px-2 py-1">{item.cost}</td>
              </tr>
            ))}
            <tr>
              <td className="border px-2 py-1">총합</td>
              {people.map((p) => (
                <td key={p.name} className="border px-2 py-1">
                  {Math.round(calculateTotalCost(p))}
                </td>
              ))}
              <td className="border px-2 py-1">{calculateGrandTotal()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-8 w-full max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-2">인원 별 정산 매트릭스</h2>
        <table className="w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border px-2 py-1">\\</th>
              {people.map((to) => (
                <th
                  key={to.name}
                  className="border px-2 py-1"
                  style={{ backgroundColor: to.color }}
                >
                  {to.name}
                </th>
              ))}
              <th className="border px-2 py-1">총합</th>
            </tr>
          </thead>
          <tbody>
            {people.map((from) => (
              <tr key={from.name}>
                <td
                  className="border px-2 py-1 font-bold"
                  style={{ backgroundColor: from.color }}
                >
                  {from.name}
                </td>
                {people.map((to) => (
                  <td
                    key={to.name}
                    className="border px-2 py-1"
                    style={{ backgroundColor: from.color }}
                  >
                    {from.name === to.name
                      ? "-"
                      : calculatePersonToPerson(from, to) > 0
                      ? calculatePersonToPerson(from, to)
                      : "없음"}
                  </td>
                ))}
                <td
                  className="border px-2 py-1 font-bold"
                  style={{ backgroundColor: from.color }}
                >
                  {calculateRowTotal(from)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th className="border px-2 py-1">총합</th>
              {people.map((to) => (
                <td key={to.name} className="border px-2 py-1 font-bold">
                  {calculateColTotal(to)}
                </td>
              ))}
              <td className="border px-2 py-1"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Result;
