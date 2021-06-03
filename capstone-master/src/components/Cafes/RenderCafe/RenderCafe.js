import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import classes from "./RenderCafe.module.css";
import Select from 'react-select';
import Button from '@material-ui/core/Button';

export default function RenderCafe(props) {
  const [cafes, setCafes] = useState([]);
  
  const cuisine = [
    {value:"Dessert", label:"Dessert"},
    {value:"ice cream",label:"ice cream"},
    {value:"Coffee and Tea",label:"Coffee and Tea"}
    // "Burger & Sandwich",
    // "Pizza",
    // "BBQ, Kebab",
    // "Sushi",
    // "Chicken Grill",
    // "Khash",
    // "Lahmajo",
    // "Breakfast",
    // "Lunch",
    // "Dinner",
    // "Asian",
  ];

  const location = [
    {value:"Ajapnyak", label:"Ajapnyak"},
    {value:"Arabkir", label:"Arabkir"},
    {value:"Center", label:"Center"}
    // "Davtashen",
    // "Erebuni",
    // "Kanaker-Zeytun",
    // "Kentron",
    // "Malatia-Sebastia",
    // "Nork-Marash",
    // "Nor Nork",
    // "Nubarashen",
    // "Shengavit",
  ];

  const activity = [
    {value:"Work & Study", label:"Work & Study"},
    {value:"Friends Time", label:"Friends Time"},
    {value:"Music and Concerts", label:"Music and Concerts"}
    // "Hookah & Cigars",
    // "Friday Night",
    // "Wine & Cheese",
    // "Beer House & Pub",
    // "For Kids",
  ];
  const [values, setValues] = useState({
    tags: "",
    cuisine:"",
    district:""

  });

  const handleChange = (e)=>{
    let result = e.map(a => a.value);
    if(result.length === 0) {
      result = "";
    }
    setValues({...values , tags:result}); 
   // console.log(values);
    }
  const handleChangeTwo = (e)=>{
    let result = e.map(a => a.value);
    if(result.length === 0) {
      result = "";
    }
    console.log(result);
    setValues({...values , cuisine:result}); 
  //  console.log(values);

    }

  const handleChangeOne = (e)=>{
    let result = e.map(a => a.value);
    if(result.length === 0) {
      result = "";
    }
    setValues({...values , district:result}); 
    //console.log(values);
    }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const {tags, cuisine, district } = values
 

    return  axios.post("http://localhost:8050/cafes/filter?tags=${values.tags}", { 
      tags,
      cuisine, 
      district
    });
  };

let history = useHistory();

  async function fetchCafesFromServer() {
    const {tags, cuisine, district } = values
    const result = await axios.post("http://localhost:8050/cafes/filter", { 
      tags,
      cuisine, 
      district
    });
   setCafes(result.data);
  }

  useEffect(() => {
    console.log(values)
    fetchCafesFromServer();

  },[values]);

  const filteredCafes = cafes.filter((cafe) => {
    return cafe.name.toLowerCase().indexOf(props.search.toLowerCase()) !== -1;
  });

  return (
    <div className={classes.AllIn}>
       <div>
       <form className={classes.form} onSubmit={handleFormSubmit}>
       
        <h1>Sort by</h1>

        <div className={classes.sort}>
          <h3>Cuisine</h3>
          <Select options={cuisine} 
           isMulti
           onChange={handleChangeTwo}
           />
        </div>

        <div className={classes.sort}>
          <h3>District</h3>
          <Select options={location}
          isMulti 
           onChange={handleChangeOne}
           />
        </div>

        <div className={classes.sort}>
          <h3>Activity</h3>
          <Select options={activity} 
          isMulti
           onChange={handleChange}
           />
        </div>

          </form>
        </div>

    <div className={classes.renderCafe}>
      {filteredCafes.map((cafe) => (
        <div
          className={classes.eachCafe}
          onClick={() => {
            history.push("mycafe/" + cafe._id);
          }}
        >
          <img alt="cafeImage" src={cafe.selectedFile} style={{ width: "50%" }} />
          <p>
            <b>{cafe.name}</b> <br />
            Address: {cafe.street_name} <br />
            District: {cafe.district} <br />
          </p>
        </div>
      ))}
    </div>
   
    </div>
  );
}