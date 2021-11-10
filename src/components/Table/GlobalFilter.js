import React,{useState} from 'react'
import styled from 'styled-components'

const Styles = styled.div`
  display: flex;
  flex-flow: column;
  b, strong {
      font-weight: 600;
  }
  span{
    color: #B5B5C3 !important;
    font-size: 12px;
    display: block;
    margin-top: 0.25rem;
  }
`

export default function GlobalFilter({preGlobalFilteredRows, globalFilter, setGlobalFilter, useAsyncDebounce}) {

    const count = preGlobalFilteredRows.length
    const [value, setValue] = useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined)
    }, 200)
  
    return (
      <Styles>
        <input
          value={value || ""}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
          className="search"
          
        />
        <span className="form-text text-muted"><b>Search</b> in all fields</span>
      </Styles>
    )
}
