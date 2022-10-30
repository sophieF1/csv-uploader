import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Papa from "papaparse";
import toast from "react-hot-toast";
import ToastNotification from "../components/ToastNotification";
import tickIcon from "../images/tickIcon.png";

import {
  variants,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
} from "../components/ToastData";

const apiUrl = "https://run.mocky.io/v3/cbca762d-3f84-4ae4-bb26-79fa774a6c72";

const Button = styled.button`
    border-color: #1d8676;
    background: #1d8676;
    border-style: solid;
    padding: 8px;
    align-items: center;
    font-weight: 700;
    font-family: Calibri;
    display: inline-flex;
    line-height: 1.5;
    border-top-left-radius: 0.4rem;
    border-top-right-radius: 0.4rem;
    border-bottom-right-radius: 0.4rem;
    border-bottom-left-radius: 0.4rem;
    color: white;
    border-width: 0.1rem;
    justify-content: center;
    transition: 0.2s ease;
    width: 10%;
    margin-bottom: 1.5rem;
`;

const DragArea = styled.div`
border: 2px dashed #fff;
height: 150px;
width: 600px;
border-radius: 5px;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
background-color: #f8f8f8;
position: relative;
border: 2px dashed #ccc;
grid-template-areas:
    'icon text'
    'icon subtext';
    margin-left: auto;
    margin-right: auto;
    padding: 7rem 5rem;
`;

const Header = styled.header`
margin-left: auto;
margin-right: auto;
font-size: 25px;
font-family: Calibri;
color: #ccc;
font-weight: 700
`;

const Image = styled.img`
  display: inline-block;
`;

const Container = styled.div`
  position: relative;
`;

const Input = styled.input`
display: none;
  display: block;
  width: 100%;
  border: none;
  text-transform: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;

  &:focus {
    outline: none;
  }
`;


const Icon = styled.image`
font-size: 100px;
color: #fff;
font-family: Calibri
`;

const Info = styled.p`
position: absolute;
bottom: 0;
color: #ccc;
font-weight: 700;
font-family: Calibri
`;


const Table = styled.table`
padding: 10px;
font-family: Calibri;
margin-left: auto;
margin-right: auto;
margin-bottom: 1.5rem;
th {
  text-transform: uppercase;
  font-weight: 800
  
}
td, th {
  border-top-color: #F0F0F0;
    border-top-style: solid;
  text-align: left;
  padding: 10px;
  color: #ccc;
  
}
`;

const AddFile = () => {
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);
  // column names
  const [tableRows, setTableRows] = useState([]);
  //State to store the values
  const [values, setValues] = useState([]);
  const [nullValues, setNullValues] = useState(false);

  const [currentVariant, setCurrentVariant] = useState(variants.SUCCESS);
  const [title, setTitle] = useState(DEFAULT_TITLE.SUCCESS);
  const [message, setMessage] = useState(DEFAULT_DESCRIPTION.Success);


  // change title and message when notification variant changes
  useEffect(() => {
    setTitle(DEFAULT_TITLE[currentVariant]);
    setMessage(DEFAULT_DESCRIPTION[currentVariant]);
  }, [currentVariant]);


  const changeHandler = (event) => {
    // @TO-DO: handle validations 

    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: false,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];



        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(results.data);

        // Filtered Column Names
        setTableRows(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);

        //@To-do: handle null values and show error
        // setNullValues(nullValues);
      },
    });
  };

  const handleSubmit = async () => {
    try {
      if (parsedData.length === 0) {
        toast.custom(() => (
          <ToastNotification
            icon={tickIcon}
            bgColor="#B95656"
            title={DEFAULT_TITLE.NoFile}
            message={DEFAULT_DESCRIPTION.NoFile}
          />
        ));
      } else if (parsedData.length > 0) {
        const result = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(parsedData)
        });

        if (result.ok) {
          toast.custom(() => (
            <ToastNotification
              icon={tickIcon}
              bgColor="#5FA772"
              title={DEFAULT_TITLE.Success}
              message={DEFAULT_DESCRIPTION.Success}
            />
          ));
          setParsedData([]);
          setTableRows([]);
          setValues([]);
        }

      } else {
        toast.custom(() => (
          <ToastNotification
            icon={tickIcon}
            bgColor="#B95656"
            title={DEFAULT_TITLE.Fail}
            message={DEFAULT_DESCRIPTION.Fail}
          />
        ));
        throw new Error();
      }

    } catch (e) {

      console.log(e);
      toast.custom(() => (
        <ToastNotification
          icon={tickIcon}
          bgColor="#B95656"
          title={DEFAULT_TITLE.Fail}
          message={DEFAULT_DESCRIPTION.Fail}
        />
      ));
    }
  };

  return (
    <Container>
      <DragArea>
        <Icon><i className="fas fa-cloud-upload-alt" /> </Icon>
        <Header>Drag & Drop </Header>
        <Input
          type="file"
          name="file"
          accept=".csv"
          onChange={changeHandler}
        />
        <Info>Supported file types   <b style={{ color: '#1d8676' }}>    .csv .xls .xlsx </b></Info>
      </DragArea>
      <Table>
        <thead>
          <tr>
            {tableRows.map((rows, index) => {
              return <th key={index}>{rows}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {values.map((value, index) => {
            return (
              <tr key={index}>
                {value.map((val, i) => {
                  return <td key={i}>{val}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      {parsedData.length > 0 ? (
        <Button onClick={handleSubmit}>Submit</Button>) : null}
    </Container>
  );
}

export default AddFile;

