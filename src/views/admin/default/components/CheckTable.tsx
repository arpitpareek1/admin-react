import React, { useState } from "react";
import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import eye from "../../../../assets/svg/eye.svg"

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { UserInfo } from "types/interfaces";
import { useNavigate } from "react-router-dom";

function CheckTable(props: { tableData: any, len: number }) {
  const { tableData, len } = props;
  const [showAll, setShowAll] = useState(false)

  const navigate = useNavigate()

  const [sorting, setSorting] = React.useState<SortingState>([]);
  let defaultData = tableData;
  const columns = [
    columnHelper.accessor("name", {
      id: "name",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">NAME</p>
      ),
      cell: (info: any) => (
        <div className="flex items-center">
          <p className="ml-3 text-sm font-bold text-navy-700 dark:text-white">
            {info.getValue()}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor("email", {
      id: "email",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          EMAIL
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("money", {
      id: "Money",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">MONEY</p>
      ),
      cell: (info) => {
        return (
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {info.getValue()}
          </p>
        )
      },
    }),
    columnHelper.accessor("phone", {
      id: "Phone",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">PHONE</p>
      ),
      cell: (info) => {
        return (
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {info.getValue()}
          </p>
        )
      },
    }),
    columnHelper.accessor("password", {
      id: "Password",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">PASSWORD</p>
      ),
      cell: (info) => {
        return (
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {info.getValue()}
          </p>
        )
      },
    }),
    columnHelper.accessor("isRefered", {
      id: "isRefered",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">isReferred</p>
      ),
      cell: (info) => {
        return (
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {info.getValue() ? "YES" : "NO"}
          </p>
        )
      },
    }),
    columnHelper.accessor("lastRedeem", {
      id: "lastRedded",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">lastRedeem</p>
      ),
      cell: (info) => {
        return (
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {info.getValue() === null ? "Never" : new Date(+(info.getValue())).toDateString()}
          </p>
        )
      },
    }),
    columnHelper.accessor("_id", {
      id: "WATCH",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white"></p>
      ),
      cell: (info) => {
        return (
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            <button onClick={() => {
              console.log("jhsmdfhld");

            }}>
              <img src={eye} alt="Edit User" onClick={() => {
                navigate("/ProfileOverview", {
                  state: info.row.original
                })
              }} />
            </button>
          </p>
        )
      },
    }),

  ]; // eslint-disable-next-line
  const [data, setData] = React.useState(() => [...defaultData]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });
  return (
    <Card extra={"w-full h-full sm:overflow-auto px-6"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Users Table
        </div>
        {/* <CardMenu /> */}
        {
          len !== tableData.length && !(len > tableData.length) && (<button onClick={() => {
            setShowAll((pre) => !pre)
          }}>{showAll ? "show less" : "View All"}</button>)
        }
      </header>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-auto  customScrollbar  customScrollbarcustomScrollbar">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="!border-px !border-gray-400">
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-start"
                    >
                      <div className="items-center justify-between text-xs text-gray-200">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: "",
                          desc: "",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table
              .getRowModel()
              .rows.slice(0, !showAll ? len : table
                .getRowModel()
                .rows.length)
              .map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className="min-w-[130px] border-white/0 py-3  pr-4"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default CheckTable;
const columnHelper = createColumnHelper<UserInfo>();
