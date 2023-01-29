import useSWR from "swr";
import { useState } from "react";
import axios from "axios";
import { TTransaction } from "../types";
export const useTransactionsData = () => {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const {
    data: transactions,
    error,
    isLoading,
  } = useSWR(
    `http://localhost:3000/transactions?_sort=id&_order=desc`,
    fetcher
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [query, setQuery] = useState("");
  const length = Math.ceil(transactions?.length / 10);
  const pages = transactions
    ? Array(length)
        .fill(0)
        .map((_, i) => i + 1)
    : [];
  const balance = transactions
    ? transactions
        .reduce((acc: number, transaction: TTransaction) => {
          return acc + transaction.amount;
        }, 0)
        .toFixed(2)
    : 0;

  const newId = transactions?.length || 0;
  const filteredTransactions =
    query !== ""
      ? transactions?.filter((transaction: TTransaction) => {
          return transaction?.beneficiary
            .toLowerCase()
            .includes(query.toLowerCase());
        })
      : transactions?.slice(currentPage * 10, currentPage * 10 + 10);
  return {
    error,
    isLoading,
    pages,
    balance,
    newId,
    filteredTransactions,
    currentPage,
    setCurrentPage,
    query,
    setQuery,
  };
};
