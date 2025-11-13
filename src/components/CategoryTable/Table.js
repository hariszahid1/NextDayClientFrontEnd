import React from "react";
import "./Table.css";
const ReUseAbleTable = ({
  TableData,
  GetTableList,
  DeleteData,
  ViewData,
  EditData,
  AddIngredients,
  onChangeValue,
  TableMaplist,
}) => {
  console.log(TableData, "TableHead", GetTableList);
  return (
    <div class="container well">
      <div class="row">
        <div class="col-md-12">
          <div class="table-responsive">
            <table id="mytable" class="table table-bordred table-striped">
              <thead>
                {/* <th> */}
                {/* &nbsp; &nbsp; */}

                {/* <input type="checkbox" id="checkall" /> */}
                {/* </th> */}
                {TableData &&
                  TableData.tableHead.map((tablehead) => {
                    return (
                      <th>
                        &nbsp;&nbsp;&nbsp;
                        {tablehead}
                      </th>
                    );
                  })}
                {TableData &&
                  TableData.tableButtons.map((tablebutton) => {
                    return (
                      <th>
                        &nbsp;&nbsp; &nbsp; &nbsp;
                        {tablebutton}
                      </th>
                    );
                  })}
              </thead>
              <tbody>
                {TableData &&
                  GetTableList.map((tabledata) => {
                    return (
                      <tr>
                        {TableMaplist.map((keys) => {
                          return <td>&nbsp; &nbsp;{tabledata[keys]}</td>;
                        })}
                        {TableData &&
                          TableData.tableButtonsList.map((table) => {
                            return (
                              <td>
                                <button
                                  class={table.classes}
                                  onClick={() => {
                                    onChangeValue(tabledata._id,table.name);
                                  }}
                                >
                                  {table.name}
                                </button>
                              </td>
                            );
                          })}

                        {/* <td>
                            <button
                              class="btn btn-primary btn-xs"
                              onClick={() => {
                                EditData(tabledata._id);
                              }}
                            >
                                Edit
                            </button>
                        </td>
                        <td>
                            <button
                              class="btn btn-danger btn-xs"
                              data-title="Delete"
                              data-toggle="modal"
                              data-target="#delete"
                              onClick={() => {
                                DeleteData(tabledata._id);
                              }}
                            >
                                Delete
                            </button>
                        </td> */}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReUseAbleTable;
