import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";

function ExpenseListTable({ expensesList = [], refreshData }) {
  const deleteExpense = async (expense) => {
    const result = await db
      .delete(Expenses)
      .where(eq(Expenses.id, expense.id))
      .returning();

    if (result) {
      toast("Expense Deleted!");
      refreshData();
    }
  };
  return (
    <div className="mt-3">
      <h2 className="font-bold text-lg">Recommended Expenses</h2>
      <div className="grid grid-cols-5 rounded-tl-xl rounded-tr-xl bg-slate-200 p-2 mt-3">
        
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date</h2>
        
      </div>
      { expensesList && expensesList.slice(0, 7).map((expenses, index) => (
        <div 
          key={index} 
          className={`grid grid-cols-5 p-2 ${
            expenses.metadata?.isPrediction 
              ? 'bg-blue-50' 
              : 'bg-slate-50'
          } rounded-bl-xl rounded-br-xl`}
        >
          
          <h2>${expenses.predicted_amount}</h2>
          <h2>{expenses.date.split('T')[0]}</h2>
         
        </div>
      ))}
    </div>
  );
}

export default ExpenseListTable;
