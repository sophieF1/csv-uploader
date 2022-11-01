import styled from 'styled-components';
import React from 'react';
import { Columns } from "./Column";
import TableHead from './TableHead';
import TableBody from './TableBody';

const TableContainer = styled.table`
    max-width: 750px;
    /* max-height: 500px; */
    margin: 0 auto;
    overflow: auto;
    margin-bottom: 10px;
 `;

const StyledTable = styled.table`
    width: 100%;
    border-spacing: 0;
    font-family: Calibri;
    border-top: 1px solid #ccc;
    margin-right: 400px;

    th {
            padding: 20px 20px;
            border-bottom: 1px solid #ccc;
            font-weight: bold;
            text-align: left;
            text-transform: uppercase;
          }
        }

          td {
                border-top: 1px solid #ddd;
                padding: 8px 20px;
              }
              tbody tr:first-child td {
                    border-top: none;
                  }
                      tbody tr:nth-child(2n) td {
                            background: #fff;
              
  `;

const Caption = styled.div`
    font-style: italic;
    font-size: 90%;
    margin-bottom: 20px;
    margin-top: 20px;
    font-family: Calibri;
  `;


const Table = (tableData) => {
    const columns = Columns
    return (
        <>
            <TableContainer>
                <Caption>
                    All columns require data before importing, column headers are sortable.
                </Caption>
                <StyledTable>
                    <TableHead columns={columns} />
                    <TableBody columns={columns} tableData={tableData.tableData} />
                </StyledTable>
            </TableContainer>
        </>
    );
};

export default Table;
