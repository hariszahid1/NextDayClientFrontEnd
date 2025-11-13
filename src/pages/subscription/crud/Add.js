 import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { InputGroup, Table } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { Form } from "react-bootstrap";
import styles from "./frame1.css";
import DatePicker, { DateObject } from "react-multi-date-picker";
import SubTypeModal from "../../../components/SubTypeModal/SubTypeModal";
import Button from "react-bootstrap/Button";
import { SiAddthis } from "react-icons/si";
import { AiOutlineClose } from "react-icons/ai";
import { toastmessage } from "../../../components/ToastMessage/toast";
import moment from "moment";
import axios from "axios";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import Checkbox from "../../../components/Checkbox/Checkbox";


const AddSubscription = () => {
  const [multiDate, setMultiDate] = useState([]);
  const [startDate, setStartDate] = useState();
  const [clientId, setclientId] = useState("");
  const [protein, setProtein] = useState("");
  const[searchQuery,setSearchQuery]=useState("");
  const [calorie, setCalorie] = useState("");
  const [isCheck, setIsCheck] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [filteredClientList, setFilteredClientList] = useState([]);



  
  const GetAllClients = async () => {
    await axios
      .get(`http://localhost:8001/api/clients/getallclients`)
      .then((res) => {
        setClientList(res.data);
        console.log("clients", res.data);
      });
  };
  useEffect(() => {
    GetAllClients();
  }, []);
  useEffect(() => {
    console.log(clientList);
    const filteredList = clientList.filter(({ clientName }) =>
      clientName?.toLowerCase().includes(searchQuery?.toLowerCase())
    );
    setFilteredClientList(filteredList);
  }, [searchQuery, clientList]);
  
  

  const handleClick = (e) => {
    const { id, checked, name } = e.target;
   
    console.log("length ", isCheck.length);
   if(isCheck.length > 0 && checked){
      toastmessage("Please select one client", "error");
    }
    else if(checked){
      setIsCheck([...isCheck, id]);
      setclientId(id);
    console.log("client Id", clientId)

    }
    if (!checked && clientId == id) {
      console.log("Unchecked")
      setIsCheck(isCheck.filter((item) => item !== id));
      setclientId("");
      console.log("unchecked", isCheck);
    }
    
    console.log(e.target);
  };
  console.log("check", isCheck);
  const handleSave = () =>{
  setShow(false);
  }
  const [finalWednesdayObject, setWednesdayObject] = useState({
    date: "",
    categories: [],
    targetProtien: "",
    targetCaloriess: "",
  });
  const [finalThursdayObject, setThursdayObject] = useState({
    date: "",
    categories: [],
    targetProtien: "",
    targetCaloriess: "",
  });
  const [finalFridayObject, setFridayObject] = useState({
    date: "",
    categories: [],
    targetProtien: "",
    targetCaloriess: "",
  });
  const [finalSatursdayObject, setSatursdayObject] = useState({
    date: "",
    categories: [],
    targetProtien: "",
    targetCaloriess: "",
  });
  const [finalSundayObject, setSundayObject] = useState({
    date: "",
    categories: [],
    targetProtien: "",
    targetCaloriess: "",
  });
  const [finalMondayObject, setMondayObject] = useState({
    date: "",
    categories: [],
    targetProtien: "",
    targetCaloriess: "",
  });
  const [finalTuesdayObject, setTuesdayObject] = useState({
    date: "",
    categories: [],
    targetProtien: "",
    targetCaloriess: "",
  });
  const [subDay, setSubDay] = useState(1);
  const [menuButton, setMenuButton] = useState("");
  const [mondayMeal, setMondayMeal] = useState([]);
  const [tuesdayMeal, setTuesdayMeal] = useState([]);
  const [wednesdayMeal, setWednesdayMeal] = useState([]);
  const [thursdayMeal, setThursdayMeal] = useState([]);
  const [fridayMeal, setFridayMeal] = useState([]);
  const [satursdayMeal, setSatursdayMeal] = useState([]);
  const [sundayMeal, setSundayMeal] = useState([]);
  const [sumChicken, setSumChicken] = useState(0);
  const [sumBeef, setSumBeef] = useState(0);
  const [sumBreakfast, setSumBreakfast] = useState(0);
  const [counter, setCount] = useState(0);
  const [carbs, setCarbs] = useState([]);
  const [id, setId] = useState("");
  const [carbsChecked, setCarbsChecked] = useState(false);
  const [addCarbMeal, setAddCarbMeal] = useState(false);
  const [addedMeal, setAddedMeal] = useState([]);
  const format = "YYYY-MM-DD";
  const [dates, setDates] = useState([]);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState([]);
  const [show, setShow] = useState(false);
  dates.map((item) => {
    console.log(item.format());
  });
  useEffect(() => {
    const GetAllCategory = async () => {
      await axios
        .get(`http://localhost:8001/api/meals/lookups/mealCategory/getAll`)
        .then((res) => {
          const categoryList = res.data.map((data) => {
            return { ...data, id: data._id, name: data.categoryName };
          });
          setList(categoryList);
        });
    };
    GetAllCategory();
  }, []);
  console.log("Category", list);

  // console.log(protein)
  // console.log(calorie)

  // console.log( typeof(menuInput))
  // console.log(menuInput)

  // console.log(sundayMealObject);
  // console.log(multiDate)
  // const handleDateSelection = date => {
  //   setSelectedDates([...selectedDates, date]);
  // };
  // const handleMultiDateSkip=(date)=>{
  //   var convertDate=moment(date).format("YYYY-DD-MM");
  //   console.log("Converted Date",convertDate)
  //     setMultiDate([...multiDate,convertDate])
  // }

  // console.log(startDate);
  // console.log(dates[0].format())

  const handleSundayState = (id) => (event) => {
    setSundayMeal((inputs) =>
      inputs.map((input) =>
        input.id === id
          ? {
              ...input,
              inputValue: parseInt(event.target.value),
            }
          : input
      )
    );
  };

  const handleMondayState = (id) => (event) => {
    setMondayMeal((inputs) =>
      inputs.map((input) =>
        input.id === id
          ? {
              ...input,
              inputValue: parseInt(event.target.value),
            }
          : input
      )
    );
  };
  const handleTuesdayState = (id) => (event) => {
    setTuesdayMeal((inputs) =>
      inputs.map((input) =>
        input.id === id
          ? {
              ...input,
              inputValue: parseInt(event.target.value),
            }
          : input
      )
    );
  };
  const handleWednesdayState = (id) => (event) => {
    setWednesdayMeal((inputs) =>
      inputs.map((input) =>
        input.id === id
          ? {
              ...input,
              inputValue: parseInt(event.target.value),
            }
          : input
      )
    );
  };
  const handleThursdayState = (id) => (event) => {
    setThursdayMeal((inputs) =>
      inputs.map((input) =>
        input.id === id
          ? {
              ...input,
              inputValue: parseInt(event.target.value),
            }
          : input
      )
    );
  };
  const handleFridayState = (id) => (event) => {
    setFridayMeal((inputs) =>
      inputs.map((input) =>
        input.id === id
          ? {
              ...input,
              inputValue: parseInt(event.target.value),
            }
          : input
      )
    );
  };
  const handleSatursdayState = (id) => (event) => {
    setSatursdayMeal((inputs) =>
      inputs.map((input) =>
        input.id === id
          ? {
              ...input,
              inputValue: parseInt(event.target.value),
            }
          : input
      )
    );
  };
  console.log("SUNDAY MEAL INPUT", sundayMeal);

  console.log("Sunday Meal", sundayMeal);
  console.log("Monday Meal", mondayMeal);
  console.log("Tuesday Meal", tuesdayMeal);
  console.log("Wednesday mEAL", wednesdayMeal);
  console.log("Thursday Meal", thursdayMeal);
  console.log("Friday Meal", fridayMeal);
  console.log("Satursday Meal", satursdayMeal);
  console.log("Sunday Meal", sundayMeal);
  var mealObjectAll = [];
  sundayMeal.map((item) => mealObjectAll.push(item));
  mondayMeal.map((item) => mealObjectAll.push(item));
  tuesdayMeal.map((item) => mealObjectAll.push(item));
  wednesdayMeal.map((item) => mealObjectAll.push(item));
  thursdayMeal.map((item) => mealObjectAll.push(item));
  fridayMeal.map((item) => mealObjectAll.push(item));
  satursdayMeal.map((item) => mealObjectAll.push(item));
  console.log("Meal oBJECT", mealObjectAll);
  // console.log("ALL MEALS",mealObjectAll)
  const getValues1 = () => {
    const res = Array.from(
      mealObjectAll.reduce(
        (m, { mealName, inputValue }) =>
          m.set(mealName, (m.get(mealName) || 0) + inputValue),
        new Map()
      ),
      ([mealName, inputValue]) => ({ mealName, inputValue })
    );
    setTotal(res);
    console.log(res);
    // mealObjectAll.reduce((acc, curr) => {
    //   let findIndex = acc.findIndex(item => item.mealName === curr.mealName);

    //   if (findIndex === -1) {
    //     acc.push(curr)
    //   } else {

    //     acc[findIndex].inputValue += curr.inputValue
    //   }
    //   console.log(acc)
    //   setTotal(acc);
    //   // return acc;
    // }, [])
    // console.log("SUMM ALL",sumAll)
  };
  console.log("Total", total);

  const removeMondayMenu = (index) => {
    const newMenu = mondayMeal.filter((_, i) => i !== index);
    setMondayMeal(newMenu);
  };
  const removeTuesdayMenu = (index) => {
    const newMenu = tuesdayMeal.filter((_, i) => i !== index);
    setTuesdayMeal(newMenu);
  };
  const removeWednesdayMenu = (index) => {
    const newMenu = wednesdayMeal.filter((_, i) => i !== index);
    setWednesdayMeal(newMenu);
  };
  const removeThursdayMenu = (index) => {
    const newMenu = thursdayMeal.filter((_, i) => i !== index);
    setThursdayMeal(newMenu);
  };
  const removeFridayMenu = (index) => {
    const newMenu = fridayMeal.filter((_, i) => i !== index);
    setFridayMeal(newMenu);
  };
  const removeSatursdayMenu = (index) => {
    const newMenu = satursdayMeal.filter((_, i) => i !== index);
    setSatursdayMeal(newMenu);
  };
  const removeSundayMenu = (index) => {
    const newMenu = sundayMeal.filter((_, i) => i !== index);
    setSundayMeal(newMenu);
  };
  const HandleCarbMeal = (data) => {
    setAddedMeal(data);
    setCarbs(data);
    setAddCarbMeal(false);
  };
  const HandleAddMeal = () => {
    setAddCarbMeal(true);
  };
  const requestedNewClientId = parseInt(clientId);
  console.log(sundayMeal);
  const sundayMealObject = sundayMeal.map((item) => {
    return { categoryName: item.mealName };
  });
  console.log(sundayMealObject);
  const mondayMealObject = mondayMeal.map((item) => {
    return { categoryName: item.mealName };
  });
  const tuesdayMealObject = tuesdayMeal.map((item) => {
    return { categoryName: item.mealName };
  });
  const wednesdayMealObject = wednesdayMeal.map((item) => {
    return { categoryName: item.mealName };
  });
  const thursdayMealObject = thursdayMeal.map((item) => {
    return { categoryName: item.mealName };
  });
  const fridayMealObject = fridayMeal.map((item) => {
    return { categoryName: item.mealName };
  });
  const satursdayMealObject = satursdayMeal.map((item) => {
    return { categoryName: item.mealName };
  });

  console.log("Sunday Meal Object ", sundayMealObject);
  console.log("Monday Meal Object ", mondayMealObject);
  console.log("Tuesday Meal Object ", tuesdayMealObject);
  console.log("Wednesday mEAL Object ", wednesdayMealObject);
  console.log("Thursday Meal Object ", thursdayMealObject);
  console.log("Friday Meal Object ", fridayMealObject);
  console.log("Satursday Meal Object ", satursdayMealObject);
  console.log("Sunday Meal Object ", sundayMealObject);

  console.log("Before Sunday Meal Object", sundayMealObject);
  const AddSubscriptions = async () => {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    console.log(startDate);
    let day = weekday[startDate];
    const date = moment(startDate);
    const currentday = date.day();
    const currentWeekDay = weekday[currentday];
    console.log(weekday[currentday]);

    //Get Next 7 DAYS
    let days = [];
    let daysRequired = 7;

    for (let i = 1; i <= daysRequired; i++) {
      days.push(
        moment(startDate)
          .add(i, "days")
          .format("YYYY-MM-DD")
      );
    }

    console.log("Meals Starts");
    console.log(days);

    console.log("Meals Ends");

    console.log(finalWednesdayObject);
    console.log(finalThursdayObject);
    console.log(finalFridayObject);
    console.log(finalSatursdayObject);
    console.log(finalSundayObject);
    console.log(finalMondayObject);
    console.log(finalTuesdayObject);
    //MULTIPLE OBJECTS ADDITION OPEN
    sundayMeal.map((item) => {
      if (item.inputValue == 2) {
        sundayMealObject.push({ categoryName: item.mealName });
      }
      if (item.inputValue == 3) {
        sundayMealObject.push(
          { categoryName: item.mealName },
          { categoryName: item.mealName }
        );
      }
      if (item.inputValue == 4) {
        sundayMealObject.push(
          { categoryName: item.mealName },
          { categoryName: item.mealName },
          { categoryName: item.mealName }
        );
      }
    });
    mondayMeal.map((item) => {
      if (item.inputValue == 2) {
        mondayMealObject.push({ categoryName: item.mealName });
      }
      if (item.inputValue == 3) {
        mondayMealObject.push(
          { categoryName: item.mealName },
          { categoryName: item.mealName }
        );
      }
      if (item.inputValue == 4) {
        mondayMealObject.push(...mondayMealObject, ...mondayMealObject, {
          categoryName: item.mealName,
        });
      }
    });
    tuesdayMeal.map((item) => {
      if (item.inputValue == 2) {
        tuesdayMealObject.push({ categoryName: item.mealName });
      }
      if (item.inputValue == 3) {
        tuesdayMealObject.push(
          { categoryName: item.mealName },
          { categoryName: item.mealName }
        );
      }
      if (item.inputValue == 4) {
        tuesdayMealObject.push(...tuesdayMealObject, ...tuesdayMealObject, {
          categoryName: item.mealName,
        });
      }
    });
    wednesdayMeal.map((item) => {
      if (item.inputValue == 2) {
        wednesdayMeal.push({ categoryName: item.mealName });
      }
      if (item.inputValue == 3) {
        wednesdayMealObject.push(
          { categoryName: item.mealName },
          { categoryName: item.mealName }
        );
      }
      if (item.inputValue == 4) {
        wednesdayMealObject.push(
          ...wednesdayMealObject,
          ...wednesdayMealObject,
          { categoryName: item.mealName }
        );
      }
    });
    thursdayMeal.map((item) => {
      if (item.inputValue == 2) {
        thursdayMealObject.push({ categoryName: item.mealName });
      }
      if (item.inputValue == 3) {
        thursdayMealObject.push(
          { categoryName: item.mealName },
          { categoryName: item.mealName }
        );
      }
      if (item.inputValue == 4) {
        thursdayMealObject.push(...thursdayMealObject, ...thursdayMealObject, {
          categoryName: item.mealName,
        });
      }
    });
    fridayMeal.map((item) => {
      if (item.inputValue == 2) {
        fridayMealObject.push({ categoryName: item.mealName });
      }
      if (item.inputValue == 3) {
        fridayMealObject.push(
          { categoryName: item.mealName },
          { categoryName: item.mealName }
        );
      }
      if (item.inputValue == 4) {
        fridayMealObject.push(...fridayMealObject, ...fridayMealObject, {
          categoryName: item.mealName,
        });
      }
    });
    satursdayMeal.map((item) => {
      if (item.inputValue == 2) {
        satursdayMealObject.push({ categoryName: item.mealName });
      }
      if (item.inputValue == 3) {
        satursdayMealObject.push(
          { categoryName: item.mealName },
          { categoryName: item.mealName }
        );
      }
      if (item.inputValue == 4) {
        satursdayMealObject.push(
          ...satursdayMealObject,
          ...satursdayMealObject,
          { categoryName: item.mealName }
        );
      }
    });
    sundayMealObject.map((item) => {
      if (item.inputValue == 2) {
        sundayMealObject.push({ categoryName: item.mealName });
      }
      if (item.inputValue == 3) {
        sundayMealObject.push(
          { categoryName: item.mealName },
          { categoryName: item.mealName }
        );
      }
      if (item.inputValue == 4) {
        sundayMealObject.push(...sundayMealObject, ...sundayMealObject, {
          categoryName: item.mealName,
        });
      }
    });
    console.log("NEW SUNDAY MEAL OBJECT", sundayMealObject);
    console.log("NEW Monday MEAL OBJECT", mondayMealObject);
    console.log("NEW tuesday MEAL OBJECT", tuesdayMealObject);
    console.log("NEW wednesday MEAL OBJECT", wednesdayMealObject);
    console.log("NEW thursday MEAL OBJECT", thursdayMealObject);
    console.log("NEW friday MEAL OBJECT", fridayMealObject);
    console.log("NEW satursday MEAL OBJECT", satursdayMealObject);

    const arr = [];
    // console.log(mondayMealObject);
    if (currentWeekDay == "Monday") {
      var count = 0;
      if (
        mondayMealObject.length != 0 &&
        finalMondayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: startDate,
          categories: mondayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("monday meal object added");
        count = count + 1;
      }
      if (
        tuesdayMealObject.length != 0 &&
        finalTuesdayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[0],
          categories: tuesdayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("tuesday meal object added");
        count = count + 1;
      }
      if (
        wednesdayMealObject.length != 0 &&
        finalWednesdayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[1],
          categories: wednesdayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("wednesday meal object added");
        count = count + 1;
      }
      if (
        thursdayMealObject.length != 0 &&
        finalThursdayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[2],
          categories: thursdayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("thursday meal object added");
        count = count + 1;
      }
      if (
        fridayMealObject.length != 0 &&
        finalFridayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[3],
          categories: fridayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("friday meal object added");
        count = count + 1;
      }
      if (
        satursdayMealObject.length != 0 &&
        finalSatursdayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[4],
          categories: satursdayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("satursday meal object added");
        count = count + 1;
      }
      if (
        sundayMealObject.length != 0 &&
        finalSundayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[5],
          categories: sundayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("sunday meal object added");
        count = count + 1;
      }
    }
    if (currentWeekDay == "Tuesday") {
      var count = 0;
      if (
        tuesdayMealObject.length != 0 &&
        finalTuesdayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: startDate,
          categories: tuesdayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("tuesday meal object added");
        count = count + 1;
      }
      if (
        wednesdayMealObject.length != 0 &&
        finalWednesdayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[0],
          categories: wednesdayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("wednesday meal object added");
        count = count + 1;
      }
      if (
        thursdayMealObject.length != 0 &&
        finalThursdayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[1],
          categories: thursdayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("thursday meal object added");
        count = count + 1;
      }
      if (
        fridayMealObject.length != 0 &&
        finalFridayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[2],
          categories: fridayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("friday meal object added");
        count = count + 1;
      }
      if (
        satursdayMealObject.length != 0 &&
        finalSatursdayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[3],
          categories: satursdayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("satursday meal object added");
        count = count + 1;
      }
      if (
        sundayMealObject.length != 0 &&
        finalSundayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[4],
          categories: sundayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("sunday meal object added");
        count = count + 1;
      }
      if (
        mondayMealObject.length != 0 &&
        finalMondayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[5],
          categories: mondayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("monday meal object added");
        count = count + 1;
      }
    }
    if (currentWeekDay == "Wednesday") {
      var count = 0;
      if (
        wednesdayMealObject.length != 0 &&
        finalWednesdayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: startDate,
          categories: wednesdayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("wednesday meal object added");
        count = count + 1;
      }
      if (
        thursdayMealObject.length != 0 &&
        finalThursdayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[0],
          categories: thursdayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("thursday meal object added");
        count = count + 1;
      }
      if (
        fridayMealObject.length != 0 &&
        finalFridayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[1],
          categories: fridayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("friday meal object added");
        count = count + 1;
      }
      if (
        satursdayMealObject.length != 0 &&
        finalSatursdayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[2],
          categories: satursdayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("satursday meal object added");
        count = count + 1;
      }
      if (
        sundayMealObject.length != 0 &&
        finalSundayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[3],
          categories: sundayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("sunday meal object added");
        count = count + 1;
      }
      if (
        mondayMealObject.length != 0 &&
        finalMondayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[4],
          categories: mondayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("monday meal object added");
        count = count + 1;
      }
      if (
        tuesdayMealObject.length != 0 &&
        finalTuesdayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[5],
          categories: tuesdayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("tuesday meal object added");
        count = count + 1;
      }
    }
    if (currentWeekDay == "Thursday") {
      var count = 0;
      if (
        thursdayMealObject.length != 0 &&
        finalThursdayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: startDate,
          categories: thursdayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("thursday meal object added");
        count = count + 1;
      }
      if (
        fridayMealObject.length != 0 &&
        finalThursdayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[0],
          categories: thursdayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("friday meal object added");
        count = count + 1;
      }
      if (
        satursdayMealObject.length != 0 &&
        finalSatursdayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[1],
          categories: thursdayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("satursday meal object added");
        count = count + 1;
      }
      if (
        sundayMealObject.length != 0 &&
        finalSundayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[2],
          categories: thursdayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("sunday meal object added");
        count = count + 1;
      }
      if (
        mondayMealObject.length != 0 &&
        finalMondayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[3],
          categories: thursdayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("monday meal object added");
        count = count + 1;
      }
      if (
        tuesdayMealObject.length != 0 &&
        finalTuesdayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[4],
          categories: thursdayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("tuesday meal object added");
        count = count + 1;
      }
      if (
        wednesdayMealObject.length != 0 &&
        finalWednesdayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[5],
          categories: thursdayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("wednesday meal object added");
        count = count + 1;
      }
    }
    if (currentWeekDay == "Friday") {
      var count = 0;
      if (
        fridayMealObject.length != 0 &&
        finalFridayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: startDate,
          categories: fridayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("friday meal object added");
        count = count + 1;
      }
      if (
        satursdayMealObject.length != 0 &&
        finalSatursdayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[0],
          categories: satursdayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("satursday meal object added");
        count = count + 1;
      }
      if (
        sundayMealObject.length != 0 &&
        finalSundayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[1],
          categories: sundayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("sunday meal object added");
        count = count + 1;
      }
      if (
        mondayMealObject.length != 0 &&
        finalMondayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[2],
          categories: mondayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("monday meal object added");
        count = count + 1;
      }
      if (
        tuesdayMealObject.length != 0 &&
        finalTuesdayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[3],
          categories: tuesdayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("tuesday meal object added");
        count = count + 1;
      }
      if (
        wednesdayMealObject.length != 0 &&
        finalWednesdayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[4],
          categories: wednesdayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("wednesday meal object added");
        count = count + 1;
      }
      if (
        thursdayMealObject.length != 0 &&
        finalThursdayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[5],
          categories: thursdayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("thursday meal object added");
        count = count + 1;
      }
    }
    if (currentWeekDay == "Saturday") {
      var count = 0;

      if (
        satursdayMealObject.length != 0 &&
        finalSatursdayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: startDate,
          categories: satursdayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("satursday meal object added");
        count = count + 1;
      }
      if (
        sundayMealObject.length != 0 &&
        finalSundayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[0],
          categories: sundayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("sunday meal object added");
        count = count + 1;
      }
      if (
        mondayMealObject.length != 0 &&
        finalMondayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[1],
          categories: mondayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("monday meal object added");
        count = count + 1;
      }
      if (
        tuesdayMealObject.length != 0 &&
        finalTuesdayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[2],
          categories: tuesdayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("tuesday meal object added");
        count = count + 1;
      }
      if (
        wednesdayMealObject.length != 0 &&
        finalWednesdayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[3],
          categories: wednesdayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("wednesday meal object added");
        count = count + 1;
      }
      if (
        thursdayMealObject.length != 0 &&
        finalThursdayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[4],
          categories: thursdayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("thursday meal object added");
        count = count + 1;
      }
      if (
        fridayMealObject.length != 0 &&
        finalFridayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[5],
          categories: fridayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("friday meal object added");
        count = count + 1;
      }
    }
    if (currentWeekDay == "Sunday") {
      var count = 0;

      if (
        sundayMealObject.length != 0 &&
        finalSundayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: startDate,
          categories: sundayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("sunday meal object added");
        count = count + 1;
      }
      if (
        mondayMealObject.length != 0 &&
        finalMondayObject.categories.length == 0 &&
        count != subDay
      ) {
        console.log(days[0]);
        arr.push({
          date: days[0],
          categories: mondayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log(arr);
        console.log("monday meal object added");
        count = count + 1;
      }
      if (
        tuesdayMealObject.length != 0 &&
        finalTuesdayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[1],
          categories: tuesdayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("tuesday meal object added");
        count = count + 1;
      }
      if (
        wednesdayMealObject.length != 0 &&
        finalWednesdayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[2],
          categories: wednesdayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("wednesday meal object added");
        count = count + 1;
      }
      if (
        thursdayMealObject.length != 0 &&
        finalThursdayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[3],
          categories: thursdayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("thursday meal object added");
        count = count + 1;
      }
      if (
        fridayMealObject.length != 0 &&
        finalFridayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[4],
          categories: fridayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("friday meal object added");
        count = count + 1;
      }
      if (
        satursdayMealObject.length != 0 &&
        finalSatursdayObject.categories.length == 0 &&
        count != subDay
      ) {
        arr.push({
          date: days[5],
          categories: satursdayMealObject,
          targetProtien: protein,
          targetCalories: calorie,
        });
        console.log("satursday meal object added");
        count = count + 1;
      }
    }
    console.log(
      "Skip Dates",
      dates.map((date) => date.format())
    );
    console.log(
      "Before Skip Array",
      arr.map((item) => item)
    );
    var j = 0;
    if (dates.length != 0) {
      for (let i = 0; i < arr.length; i++) {
        if (dates[j] !== undefined) {
          var skipdate = dates[j].format();
          console.log("Skip date", skipdate);
          if (skipdate === arr[i].date) {
            console.log("yes its equal", i);
            arr.splice(i, 1);
            i--;
            j = j + 1;
          }
          console.log(j);
        } else {
          break;
        }
      }
    }

    console.log(
      "After Skip",
      arr.map((item) => item)
    );

    const addSubs = {
      requestedClientId: requestedNewClientId,
      subscriptions: arr,
    };
    console.log(addSubs);
    const header = { "Content-Type": "application/json" };
    await axios
      .post(
        "http://localhost:8001/api/subscriptions/addbulksubscriptions",
        addSubs
      )
      .then((res) => {
        toastmessage("New Subscription is Created!", "success");
      })
      .catch((err) => {
        toastmessage(err.response.data.error, "error");
      });
    window.location.reload();
  };
  return (
    <div className="backgroundColor">
      <Row>
        <Col className="column">
          <Row>
            <h6>Enter Client ID</h6>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Client Id"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={clientId}
                onClick={(e) => {
                  setShow(true);
                }}
              />
              
            </InputGroup>
             <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
          <Modal.Header closeButton>
          <Modal.Title>Add Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Row>
              <Col>
              <div className="search-bar">
          <input
            type="text"
            placeholder="Search for a client..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
                <Table striped bordered hover className=" table table-striped">
                  <thead>
                    <tr>
                      <th>Checkbox</th>
                      <th>Client Name</th>
                    </tr>
                  </thead>

                  {filteredClientList.map(({ clientId, clientName }) =>{
                    return (
                      <tbody>
                        <tr>
                          <td>
                            <Checkbox
                              key={id}
                              type="checkbox"
                              name={clientName}
                              id={clientId}
                              handleClick={handleClick}
                            />
                          </td>
                          <td>{clientName}</td>
                        </tr>
                      </tbody>
                    );
                  })}
                </Table>
              </Col>
            </Row>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=> setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
          </Row>
          <Row>
            <h6>Enter Start Date</h6>

            <input
              type="date"
              onChange={(e) => setStartDate(e.target.value)}
              style={{ width: "92%", marginLeft: "12px", height: "32px" }}
            />
          </Row>
          <Row className="datePicker" style={{ paddingTop: "10px" }}>
            <h6>Enter Skip Dates</h6>

            <DatePicker
              value={dates}
              onChange={setDates}
              multiple
              sort
              format={format}
              calendarPosition="bottom-center"
              plugins={[<DatePanel />]}
            />
          </Row>
          <Row style={{ paddingTop: "20px" }}>
            <h6>Enter Target Protein</h6>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Target Protein"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={protein}
                onChange={(e) => {
                  setProtein(e.target.value);
                }}
              />
            </InputGroup>
          </Row>
          <Row>
            <h6>Enter Target Calories</h6>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Target Calories"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={calorie}
                onChange={(e) => {
                  setCalorie(e.target.value);
                }}
              />
            </InputGroup>
          </Row>

          <Row>
            <h6>Number of Subscription Days</h6>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Number of Subscription Days"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={subDay}
                onChange={(e) => {
                  setSubDay(e.target.value);
                }}
              />
            </InputGroup>
          </Row>

          <Row style={{ paddingBottom: "20px", marginLeft: "3px" }}>
            Last Subscriptions date:
          </Row>
          <Row>
            <Col>
              <Table>
                {list.map(({ id, name }) => {
                  return (
                    <tbody>
                      <tr>
                        <td>{name}</td>
                        {total.map((item) => {
                          if (item.mealName == name) {
                            return (
                              <tr>
                                <td>{item.inputValue}</td>
                              </tr>
                            );
                          }
                        })}
                      </tr>
                    </tbody>
                  );
                })}
              </Table>
            </Col>
          </Row>

          <Col>
            <Button
              onClick={() => {
                getValues1();
              }}
              variant="success"
            >
              Calculate
            </Button>
          </Col>
        </Col>
        {/* <Col className='column-2'>
        
        </Col> */}
        <Col className="column-3">
          <Row className="meals">
            <Col>Sunday Meals</Col>
            <Col md="4">
              <div onClick={() => setMenuButton("Sunday")}>
                <SiAddthis onClick={HandleAddMeal} color="red" />
              </div>
            </Col>
            <Row>
              {sundayMeal.map((data, index) => {
                return (
                  <div key={data.id}>
                    <input
                      style={{ width: "50px" }}
                      key={index}
                      value={data.inputValue}
                      type="number"
                      onChange={handleSundayState(data.id)}
                    ></input>
                    <span style={{ paddingLeft: "20px", paddingRight: "30px" }}>
                      {data.mealName}
                    </span>
                    <AiOutlineClose
                      color="red"
                      onClick={() => removeSundayMenu(index)}
                    />
                  </div>
                );
              })}
            </Row>
          </Row>
          <Row className="meals">
            <Col>Monday Meals</Col>
            <Col md="4">
              <div onClick={() => setMenuButton("Monday")}>
                <SiAddthis onClick={HandleAddMeal} color="red" />
              </div>
            </Col>
            <Row>
              {mondayMeal.map((data, index) => {
                return (
                  <div key={data.id}>
                    <input
                      style={{ width: "50px" }}
                      key={index}
                      value={data.inputValue}
                      onChange={handleMondayState(data.id)}
                      type="number"
                    ></input>
                    <span style={{ paddingLeft: "20px", paddingRight: "30px" }}>
                      {data.mealName}
                    </span>
                    <AiOutlineClose
                      color="red"
                      onClick={() => removeMondayMenu(index)}
                    />
                  </div>
                );
              })}
            </Row>
          </Row>
          <Row>
            <Col>Tuesday Meals</Col>
            <Col md="4">
              <div onClick={() => setMenuButton("Tuesday")}>
                <SiAddthis onClick={HandleAddMeal} color="red" />
              </div>
            </Col>
            <Row>
              {tuesdayMeal.map((data, index) => {
                return (
                  <div key={data.id}>
                    <input
                      style={{ width: "50px" }}
                      key={index}
                      value={data.inputValue}
                      type="number"
                      onChange={handleTuesdayState(data.id)}
                    ></input>
                    <span style={{ paddingLeft: "20px", paddingRight: "30px" }}>
                      {data.mealName}
                    </span>
                    <AiOutlineClose
                      color="red"
                      onClick={() => removeTuesdayMenu(index)}
                    />
                  </div>
                );
              })}
            </Row>
          </Row>
        </Col>
        <Col className="column-4">
          <Row className="meals">
            <Col>Wednesday Meals</Col>
            <Col md="4">
              <div onClick={() => setMenuButton("Wednesday")}>
                <SiAddthis onClick={HandleAddMeal} color="red" />
              </div>
            </Col>
            <Row>
              {wednesdayMeal.map((data, index) => {
                return (
                  <div key={data.id}>
                    <input
                      style={{ width: "50px" }}
                      key={index}
                      value={data.inputValue}
                      type="number"
                      onChange={handleWednesdayState(data.id)}
                    ></input>
                    <span style={{ paddingLeft: "20px", paddingRight: "30px" }}>
                      {data.mealName}
                    </span>
                    <AiOutlineClose
                      color="red"
                      onClick={() => removeWednesdayMenu(index)}
                    />
                  </div>
                );
              })}
            </Row>
          </Row>
          <Row className="meals">
            <Col>Thursday Meals</Col>
            <Col md="4">
              <div onClick={() => setMenuButton("Thursday")}>
                <SiAddthis onClick={HandleAddMeal} color="red" />
              </div>
            </Col>
            <Row>
              {thursdayMeal.map((data, index) => {
                return (
                  <div key={data.id}>
                    <input
                      style={{ width: "50px" }}
                      key={index}
                      value={data.inputValue}
                      type="number"
                      onChange={handleThursdayState(data.id)}
                    ></input>
                    <span style={{ paddingLeft: "20px", paddingRight: "30px" }}>
                      {data.mealName}
                    </span>
                    <AiOutlineClose
                      color="red"
                      onClick={() => removeThursdayMenu(index)}
                    />
                  </div>
                );
              })}
            </Row>
          </Row>
          <Row className="meals">
            <Col>Friday Meals</Col>
            <Col md="4">
              <div onClick={() => setMenuButton("Friday")}>
                <SiAddthis onClick={HandleAddMeal} color="red" />
              </div>
            </Col>
            <Row>
              {fridayMeal.map((data, index) => {
                return (
                  <div key={data.id}>
                    <input
                      style={{ width: "50px" }}
                      key={index}
                      value={data.inputValue}
                      type="number"
                      onChange={handleFridayState(data.id)}
                    ></input>
                    <span style={{ paddingLeft: "20px", paddingRight: "30px" }}>
                      {data.mealName}
                    </span>
                    <AiOutlineClose
                      color="red"
                      onClick={() => removeFridayMenu(index)}
                    />
                  </div>
                );
              })}
            </Row>
          </Row>
          <Row md="3" className="submitButton">
            <Button
              onClick={() => {
                AddSubscriptions();
              }}
            >
              Submit
            </Button>
          </Row>
        </Col>
        <Col className="column-5">
          <Row className="meals">
            <Col>Satursday Meals</Col>
            <Col md="4">
              <div onClick={() => setMenuButton("Satursday")}>
                <SiAddthis onClick={HandleAddMeal} color="red" />
              </div>
            </Col>
            <Row>
              {satursdayMeal.map((data, index) => {
                return (
                  <div key={data.id}>
                    <input
                      style={{ width: "50px" }}
                      key={index}
                      value={data.inputValue}
                      type="number"
                      onChange={handleSatursdayState(data.id)}
                    ></input>
                    <span style={{ paddingLeft: "20px", paddingRight: "30px" }}>
                      {data.mealName}
                    </span>
                    <AiOutlineClose
                      color="red"
                      onClick={() => removeSatursdayMenu(index)}
                    />
                  </div>
                );
              })}
            </Row>
          </Row>
        </Col>
      </Row>
      <SubTypeModal
        carbs={addCarbMeal}
        setNewCarbMeal={HandleCarbMeal}
        closeModal={() => {
          setAddCarbMeal(false);
        }}
        addedMeal={addedMeal}
        setAddedMeal={setAddedMeal}
        menuButton={menuButton}
        setMondayMeal={setMondayMeal}
        setTuesdayMeal={setTuesdayMeal}
        setWednesdayMeal={setWednesdayMeal}
        setThursdayMeal={setThursdayMeal}
        setFridayMeal={setFridayMeal}
        setSatursdayMeal={setSatursdayMeal}
        setSundayMeal={setSundayMeal}
      />
    </div>
  );
};

export default AddSubscription;
