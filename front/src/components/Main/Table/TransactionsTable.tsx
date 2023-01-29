import React from "react";
import { useMemo } from "react";
import { useTable } from "react-table";
import { COLUMNS } from "./TableColumns";
import { FiDelete } from "react-icons/fi";
import moment from "moment";
import axios from "axios";
import { TTransaction } from "../../../types";

type TTableProps = {
  data: TTransaction[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pages: number[];
};
function TransactionsTable(props: TTableProps) {
  const data = props.data || [];
  const handleDelete = async (e) => {
    const index = e.target.closest("tr").dataset.index;
    axios.delete(`http://localhost:3000/transactions/${index}`);
  };
  const tableData = useMemo(() => data, [data]);
  const tableColumns = useMemo(() => COLUMNS, [COLUMNS]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: tableColumns,
      data: tableData,
    });

  return (
    <div className="flex flex-col w-3/4 h-[1300px] mx-auto">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table {...getTableProps()} className="text-sm min-w-full">
              <thead className="bg-white border-b">
                {headerGroups.map((headerGroup) => (
                  <tr
                    {...headerGroup.getHeaderGroupProps()}
                    key={headerGroup.id}
                  >
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps()}
                        className="text-sm font-medium bg-primary text-white px-6 py-4 text-center"
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                    <th></th>
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row, index) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      data-index={
                        props.page > 1 ? index + props.page * 10 : index
                      }
                      className="mb-2 border-b border-gray-200 "
                      key={row.id}
                    >
                      {row.cells.map((cell) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            className="p-2 border-r border-gray-200 even:bg-gray-100"
                            key={cell.value + Math.random()}
                          >
                            {cell.column.Header === "Date"
                              ? moment(cell.value).format("DD/MM/YYYY hh:MM A")
                              : cell.render("Cell")}
                            {cell.column.Header === "Amount" && "zl"}
                          </td>
                        );
                      })}
                      <td
                        className="hover:cursor-pointer p-2 text-lg"
                        onClick={handleDelete}
                      >
                        <FiDelete />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex justify-center gap-4 mt-2">
              {props.pages.map((page) => (
                <button
                  onClick={() => {
                    props.setPage(page - 1);
                  }}
                  className={`${
                    page === props.page + 1 ? "bg-primary text-white" : ""
                  } px-2 py-1 rounded-md hover:bg-primaryHover hover:text-white`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionsTable;
