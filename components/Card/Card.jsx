import React from "react";

const CardSection = () => {
  const cards = [
    { title: "Card One", description: "This is the first card", bgColor: "bg-red-500" },
    { title: "Card Two", description: "This is the second card", bgColor: "bg-green-500" },
    { title: "Card Three", description: "This is the third card", bgColor: "bg-blue-500" },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center items-center p-10">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`w-64 p-6 rounded-xl shadow-lg text-white ${card.bgColor} hover:scale-105 transform transition`}
        >
          <h2 className="text-2xl font-bold mb-2">{card.title}</h2>
          <p>{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CardSection;
