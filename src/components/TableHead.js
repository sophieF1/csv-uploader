import React,{ useState } from "react";
import downArrow from '../images/down_arrow.png';


const TableHead = ({ columns }) => {
    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState("asc");
    const handleSortingChange = (accessor) => {
        console.log(accessor);
       };
    return (
     <thead>
      <tr>
       {columns.map(({ label, accessor }) => {
        return <th key={accessor}  onClick={() => handleSortingChange(accessor)}>{label}</th>;
       })}
      </tr>
     </thead>
    );
   };
   
   export default TableHead;