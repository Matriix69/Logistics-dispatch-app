import React from 'react'
import styled from 'styled-components'
import { useTable, usePagination, useRowSelect, useGlobalFilter, useAsyncDebounce } from 'react-table'
import GlobalFilter from './GlobalFilter'
import Pagination from './Pagination'


const Styles = styled.div`
  overflow-x: auto;
  width: 100%;
  table {
    border-spacing: 0;
    width:100%;

    thead{
      width: 100%;
    }

    tr {
      width: 100%;
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th{
        font-weight: 600;
        color: #B5B5C3 !important;
        font-size: 0.9rem !important;
        text-transform: capitalize;
        text-align: left;
        &.hide{
          @media (max-width: 768px){
            display: none;
          }
        }

        
        span{
            opacity: 0;
            transition: opacity .3s ease;
        }

        &:hover span{
            opacity: 1;
        } 
    }
    th:first-child {
        ${'' /* padding-left: 0;  */}
        padding-right:0; 
        @media (max-width: 400px){
          padding-left: 0;  
        }   
    }
    th:last-child { 
        padding-left: 0; 
        @media (max-width: 400px){
          padding-right: 0;  
        }
        ${'' /* padding-right:0;      */}
    }

    th,
    td {
        margin: 0;
        vertical-align: middle !important;
        padding: 20px ;
        line-height: 1.5;

        &.collapse {
          width: 35%;
          @media (max-width: 768px){
            width: 30%;
          }
          @media (max-width: 350px){
            width: 20%;
          }
        }
        &.collapse:nth-child(2) {
          width: 25%;
          @media (max-width: 768px){
            width: 20%;
          }
          @media (max-width: 400px){
            width: 1%;
          }
        }
        &.collapse:nth-child(3) {
          width: 20%;
          @media (max-width: 768px){
            width: 1%;
          }
          @media (max-width: 400px){
            width: 1%;
          }
        }
        &.collapse:nth-child(4) {
          width: 20%;
          @media (max-width: 768px){
            width: 20%;
          }
          @media (max-width: 400px){
            width: 20%;
          }
        }

      

      :last-child {
        border-right: 0;
      }
    }
    td{
        vertical-align: top;
        border-top: 1px solid #EBEDF3;
        ${'' /* white-space: nowrap; */}
        ${'' /* text-overflow: ellipsis;  */}
        ${'' /* padding: 7px 5px; */}
        ${'' /* overflow: hidden;  */}
        transition: .3s ease;
        transition-property: width, min-width, padding, opacity;
        max-width:1px;

        &.hide{
          @media (max-width: 768px){
            display: none;
          }
        }
    }
    td:first-child {
        padding-right:0; 
        @media (max-width: 400px){
          padding-left: 0;  
        }
        ${'' /* padding-left: 0;   */}
    }
    td:last-child { 
        padding-left: 0; 
        @media (max-width: 400px){
          padding-right: 0;  
        }
        ${'' /* padding-right:0;      */}
    }
  }

  .pagination {
    padding: 0.5rem;
  }
  .hover{
    &:hover{
      background-color: #f5f5f5 !important;
      cursor: pointer;
    }
  }
`



export function ReactTable({ columns, data, loading, tableTile, setRowData, showDataModal }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    usePagination,
    useRowSelect,
  )

  // Render the UI for your table
  return (
    <Styles >
        <div className="table-header-section">
            <p className="text text-title ">{tableTile}</p>
        
          <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              useAsyncDebounce={useAsyncDebounce}
          />
        </div>
          <table {...getTableProps()}>
              <thead>
              {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps({ className: `${column.collapse ? 'collapse ' : ''} ${column.show ? 'hide' : ''}`})}>
                          {column.render('Header')}
                      </th>
                  ))}
                  </tr>
              ))}
              </thead>
              <tbody {...getTableBodyProps()}>
              {loading && <tr className="m-5 spinner-border"></tr>}
              {page.map((row, i) => {
                  prepareRow(row)
                  return (
                  <tr onClick={() => {setRowData && setRowData(row) 
                  showDataModal && showDataModal(true)}} {...row.getRowProps({className: 'hover'})}>
                      {row.cells.map(cell => {
                      return <td {...cell.getCellProps({ className: cell.column.show ? 'hide' : ''})}>{cell.render('Cell')}</td>
                      })}
                  </tr>
                  )
              })}
              </tbody>
          </table>

      {data.length > 10 && <Pagination
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageIndex={pageIndex}
        gotoPage={gotoPage}
        setPageSize={setPageSize}
        pageSize={pageSize}
        previousPage={previousPage}
        nextPage={nextPage}
        pageOptions={pageOptions}
        pageCount={pageCount}
      />}

    </Styles>
  )
}



