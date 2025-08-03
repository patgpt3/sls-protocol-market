"use client";
import {
  Autocomplete,
  Icon,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from "@mui/material";

import { useEffect, useMemo, useState } from "react";
import {
  // useAsyncDebounce,
  // useGlobalFilter,
  // usePagination,
  // useSortBy,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  flexRender,
} from "@tanstack/react-table";
import "regenerator-runtime/runtime";
import { DataTableBodyCell } from "./DataTableBodyCell";
import { DataTableHeadCell } from "./DataTableHeadCell";
import MDBox from "../../Elements/MDBox";
import MDInput from "../../Elements/MDInput";
import MDPagination from "../../Elements/MDPagination";
import MDTypography from "../../Elements/MDTypography";

// Declaring props types for DataTable
interface Props {
  table: {
    columns: { [key: string]: any }[];
    rows: { [key: string]: any }[];
  };
  pageNumber?: number;
  setPageNumber: (page: number) => void;
  entriesPerPage?:
    | false
    | {
        defaultValue: number;
        entries: number[] | string[];
      };
  canSearch?: boolean;
  showTotalEntries?: boolean;
  pagination?: {
    variant: "contained" | "gradient";
    color:
      | "primary"
      | "secondary"
      | "info"
      | "success"
      | "warning"
      | "error"
      | "dark"
      | "light";
  };
  isSorted?: boolean;
  noEndBorder?: boolean;
  leftHeader?: JSX.Element;
  rightHeader?: JSX.Element;
  defaultEntriesPerPage?: number;
  setDefaultEntriesPerPage: (defaultEntriesPerPage: number) => void;
  sx?: any;
  noDataText?: string | JSX.Element;
  isLoading?: boolean;
  renderLoader?: boolean;
  onRowClick?: (event: any, row: any) => void;
  isHidePages?: boolean;
}

export function DataTable({
  entriesPerPage = { defaultValue: 5, entries: ["5", "10", "25", "50", "100"] },
  canSearch = false,
  showTotalEntries = true,
  table,
  pagination = { variant: "gradient", color: "info" },
  isSorted = true,
  noEndBorder = false,
  leftHeader,
  rightHeader,
  pageNumber,
  setPageNumber,
  defaultEntriesPerPage,
  setDefaultEntriesPerPage,
  sx = {},
  noDataText,
  isLoading,
  renderLoader,
  onRowClick,
  isHidePages = false,
}: Props): JSX.Element {
  let defaultValue: any;
  let entries: any[] = [];
  if (entriesPerPage) {
    defaultValue = defaultEntriesPerPage;
    entries = entriesPerPage.entries
      ? entriesPerPage.entries
      : ["5", "10", "25", "50", "100"];
  }

  const columns = useMemo<any>(() => table.columns, [table]);
  const data = useMemo<any>(() => table.rows, [table]);

  const tableInstance = useReactTable({
    columns,
    data,
    // useGlobalFilter,
    // useSortBy,
    // usePagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(), //order doesn't matter anymore!
    // initialState: { pageIndex: pageNumber },
  });

  useEffect(() => {
    console.log("tableInstance:", tableInstance);
  }, [tableInstance]);

  const [state, setState] = useState(tableInstance.initialState);

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const paginationTan = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  // override the state managers for the table
  tableInstance.setOptions((prev: any) => ({
    ...prev,
    onStateChange: setState,
    state: {
      ...state,
      paginationTan,
    },
    onPaginationChange: setPagination,
    pageCount: Math.ceil(table?.rows?.length / pageSize),
  }));

  const {
    // getTableProps,
    // getTableBodyProps,
    getHeaderGroups,
    // prepareRow,
    rows,
    getPageOptions,
    getCanPreviousPage,
    getCanNextPage,
    gotoPage,
    getRowModel,
    // nextPage,
    // previousPage,
    setPageSize,
  }: // setGlobalFilter,
  // state: {
  //   // pageIndex,
  //   // pageSize,
  //   // globalFilter,
  // },
  any = tableInstance || {};

  // Set the default value for the entries per page when component mounts
  useEffect(() => {
    return setPageSize(defaultEntriesPerPage || 5);
  }, [defaultEntriesPerPage, defaultValue, setPageSize]);

  const goToPageHandler = (page: number) => {
    setPageNumber(page);
    return gotoPage(page);
  };

  // Set the entries per page value based on the select value
  const setEntriesPerPage = (value: any) => {
    setDefaultEntriesPerPage(value);
    goToPageHandler(0);

    return setPageSize(value);
  };

  // Render the paginations
  const renderPagination = getPageOptions().map((option: any, i: number) => (
    <MDPagination
      item
      key={`page-${option}-${i}`}
      onClick={() => goToPageHandler(Number(option))}
      active={pageIndex === option}
    >
      {option + 1}
    </MDPagination>
  ));

  // Handler for the input to set the pagination index
  const handleInputPagination = ({ target: { value } }: any) =>
    value > getPageOptions().length || value < 0
      ? goToPageHandler(0)
      : goToPageHandler(Number(value));

  // Customized page options starting from 1
  const customizedPageOptions = getPageOptions().map(
    (option: any) => option + 1
  );

  // Setting value for the pagination input
  const handleInputPaginationValue = ({ target: value }: any) => {
    return goToPageHandler(Number(value.value - 1));
  };

  // Search input value state
  // const [search, setSearch] = useState(globalFilter);

  // Search input state handle
  // const onSearchChange = useAsyncDebounce((value) => {
  //   setGlobalFilter(value || undefined);
  // }, 100);

  // A function that sets the sorted value for the table
  const setSortedValue = (column: any) => {
    let sortedValue;

    if (isSorted && column.isSorted) {
      sortedValue = column.isSortedDesc ? "desc" : "asce";
    } else if (isSorted) {
      sortedValue = column.columnDef.disableSort ? false : "none";
    } else {
      sortedValue = false;
    }

    return sortedValue;
  };

  // Setting the entries starting point
  const entriesStart =
    pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;

  // Setting the entries ending point
  let entriesEnd;

  if (pageIndex === 0) {
    entriesEnd = pageSize;
  } else if (pageIndex === getPageOptions().length - 1) {
    entriesEnd = rows?.length;
  } else {
    entriesEnd = pageSize * (pageIndex + 1);
  }

  const onHandleClickNextPage = () => {
    return goToPageHandler(pageIndex + 1);
    // return nextPage()
  };
  const onHandleClickPreviousPage = () => {
    return goToPageHandler(pageIndex - 1);
    // return previousPage()
  };

  // return <></>;
  return (
    <MDBox sx={{ boxShadow: "none", ...sx }}>
      {canSearch || leftHeader || rightHeader ? (
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={3}
        >
          {leftHeader && (
            <MDBox display="flex" width="100%" alignItems="center">
              {leftHeader}
            </MDBox>
          )}
          {canSearch && (
            <MDBox width="12rem" ml="auto">
              {/* <MDInput
                placeholder="Search..."
                value={search}
                size="small"
                fullWidth
                onChange={({ currentTarget }: any) => {
                  setSearch(search);
                  // onSearchChange(currentTarget.value);
                }}
              /> */}
            </MDBox>
          )}
          {rightHeader && (
            <MDBox width="18rem" ml="auto">
              {rightHeader}
            </MDBox>
          )}
        </MDBox>
      ) : null}
      {renderLoader ? (
        <MDBox width="100%" mb={3}></MDBox>
      ) : (
        <MDBox
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            overflowX: "auto",
            "&::-webkit-scrollbar": {
              width: "0.4em",
            },
            "&::-webkit-scrollbar-track": {
              boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              backgroundColor: "rgba(0,0,0,.1)",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(26, 115, 232,.5)",
              // outline: '1px solid slategrey'
            },
          }}
          mx={2}
        >
          <TableContainer sx={{ boxShadow: "none", ...sx, maxHeight: "55vh" }}>
            <Table
              // {...getTableProps()}
              stickyHeader
            >
              {getHeaderGroups()?.map((headerGroup: any, i: number) => (
                <TableRow
                  // {...headerGroup.getHeaderGroupProps()}
                  sx={{
                    position: "sticky",
                    top: "0px",
                    left: "0px",
                    zIndex: 1000,
                    // backgroundColor: background.card,
                  }}
                  key={`${headerGroup.id}+${i}`}
                >
                  {headerGroup?.headers.map((header: any) => {
                    return (
                      // <th key={header.id} colSpan={header.colSpan}>
                      <DataTableHeadCell
                        // {...header.column.getHeaderProps(
                        //   isSorted && header.column.getSortByToggleProps()
                        // )}
                        // colSpan={header.colSpan}
                        width={"auto"}
                        align={"left"}
                        // toolTipTitle={header.column.toolTipElement}
                        // tooltipPlacement={header.column.tooltipPlacement}
                        headerColor={
                          header.column.color ? header.column.color : "white"
                        }
                        sorted={setSortedValue(header.column)}
                        isFullOpacity={header.column.columnDef.isFullOpacity}
                        key={`${header.column.name}+${i}`}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </DataTableHeadCell>
                      // </th>
                    );
                  })}
                  {/* {headerGroup[0]?.headers.map((column: any, i: any) => (
                    <DataTableHeadCell
                      {...column.getHeaderProps(isSorted && column.getSortByToggleProps())}
                      width={column.width ? column.width : 'auto'}
                      align={column.align ? column.align : 'left'}
                      toolTipTitle={column.toolTipElement}
                      tooltipPlacement={column.tooltipPlacement}
                      headerColor={column.color ? column.color : 'white'}
                      sorted={setSortedValue(column)}
                      isFullOpacity={column.isFullOpacity}
                      key={`${column.name}+${i}`}
                    >
                      {column.render('Header')}
                    </DataTableHeadCell>
                  ))} */}
                </TableRow>
              ))}
              <TableBody
              //  {...getTableBodyProps()}
              >
                {getRowModel().rows?.map((row: any, i: number) => {
                  // prepareRow(row);
                  return (
                    //   <TableRow
                    //     hover
                    //     // onClick={(event: any) => onRowClick(event, row)}
                    //     // {...row.getRowProps()}
                    //     key={`body-row+${i}`}
                    //   >
                    //     {row.getVisibleCells().map((cell: any, ci: number) => (
                    //       <DataTableBodyCell
                    //         noBorder={noEndBorder && rows.length - 1 === i}
                    //         align={cell.column.align ? cell.column.align : 'left'}
                    //         // {...cell.getCellProps()}
                    //         key={cell.id}
                    //       >
                    //         {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    //       </DataTableBodyCell>
                    //     ))}
                    //   </TableRow>
                    // ) : (
                    <TableRow
                      // {...row.getRowProps()}
                      key={`row=${i}`}
                    >
                      {row?.getVisibleCells()?.map((cell: any, ci: number) => (
                        <DataTableBodyCell
                          // noBorder={noEndBorder && rows.length - 1 === i}
                          align={cell.column.align ? cell.column.align : "left"}
                          // {...cell.getCellProps()}
                          key={cell.id}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </DataTableBodyCell>
                      ))}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {table.rows?.length !== 0 ? (
            <></>
          ) : isLoading ? (
            <MDBox
              alignSelf="center"
              // mr={1}
              sx={{ width: "25%" }}
              data-testid="table-loader"
            ></MDBox>
          ) : (
            <MDTypography
              variant="button"
              color="secondary"
              fontWeight="regular"
            >
              {noDataText || ""}
            </MDTypography>
          )}
        </MDBox>
      )}
      {!isHidePages && (
        <MDBox
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          p={!showTotalEntries && getPageOptions().length === 1 ? 0 : 3}
        >
          {showTotalEntries && (
            <MDBox mb={{ xs: 3, sm: 0 }}>
              <MDTypography
                variant="button"
                color="secondary"
                fontWeight="regular"
              >
                Showing {entriesStart} to {entriesEnd} of {rows?.length} entries
              </MDTypography>
            </MDBox>
          )}
          <MDBox>
            {getPageOptions().length > 1 && (
              <MDPagination
                variant={pagination.variant ? pagination.variant : "gradient"}
                color={pagination.color ? pagination.color : "info"}
              >
                {getCanPreviousPage && (
                  <MDPagination item onClick={onHandleClickPreviousPage}>
                    <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
                  </MDPagination>
                )}
                {renderPagination.length > 6 ? (
                  <MDBox width="5rem" mx={1}>
                    <MDInput
                      inputProps={{
                        type: "number",
                        min: 1,
                        max: customizedPageOptions.length,
                      }}
                      value={customizedPageOptions[pageIndex]}
                      onChange={(event: any) => {
                        handleInputPagination(event);
                        handleInputPaginationValue(event);
                      }}
                    />
                  </MDBox>
                ) : (
                  renderPagination
                )}
                {getCanNextPage && (
                  <MDPagination item onClick={onHandleClickNextPage}>
                    <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
                  </MDPagination>
                )}
              </MDPagination>
            )}
          </MDBox>

          {entriesPerPage && (
            <MDBox
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              pl={!showTotalEntries && getPageOptions().length === 1 ? 0 : 3}
              pb={!showTotalEntries && getPageOptions().length === 1 ? 0 : 3}
            >
              <MDBox display="flex" alignItems="center">
                <Autocomplete
                  disableClearable
                  value={pageSize.toString()}
                  options={entries}
                  onChange={(event, newValue) => {
                    // @ts-ignore
                    setEntriesPerPage(parseInt(newValue, 10));
                  }}
                  size="small"
                  sx={{ width: "5rem" }}
                  renderInput={(params) => <MDInput {...params} />}
                />
                <MDTypography variant="caption" color="secondary" mr={1}>
                  &nbsp;&nbsp;entries per page
                </MDTypography>
              </MDBox>
            </MDBox>
          )}
        </MDBox>
      )}
    </MDBox>
  );
}
