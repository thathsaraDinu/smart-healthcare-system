import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FaChevronDown } from 'react-icons/fa';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { RiArrowUpDownFill } from 'react-icons/ri';
import { FiMoreHorizontal } from 'react-icons/fi';
import useAppointments from '@/hooks/useAppointments';
import { useEffect } from 'react';

const columns = [
  {
    accessorKey: 'doctorName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === 'asc',
            )
          }
        >
          Doctor Name
          <RiArrowUpDownFill className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>{row.getValue('doctorName')}</div>
    ),
  },
  {
    accessorKey: 'typeOfTreatment',
    header: 'Type of Treatment',
    cell: ({ row }) => (
      <div>{row.getValue('typeOfTreatment')}</div>
    ),
  },
  {
    accessorKey: 'hospital',
    header: 'Hospital',
    cell: ({ row }) => (
      <div>{row.getValue('hospital')}</div>
    ),
  },
  {
    // Need to sort by date
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === 'asc',
            )
          }
        >
          Date
          <RiArrowUpDownFill className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-right">
        {row.getValue('date')}
      </div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <FiMoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Reminder</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const Treatments = () => {
  const { data: appoinmentData } = useAppointments();
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState(
    {},
  );
  const [data, setData] = useState([]);

  // console.log(appoinmentData);
  useEffect(() => {
    const data = appoinmentData
      ? appoinmentData.map((item) => ({
          id: item._id,
          doctorName: item.schedule.doctor.fullName,
          typeOfTreatment:
            item.schedule.doctor.specialization,
          hospital: item.schedule.hospital,
          date: item.schedule.date,
        }))
      : [];
    setData(data);
  }, [appoinmentData]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Treatments
        </h2>
        <div className="flex items-center space-x-2">
          <Input
            id="notify"
            type="checkbox"
            className="w-4 h-4 hover:cursor-pointer hover:ring-1 hover:ring-gray-300"
          />
          <label
            className="text-sm text-gray-500 hover:cursor-pointer"
            htmlFor="notify"
          >
            Turn on reminder notifications
          </label>
        </div>
      </div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Search by Type of Treatment..."
          value={
            table
              .getColumn('typeOfTreatment')
              ?.getFilterValue() || ''
          }
          onChange={(e) =>
            table
              .getColumn('typeOfTreatment')
              ?.setFilterValue(e.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns{' '}
              <FaChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={
                    row.getIsSelected() && 'selected'
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Footer */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length}{' '}
          of {table.getFilteredRowModel().rows.length}{' '}
          row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Treatments;
