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
import { WithdrawalInfo, UserInfo, TransactionsInfo } from "types/interfaces";

const columnHelper = createColumnHelper<TransactionsInfo>();

export default function TransactionTable(props: { tableData: any, userData: UserInfo[], len: number }) {
    const { tableData, userData, len } = props;
    console.log(tableData);
    const [showAll, setShowAll] = useState(false)
    const [sorting, setSorting] = React.useState<SortingState>([]);
    let defaultData = tableData;
    const columns = [
        columnHelper.accessor("userId", {
            id: "userName",
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">NAME</p>
            ),
            cell: (info) => (
                <p className="text-sm font-bold text-navy-700 dark:text-white">
                    {userData.filter((user) => user._id === info.getValue())[0].name}
                </p>
            ),
        }),
        columnHelper.accessor("product_name", {
            id: "product_name",
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">
                    product name
                </p>
            ),
            cell: (info) => {
                return (
                    <div className="flex items-center">
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {info.getValue()}
                        </p>
                    </div>
                )
            },
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
        columnHelper.accessor("transaction_id", {
            id: "cardInfo",
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">
                    Transaction Id
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
    ]
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
        <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
            <div className="relative flex items-center justify-between pt-4">
                <div className="text-xl font-bold text-navy-700 dark:text-white">
                    All Transactions
                </div>
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
