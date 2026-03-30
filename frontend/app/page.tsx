"use client"

import { useEffect, useState } from "react";
import api from "./api";
import toast from "react-hot-toast";
import { Activity, ArrowDownCircle, ArrowUpCircle, PlusCircle, Trash, TrendingDown, TrendingUp, Wallet } from "lucide-react";

type Transaction = {
  id: string;
  text: "string";
  amount: number;
  created_at: string;
  updated_at: string;
};
export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const [text, setText] = useState<string>("");
  const [amount, setAmount] = useState<number| "">("");
  const [loading, setLoading] = useState<boolean>(false);

  const getTransactions = async () => {
    try {
        const res = await api.get<Transaction[]>('/transactions/');
        setTransactions(res.data);
        console.log(res.data);
        toast.success("Transactions fetched successfully!");
    } catch(error) {
        console.error("Error fetching transactions:", error);
        toast.error("Failed to fetch transactions.");
    }
  }

  const deleteTransaction = async (id: string) => {
    try {
        await api.delete(`transactions/${id}/`);
        toast.success("Transactions Supprimé avec succès!");
        getTransactions();
    } catch(error) {
        console.error("Error de suppression de la transaction:", error);
        toast.error("Error de suppression de la transaction");
    }
  }

  const addTransaction = async () => {
    if (text.trim() === "" || amount === "" || isNaN(Number(amount))) {
        toast.error("Veuillez remplir tous les champs.");
        return;
    }
    setLoading(true);
    try {
        const res = await api.post('/transactions/', {
            text: text,
            amount: Number(amount),
        });
        getTransactions();
        const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
        if (modal) {
            modal.close();
        }
        setText(""); 
        setAmount("");
        toast.success("Transactions ajouté avec succès!");
    } catch(error) {
        console.error("Error d'ajout de la transaction:", error);
        toast.error("Error d'ajout de la transaction");
    } finally {
        setLoading(false);
    }
  }

  useEffect(() => {
    getTransactions();
  }, []);

  const amounts = transactions.map((t) => Number(t.amount) || 0);
  const balance= amounts.reduce((acc, amount) => acc + amount, 0) || 0;
  const income = amounts.filter((amount) => amount > 0).reduce((acc, amount) => acc + amount, 0) || 0;
  const expenses = amounts.filter((amount) => amount < 0).reduce((acc, amount) => acc + amount, 0) || 0;
  const ratio = income > 0 ? Math.min((Math.abs(expenses) / income) * 100, 100) : 0;

  // const balanceColor = balance > 0 ? "text-green-500" : balance < 0 ? "text-red-500" : "text-gray-500";
  // const incomeColor = "text-green-500";
  // const expensesColor = "text-red-500";

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  return (
    <div className="w-2/3 flex flex-col gap-4 ">
      <div className="flex justify-between rounded-2xl border-2 border-warning/10 border-dashed bg-warning/5 p-5">
        <div className="flex flex-col gap-1">
            <div className="badge badge-soft">
              <Wallet className="w-4 h-4"/>
              Votre Solde
            </div>

          <div className="stat-value">
            {balance.toFixed(2)} €
          </div>

        </div>

        <div className="flex flex-col gap-1">
            <div className="badge badge-soft badge-success">
              <ArrowUpCircle className="w-4 h-4"/>
              Revenue
            </div>

          <div className="stat-value">
            {income.toFixed(2)} €
          </div>

        </div>

        <div className="flex flex-col gap-1">
            <div className="badge badge-soft badge-error">
              <ArrowDownCircle className="w-4 h-4"/>
              Dépenses
            </div>

          <div className="stat-value">
            {expenses .toFixed(2)} €
          </div>

        </div>

      </div>

      <div className="rounded-2xl border-2 border-warning/10 border-dashed bg-warning/5 p-5">
        <div className="flex justify-between items-center mb-1">
            <div className="badge badge-soft badge-warning gap-1">
              <Activity className="w-4 h-4"/>
              Dépenses vs Revenus
            </div>
            <div>{ratio.toFixed(0)}%</div>
          

        </div>

        <progress className="progress progress-warning w-full" value={ratio} max={100}></progress>

      </div>

      {/* <button /> */}
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn btn-warning" 
      onClick={()=>(document.getElementById('my_modal_1') as HTMLDialogElement).showModal()}>
        <PlusCircle className="w-4 h-4"/>
        Ajouter une transaction
      </button>
      

      
      <div className="overflow-x-auto rounded-2xl border-2 border-warning/10 border-dashed bg-warning/5">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Description</th>
              <th>Montant</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { transactions.map((t, index) => (
              <tr key={t.id}>
              <th>{index + 1}</th>
              <td>{t.text}</td>
              <td 
              className="font-semibold"
              >
                 <div className="flex items-center gap-2">
                {t.amount > 0 ? (
                  <TrendingUp className="text-success w-6 h-6"/>

              ): (
                <TrendingDown className="text-success w-6 h-6"/>
              )}

              {t.amount >0 ? `+${t.amount}` : t.amount} €
              </div>
              </td>
              <td>{formatDate(t.created_at)}</td>
              <td> 
                <button 
                type="button"
                className="btn btn-sm btn-error btn-soft"
                title="Supprimer"
                onClick={()=>deleteTransaction(t.id)}
                >
                  <Trash className="w-4 h-4"/>
                </button>
              </td>
            </tr>  
            ) 
            )}
            
            
          </tbody>
        </table>
      </div>


      <dialog id="my_modal_1" className="modal backdrop-blur">
        <div className="modal-box border-2 border-warning/10 border-dashed">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg"> Ajouter une transaction </h3>
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col gap-2">
              <label className="label"> Texte </label>
              <input 
              type="text"
              name="text" 
              placeholder="Description de la transaction" 
              className="input w-full" 
              value={text}
              onChange={(e) => setText(e.target.value)}
              />

            </div>
            <div className="flex flex-col gap-2">
              <label className="label"> Montant (négatif - dépense, positif - revenu) </label>
              <input 
              type="number" 
              name="amount" 
              placeholder="Montant de la transaction" 
              className="input input-bordered w-full" 
              value={amount}
              onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
              />

            </div>

            <button className="w-full btn btn-warning"
            onClick={addTransaction}
            disabled={loading}
            >
              <PlusCircle className="w-4 h-4"/>
              Ajouter
            </button>

          </div>
        </div>
      </dialog>

       
    </div>
  );
}
  