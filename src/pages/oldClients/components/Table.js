import React from "react";
import "./Table.css";
const ReUseAbleTable = ({ Headings,GetTableList,DeleteData,ViewData,EditData,AddIngredients }) => {
  console.log( "TableHead",GetTableList);
  return (
    <div class="container well">
      <div class="row">
        <div class="col-md-12">
          <div class="table-responsive">
            <table id="mytable" class="table table-bordred table-striped">
              <thead>
                <th>
                &nbsp; &nbsp;
                  {/* <input type="checkbox" id="checkall" /> */}
                </th>
                {Headings.map((tablehead) => {
                    return (
                      <th>
                        &nbsp;&nbsp;&nbsp;
                        {tablehead}
                      </th>
                    );
                  })}
              </thead>
              <tbody>
              {GetTableList.map((tabledata) => {
                    return (
                     <tr>
                     <td>
                       {/* <input type="checkbox" class="checkthis" /> */}
                     </td>
                     <td>{tabledata.targetProtien}</td>
                     <td>{tabledata.date}</td>
                     <td>{tabledata.categories.map(item => {
                              return <li>{item.categoryName}</li>;
                          })}</td>
                    {console.log(tabledata.categories.map(m => m))}
                     <td>
                       <p
                         data-placement="top"
                         data-toggle="tooltip"
                         title="Delete"
                       >
                         <button
                           class="btn btn-danger btn-xs"
                           data-title="Delete"
                           data-toggle="modal"
                           data-target="#delete"
                           onClick={()=>{DeleteData(tabledata._id)}}
                         >
                           <span class="glyphicon glyphicon-trash"
                           >Delete</span>
                         </button>
                       </p>
                     </td>
                   </tr>
                    );
                  })}
                {/* <tr>
                  <td>
                    <input type="checkbox" class="checkthis" />
                  </td>
                  <td>Mohsin</td>
                  <td>Irshad</td>
                  <td>CB 106/107 Street # 11 Wah Cantt Islamabad Pakistan</td>
                  <td>isometric.mohsin@gmail.com</td>
                  <td>+923335586757</td>
                  <td>
                    <p data-placement="top" data-toggle="tooltip" title="Edit">
                      <button
                        class="btn btn-primary btn-xs"
                        data-title="Edit"
                        data-toggle="modal"
                        data-target="#edit"
                      >
                        <span class="glyphicon glyphicon-pencil"></span>
                      </button>
                    </p>
                  </td>
                  <td>
                    <p
                      data-placement="top"
                      data-toggle="tooltip"
                      title="Delete"
                    >
                      <button
                        class="btn btn-danger btn-xs"
                        data-title="Delete"
                        data-toggle="modal"
                        data-target="#delete"
                      >
                        <span class="glyphicon glyphicon-trash"></span>
                      </button>
                    </p>
                  </td>
                  <td>
                    <p data-placement="top" data-toggle="tooltip" title="View">
                      <button
                        class="btn btn-success btn-xs"
                        data-title="Delete"
                        data-toggle="modal"
                        data-target="#delete"
                      >
                        <span class="glyphicon glyphicon-trash"></span>
                      </button>
                    </p>
                  </td>
                </tr> */}
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReUseAbleTable;
