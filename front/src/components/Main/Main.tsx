import TransactionsTable from "./Table/TransactionsTable";
import Form from "../Main/Form/Form";
import { useTransactionsData } from "../../hooks/useTransactionsData";
import Loader from "./Loader";

const Main = () => {
  const {
    filteredTransactions,
    balance,
    setQuery,
    pages,
    currentPage,
    setCurrentPage,
    isLoading,
    newId,
  } = useTransactionsData();
  return (
    <main>
      <div className="flex p-6 w-3/4 mx-auto">
        <div className="flex flex-col flex-1 justify-between px-2 py-12">
          <h2 className="text-md tracking-wide">
            Balance: <span>{balance}zl</span>
          </h2>
          <div className="flex flex-col gap-2">
            <label htmlFor="search">Filter by beneficiary</label>
            <input
              name="search"
              type="text"
              className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
              placeholder="Search..."
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
          </div>
        </div>
        <Form newId={newId} />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <TransactionsTable
          data={filteredTransactions}
          page={currentPage}
          setPage={setCurrentPage}
          pages={pages}
        />
      )}
    </main>
  );
};

export default Main;
