import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "./CookingRoundTable.css";
import axios from "axios";
export default function CookingRoundTable({
  TableData,
  portion,
  setPortion,
  TableMaplist,
  apiData,
}) {
  const [tableData, setTableData] = useState(TableData.tableBody);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [updatedApiData, setUpdatedApiData] = useState();

  const handleEdit = (row, value) => {
    setIsEditing(true);
    setEditingRow(row);
  };
  useEffect(() => {
    const uniqueDates = [
      ...new Set(TableData.tableBody.map((item) => item.Date)),
    ];

    console.log("Datesn Page Load", uniqueDates);
    console.log("Api Data", apiData);
    const output = TableData.tableBody.reduce((all, next) => {
      const s = new Date(next.Date);
      const key = `${s.getFullYear()}-${s.getUTCMonth() + 1}-${s.getUTCDate()}`;
      const exist = all.find((v) => v.Date === key);
      if (exist) {
        exist.mealCalories += Number(next.MealCalories);
      } else {
        all.push({
          mealCalories: Number(next.MealCalories),
          Date: key,
        });
      }

      return all;
    }, []);

    let res = TableData.tableBody.map((a) => {
      const exists = output.find((b) => a.Date == b.Date);

      if (exists) {
        a.CurrentTotalCalories = exists.mealCalories;
      }

      return a;
    });
    setTableData(res);
    console.log("New Record", res);
    console.log("Dates with Calories", output);
  }, []);

  // const sumValuesByDate = (TableData, date) => {
  //   return TableData.reduce((sum, obj) => {
  //     if (obj.date === date) {
  //       return sum + obj.MealCalories;
  //     }
  //     return sum;
  //   }, 0);
  // };
  console.log(TableData);
  const uniqueDates = [
    ...new Set(TableData.tableBody.map((item) => item.Date)),
  ];
  console.log("Dates", uniqueDates);
  const handleSave = (tableBody, Portion, date) => {
    // const sum = sumValuesByDate(tableData.tableBody, date);
    const updatedTableData = tableData.map((row) =>
      row.ClientID === tableBody.ClientID
        ? {
            ...tableBody,
            Portion,
            MealProteins:
              (Portion / row.MinPortion) *
              (row.minservingfat * 9 +
                (row.minservingprotein + row.minservingCarbs)),
            MealCalories:
              (Portion / row.MinPortion) *
              (row.minservingfat * 9 +
                (row.minservingprotein + row.minservingCarbs)),
            CurrentTotalProteins:
              (Portion / row.MinPortion) * row.minservingprotein,
          }
        : row
    );
    setTableData(updatedTableData);
    setIsEditing(false);
    setEditingRow(null);
    console.log(updatedTableData, "updated");
    console.log("MealId", tableBody.mealId);
    console.log("Date", date);
    const sum = updatedTableData.reduce((sum, obj) => {
      if (obj.Date === date) {
        console.log(obj.MealCalories);
        return sum + parseInt(obj.MealCalories);
      }
      return sum;
    }, 0);
    console.log("sum", sum);
    updatedTableData.map((index, key) => {
      if (index.Date === date) {
        index.CurrentTotalCalories = sum;
      }
    });
    setTableData(updatedTableData);
    apiData.mealSettings.map((index, key) => {
      const clients = [];
      updatedTableData.map((index1, key) => {
        if (index.mealId == tableBody.mealId) {
          console.log("Current  Category", index.categoryName);
          // clients.push(parseInt(index1.ClientID));
          const exists = index.clients.map((value, key) => {
            if (value.clientId == tableBody.ClientID) {
              console.log("Client ID", tableBody.ClientID);
              console.log("MIN PORTION", tableBody.MinPortion);
              value.uncookedPlannedPortion = tableBody.MinPortion;
            }
          });
          console.log(index.clients);
          console.log(exists);

          // if (exists) {
          //   console.log(index.CategoryName, exists);
          // }
        }
        console.log(clients);
      });
    });
    console.log("API DATA", apiData);
    setUpdatedApiData(apiData);
    // const updatedTableData1 = tableData.map((row) =>
    //   row.Date === date
    //     ? {
    //         ...tableBody,
    //         CurrentTotalCalories: sum,
    //       }
    //     : row
    // );
    // setTableData(updatedTableData1);
    // console.log(updatedTableData1);
    const header = { "Content-Type": "application/json" };
    const demoUrl = `http://localhost:8001/api/rounds/editRound/${apiData._id}`;
    console.log(demoUrl);
    axios
      .patch(
        `http://localhost:8001/api/rounds/editRound/${apiData._id}`,
        updatedApiData,
        header
      )
      .then((res) => {
        // toastmessage("New Round is Created!", "success");
        console.log("success");
      })
      .catch((err) => {
        // toastmessage(err.response.dat;a.error, "error");
        console.log("err");
      });
  };
  console.log("Updated Api Data", updatedApiData);
  console.log(editingRow, "editrow");
  const submitData = async () => {
    const header = { "Content-Type": "application/json" };
    await axios
      .post(
        `http://localhost:8001/api/rounds/editRound/${updatedApiData._id}`,
        updatedApiData,
        header
      )
      .then((res) => {
        // toastmessage("New Round is Created!", "success");
        console.log("success");
      })
      .catch((err) => {
        // toastmessage(err.response.dat;a.error, "error");
        console.log("err");
      });
  };
  return (
    <Table
      striped
      bordered
      hover
      className="well"
      style={{ backgroundColor: "white" }}
    >
      <thead>
        <tr>
          {TableData.tableHead.map((tableheading) => {
            return <th>{tableheading}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {tableData.map((tablebody) =>
          isEditing &&
          editingRow &&
          editingRow.ClientID === tablebody.ClientID ? (
            <tr>
              <td>{tablebody.ClientID}</td>
              <td>{tablebody.Date}</td>
              <td>{tablebody.MealCategory}</td>
              <td>{tablebody.MealName}</td>
              <td>{tablebody.MinPortion}</td>
              <td>{tablebody.MaxPortion}</td>
              <td>
                {!isEditing ? (
                  tablebody.Portion
                ) : (
                  <input
                    type={"number"}
                    value={editingRow.Portion}
                    onChange={(e) =>
                      setEditingRow({ ...editingRow, Portion: e.target.value })
                    }
                  />
                )}
              </td>
              <td>{Math.round(tablebody.MealProteins, 2)}</td>
              <td>{tablebody.MealCalories}</td>
              <td>{tablebody.CurrentTotalCalories}</td>
              <td>{tablebody.CurrentTotalProteins}</td>
              <td>{tablebody.TargetCalories}</td>
              <td>{tablebody.TargetProteins}</td>
              <td>{tablebody.TargetFat}</td>
              <td>{tablebody.CurrentTotalFat}</td>
              <td>{tablebody.CurrentTotalCarb}</td>
              <td>
                <button
                  onClick={() =>
                    handleSave(tablebody, editingRow.Portion, tablebody.Date)
                  }
                >
                  Save Portion
                </button>
              </td>
            </tr>
          ) : (
            <tr>
              <td>{tablebody.ClientID}</td>
              <td>{tablebody.Date}</td>
              <td>{tablebody.MealCategory}</td>
              <td>{tablebody.MealName}</td>
              <td>{tablebody.MinPortion}</td>
              <td>{tablebody.MaxPortion}</td>
              <td>{tablebody.Portion}</td>
              <td>{tablebody.MealProteins}</td>
              <td>{tablebody.MealCalories}</td>
              <td>{tablebody.CurrentTotalCalories}</td>
              <td>{tablebody.CurrentTotalProteins}</td>
              <td>{tablebody.TargetCalories}</td>
              <td>{tablebody.TargetProteins}</td>
              <td>{tablebody.TargetFat}</td>
              <td>{tablebody.CurrentTotalFat}</td>
              <td>{tablebody.CurrentTotalCarb}</td>
              <td>
                <button onClick={() => handleEdit(tablebody)}>
                  Edit Portion
                </button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </Table>
  );
}
