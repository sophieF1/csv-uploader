import React, { useState, useEffect, useMemo } from 'react';
import styled from "styled-components";
import Papa from "papaparse";
import toast from "react-hot-toast";
import ToastNotification from "../components/ToastNotification";
import Table from "../components/Table";

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
    pointer-events:${(props) => props.disabled ? 'none' : null};
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

const AddFile = () => {
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);
  // column names
  const [tableRows, setTableRows] = useState([]);
  //State to store the values
  const [values, setValues] = useState([]);

  const [currentVariant, setCurrentVariant] = useState(variants.SUCCESS);
  const [title, setTitle] = useState(DEFAULT_TITLE.SUCCESS);
  const [message, setMessage] = useState(DEFAULT_DESCRIPTION.Success);
  const [errors, setErrors] = useState(false);

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
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        for (let i = 0; i < valuesArray.length; i++) {
          for (let j = 0; j < valuesArray.length; j++) {
            if (valuesArray[i][j] === '') {
              setErrors(true);
            }
          }
        }
        if (errors.length > 0) {
          toast.custom(() => (
            <ToastNotification
              bgColor="#B95656"
              title={DEFAULT_TITLE.NoEmptyValues}
              message={DEFAULT_DESCRIPTION.NoEmptyValues}
            />
          ));
        }

        // Parsed Data Response in array format
        setParsedData(results.data);

        // Filtered Column Names
        setTableRows(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);
      },
    });
  };

  const handleSubmit = async () => {
    try {
      if (parsedData.length === 0) {
        toast.custom(() => (
          <ToastNotification
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
          bgColor="#B95656"
          title={DEFAULT_TITLE.Fail}
          message={DEFAULT_DESCRIPTION.Fail}
        />
      ));
    }
  };

  return (
    <Container>
      {values.length === 0 ? (
        <>
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
          </DragArea></>) : null}

      {values.length > 0 && tableRows.length > 0 &&
        <Table tableData={parsedData} />}
      {parsedData.length > 0 ? (
        <Button onClick={handleSubmit} disabled={errors}>Submit</Button>) : null}
    </Container>
  );
}

export default AddFile;

