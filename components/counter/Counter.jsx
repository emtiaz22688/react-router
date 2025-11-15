import React, { useEffect, useState } from "react";

const CounterItem = ({ end, label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // মোট সময় 2 সেকেন্ড
    const increment = end / (duration / 16); // প্রতি ফ্রেমে কত বাড়বে
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="text-center">
      <h2 className="text-5xl font-bold text-blue-600">{count}+</h2>
      <p className="mt-2 text-gray-600">{label}</p>
    </div>
  );
};

const AutoCounterSection = () => {
  return (
    <div className="bg-pink-100 py-20">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <CounterItem end={5} label="Demo Website (More Coming)" />
        <CounterItem end={30} label="Inner Page" />
        <CounterItem end={30} label="Elements" />
      </div>
    </div>
  );
};

export default AutoCounterSection;
