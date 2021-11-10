import React from 'react'
import styled from 'styled-components'
import { HiOutlineChevronDoubleLeft } from 'react-icons/hi';
import { HiOutlineChevronDoubleRight } from 'react-icons/hi';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { HiOutlineChevronRight } from 'react-icons/hi';

const PaginationContainer = styled.div`
    display: flex;
    flex-flow: wrap;
    align-items:  center;
    width: 100%;
    margin: 2rem 0;

    span{
        display: flex;
        flex-flow:wrap;
        align-items:  center;
    }
    .d-flex{
        display: flex;
    }
    .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        line-height: 1.35;
        height: calc(1em + 1rem + 2px);
        width: calc(1em + 1rem + 2px);
        cursor: pointer;
        outline: none;
        color: #181C32;
        background-color: #F3F6F9;
        border: none;
        ${'' /* border-color: #F3F6F9; */}
        box-shadow: none; 
        margin-bottom: 0.25rem !important;
        margin-right: 0.25rem !important;
        margin-top: 0.25rem !important;
        border-radius: .5rem;
        svg{
            color: #181C32;
        }  
    }
    .btn[disabled], .btn:disabled {
        opacity: 0.6;
        box-shadow: none;
        background-color: #F3F6F9;
        border-color: #F3F6F9;
        transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
        svg{
            color: #7E8299;
        }  
    }
    .btn:hover:not(:disabled):not([disabled]){
        
        background-color: #3699FF !important;
        border-color: #3699FF !important;
        svg{
            color: #FFFFFF !important;
        } 
    }

`

export default function Pagination({canPreviousPage, pageOptions, nextPage, previousPage, canNextPage, pageCount, pageIndex, gotoPage, pageSize, setPageSize}) {
    return(
        <PaginationContainer>
            <button className="btn" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                <HiOutlineChevronDoubleLeft/>
            </button>
            <button className="btn" onClick={() => previousPage()} disabled={!canPreviousPage}>
                <HiOutlineChevronLeft/>
            </button>
            <button className="btn" onClick={() => nextPage()} disabled={!canNextPage}>
                <HiOutlineChevronRight/>
            </button>
            <button className="btn" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                <HiOutlineChevronDoubleRight/>
            </button>
            <div className="d-flex">
                <span className="text text-small">
                    Page &nbsp;
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong> &nbsp;
                </span>
                {/* <span className="text text-small">
                    | Go to page: &nbsp;
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                        gotoPage(page)
                        }}
                        className="select"
                        style={{width: "75px", marginLeft: "5px"}}
                    />
                </span> */}
            </div>
            <select
                value={pageSize}
                onChange={e => {
                    setPageSize(Number(e.target.value))
                }}
                className="select"
                style={{width: "100px"}}
            >
                {[10, 20, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                ))}
            </select>
        </PaginationContainer>
    )
}
