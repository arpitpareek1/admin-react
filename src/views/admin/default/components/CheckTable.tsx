import React, { useRef, useState } from "react";
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

const CheckTable = React.memo((props: { tableData: any, len: number }) => {
  const { tableData, len } = props;
  const [showAll, setShowAll] = useState(false)
  const [userSearch, setUserSearch] = useState("")


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
        <p className="text-sm font-bold text-gray-600 dark:text-white">Balance</p>
      ),
      cell: (info) => {
        return (
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {info.getValue()}
          </p>
        )
      },
    }),
    columnHelper.accessor("rechargePoints", {
      id: "rechargePoints",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">Deposit Points</p>
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
      id: "Edit",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Edit
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          <button onClick={() => {
            navigate("/UserEditPage", {
              state: info.row.original
            })
          }}>Edit</button>
        </p>
      ),
    }),
    columnHelper.accessor("_id", {
      id: "WATCH",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">View</p>
      ),
      cell: (info) => {
        return (
          <p className="">
            <img src={eye} alt="Edit User" onClick={() => {
              navigate("/ProfileOverview", {
                state: info.row.original
              })
            }} />
          </p>
        )
      },
    }),

  ];
  const [data] = React.useState(() => [...defaultData]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // debugTable: true,
  });
  const inputRef = useRef<React.LegacyRef<HTMLInputElement> | null>(null)

  const SearchBar = ({ searchCallback }: { searchCallback: (e: any) => void }) => {
    return (
      <>
        <div className="bg-lightPrimary dark:bg-navy-900 p-4 rounded-lg mt-1 flex flex-col sm:flex-row sm:items-center">
          <input
            ref={inputRef as any}
            type="text"
            id="searchInput"
            placeholder="Search users..."
            className="flex-grow mb-2 sm:mb-0 sm:mr-2 py-2 px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:border-indigo-500"
            style={{ color: 'inherit' }} // Ensure text color inherits from parent
          />
          <button
            onClick={() => {
              if (inputRef) {
                searchCallback((inputRef.current as any).value)
              }
            }}
            className="py-2 px-4 mb-2 sm:mb-0 sm:mr-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
            Search
          </button>
          {userSearch && (
            <button
              onClick={() => {
                setUserSearch("")
              }}
              className="py-2 px-4 mb-2 sm:mb-0 bg-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
            >
              Remove Filter
            </button>
          )}
        </div>
      </>
    )
  }
  return (
    <Card extra={"w-full h-full sm:overflow-auto px-6"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Users Table
        </div>
        {
          len !== tableData.length && !(len > tableData.length) && (<button onClick={() => {
            setShowAll((pre) => !pre)
          }}>{showAll ? "show less" : "View All"}</button>)
        }
      </header>
      <SearchBar searchCallback={(e) => {
        console.log(e);
        setUserSearch(e)
      }} />
      <div className="mt-8 overflow-x-scroll xl:overflow-x-auto  customScrollbar  customScrollbarbuttonScrollbar">
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
              .rows.filter(row => {
                console.log(row.original.name);
                return (row.original.name).toLocaleLowerCase().includes(userSearch.toLocaleLowerCase()) || row.original.phone.includes(userSearch)
              })
              .slice(0, !showAll ? len : table
                .getRowModel()
                .rows.length)
              .map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className="min-w-[10px] border-white/0 py-3  pr-4"
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
})

export default CheckTable;
const columnHelper = createColumnHelper<UserInfo>();
