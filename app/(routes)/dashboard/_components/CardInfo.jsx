import formatNumber from "@/utils";
import getFinancialAdvice from "@/utils/getFinancialAdvice";
import {
  PiggyBank,
  ReceiptText,
  Wallet,
  Sparkles,
  CircleDollarSign,
} from "lucide-react";
import React, { useEffect, useState, useRef } from "react";

function CardInfo({ budgetList, incomeList }) {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [financialAdvice, setFinancialAdvice] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const cards = [
    {
      title: "Total Budget",
      value: `$${formatNumber(totalBudget)}`,
      Icon: PiggyBank,
    },
    {
      title: "Total Spend",
      value: `$${formatNumber(totalSpend)}`,
      Icon: ReceiptText,
    },
    {
      title: "No. Of Budget",
      value: budgetList?.length,
      Icon: Wallet,
    },
    {
      title: "Sum of Income Streams",
      value: `$${formatNumber(totalIncome)}`,
      Icon: CircleDollarSign,
    },
  ];

  useEffect(() => {
    if (budgetList.length > 0 || incomeList.length > 0) {
      CalculateCardInfo();
    }
  }, [budgetList, incomeList]);

  useEffect(() => {
    if (totalBudget > 0 || totalIncome > 0 || totalSpend > 0) {
      const fetchFinancialAdvice = async () => {
        const advice = await getFinancialAdvice(
          totalBudget,
          totalIncome,
          totalSpend
        );
        setFinancialAdvice(advice);
      };

      fetchFinancialAdvice();
    }
  }, [totalBudget, totalIncome, totalSpend]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [cards.length]);

  const CalculateCardInfo = () => {
    console.log(budgetList);
    let totalBudget_ = 0;
    let totalSpend_ = 0;
    let totalIncome_ = 0;

    budgetList.forEach((element) => {
      totalBudget_ = totalBudget_ + Number(element.amount);
      totalSpend_ = totalSpend_ + element.totalSpend;
    });

    incomeList.forEach((element) => {
      totalIncome_ = totalIncome_ + element.totalAmount;
    });

    setTotalIncome(totalIncome_);
    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);
  };

  return (
    <div>
      {budgetList?.length > 0 ? (
        <div>
          <div className="p-7 border mt-4 -mb-1 rounded-2xl flex items-center justify-between">
            <div className="">
              <div className="flex mb-2 flex-row space-x-1 items-center ">
                <h2 className="text-md ">Finan Smart AI</h2>
                <Sparkles
                  className="rounded-full text-white w-10 h-10 p-2
    bg-gradient-to-r
    from-pink-500
    via-red-500
    to-yellow-500
    background-animate"
                />
              </div>
              <h2 className="font-light text-md">
                {financialAdvice || "Loading financial advice..."}
              </h2>
            </div>
          </div>

          <div className="mt-7 relative overflow-hidden">
            <div 
              ref={carouselRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="min-w-full p-7 border rounded-2xl flex items-center justify-between
                    hover:border-purple-500 hover:bg-purple-50 transition-all duration-200"
                >
                  <div>
                    <h2 className="text-sm">{card.title}</h2>
                    <h2 className="font-bold text-2xl">{card.value}</h2>
                  </div>
                  <card.Icon className="bg-purple-600 p-3 h-12 w-12 rounded-full text-white" />
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-4 gap-2">
              {cards.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all duration-300 
                    ${currentIndex === index ? 'bg-purple-600 w-4' : 'bg-gray-300'}`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-7">
          <div className="h-[110px] w-full bg-slate-200 animate-pulse rounded-lg"></div>
        </div>
      )}
    </div>
  );
}

export default CardInfo;
