import Table from "./Table";
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import MOCK_DATA from "../test/MOCK_DATA.json";

test("Table component displays data correctly", async () => {
    render(<Table tableData={MOCK_DATA}/>);
    //Headings
    const tableHeadingBeneficiaryID = screen.getByText('Beneficiary ID'); 
    const tableHeadingCurrency = screen.getByText('Payment Currency'); 
    const tableHeadingAmount = screen.getByText('Payment Amount'); 
    const tableHeadingRef = screen.getByText('Payment Reference'); 
    
    //Data
    const tableDataBeneficiaryID = screen.getByText(1); 
    // const tableDataCurrency = screen.findAllByText('GBP'); 
    const tableDataAmount = screen.getByText('500'); 
    const tableDataRef = screen.getByText(1); 

    expect(tableHeadingBeneficiaryID).toBeInTheDocument();
    expect(tableHeadingCurrency).toBeInTheDocument();
    expect(tableHeadingAmount).toBeInTheDocument();
    expect(tableHeadingRef).toBeInTheDocument();

    expect(tableDataBeneficiaryID).toBeInTheDocument();
    // expect(tableDataCurrency).toBeInTheDocument();
    expect(tableDataAmount).toBeInTheDocument();
    expect(tableDataRef).toBeInTheDocument();
});


