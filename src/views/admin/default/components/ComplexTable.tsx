import React, { useState } from "react";
import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import { MdCancel, MdCheckCircle, MdOutlineError } from "react-icons/md";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { WithdrawalInfo, UserInfo } from "types/interfaces";
import axios from "axios";
import { backend_url, toastCss } from "variables/helper";
import { toast } from "react-toastify";
import { BsThreeDotsVertical } from "react-icons/bs";

const columnHelper = createColumnHelper<WithdrawalInfo>();

export default function ComplexTable(props: { tableData: any, userData: UserInfo[], len: number }) {
  const { tableData, userData, len } = props;
  const [showAll, setShowAll] = useState(false)

  const [sorting, setSorting] = React.useState<SortingState>([]);

  let defaultData = tableData;
  const columns = [
    columnHelper.accessor("userId", {
      id: "userName",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">NAME</p>
      ),
      cell: (info) => {
        const userInfo = userData.filter((user) => user._id === info.getValue())
        const userName = userInfo.length ? userInfo[0].name : "Not Available"
        return (
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {userName}
          </p>
        )
      },
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          STATUS
        </p>
      ),
      cell: (info) => (
        <div className="flex items-center">
          {info.getValue() === "completed" ? (
            <MdCheckCircle className="text-green-500 me-1 dark:text-green-300" />
          ) : info.getValue() === "pending" ? (
            <MdCancel className="text-red-500 me-1 dark:text-red-300" />
          ) : info.getValue() === "cancelled" ? (
            <MdOutlineError className="text-amber-500 me-1 dark:text-amber-300" />
          ) : null}
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {info.getValue()}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor("createdAt", {
      id: "date",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">DATE</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("cardInfo", {
      id: "cardInfo",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          cardInfo
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue() && info.getValue() !== "" ? info.getValue() : "Not Available"}
        </p>
      ),
    }),
    columnHelper.accessor("amount", {
      id: "amount",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          amount
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("ifsc", {
      id: "ifsc",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          ifsc
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue() && info.getValue() !== "" ? info.getValue() : "Not Available"}
        </p>
      ),
    }),
    columnHelper.accessor("upi_id", {
      id: "upi_id",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          upi_id
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue() && info.getValue() !== "" ? info.getValue() : "Not Available"}
        </p>
      ),
    }),
    columnHelper.accessor("_id", {
      id: "Change-status",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Change status
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.row.original.status === "pending" ? <CardMenu onCallBack={(status) => {
            console.log(status);
            changeStatus(status, info.row.original._id)
          }} /> : <div className="flex"><button id="dropDownButton" className="flex items-center text-xl hover:cursor-pointer bg-gray p-2 text-brand-500 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10 linear justify-center rounded-lg font-bold transition duration-200"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" className="h-6 w-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path></svg></button></div>}
        </p>
      ),
    }),
  ];

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

  const changeStatus = (status: string, id: string) => {
    console.log(status, id);
    axios.post(backend_url + "transactions/changeStatus", {
      status, id
    }).then(({ data }) => {
      if (data && data.status) {
        toast.info("Status Updated", toastCss);
        window.location.reload()
      }
    })
      .catch(console.log)
      .finally(console.log)

  }

  return (
    <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
      <div className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          WithDraw Requests
        </div>
        {/* <CardMenu /> */}
        {
          len !== tableData.length && !(len > tableData.length) && (<button onClick={() => {
            setShowAll((pre) => !pre)
          }}>{showAll ? "show less" : "View All"}</button>)
        }

      </div>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-auto  customScrollbar">
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
                          className="min-w-[150px] border-white/0 py-3  pr-4"
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
