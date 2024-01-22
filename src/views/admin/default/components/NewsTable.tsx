import React, { useState } from "react";
import Card from "components/card";

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import { News } from "types/interfaces";
import { useNavigate } from "react-router-dom";

const columnHelper = createColumnHelper<News[]>();

export default function NewsTable(props: { tableData: any, len: number }) {
    const { tableData, len } = props;
    const navigate = useNavigate()
    console.log(tableData);
    const [showAll, setShowAll] = useState(false)
    const [sorting, setSorting] = React.useState<SortingState>([]);
    let defaultData = tableData;
    const columns = [
        columnHelper.accessor("imageSource", {
            id: "imageSource",
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">Image</p>
            ),
            cell: (info) => (
                <p className="text-sm font-bold text-navy-700 dark:text-white border-1 " style={{
                    border: "1px solid #ccc", borderRadius: "10px", width: "max-content"
                }}>
                    <img src={info.getValue() as string} alt="imageSource" style={{
                        width: 100,
                    }} />
                </p>
            ),
        }),
        columnHelper.accessor("title", {
            id: "title",
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">title</p>
            ),
            cell: (info) => (
                <p className="text-sm font-bold text-navy-700 dark:text-white">
                    {info.getValue() as string}
                </p>
            ),
        }),
        columnHelper.accessor("category", {
            id: "dailyIncome",
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">
                    dailyIncome
                </p>
            ),
            cell: (info) => {
                return (
                    <div className="flex items-center">
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {info.getValue() as string}
                        </p>
                    </div>
                )
            },
        }),

        columnHelper.accessor("date", {
            id: "date",
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">
                    date
                </p>
            ),
            cell: (info) => (
                <p className="text-sm font-bold text-navy-700 dark:text-white">
                    {info.getValue() as string}
                </p>
            ),
        }),
        columnHelper.accessor("description", {
            id: "description",
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">
                    description
                </p>
            ),
            cell: (info) => (
                <p className="text-sm font-bold text-navy-700 dark:text-white">
                    {info.getValue() as string}
                </p>
            ),
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
                        navigate("/NewsEditPage", {
                            state: info.row.original
                        })
                    }}>Edit</button>
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
                    All News
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
