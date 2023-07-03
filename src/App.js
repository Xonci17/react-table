import React, { useState } from "react";
import "./App.css";
import MaterialTable from "material-table";
import GetAppIcon from "@material-ui/icons/GetApp";
import AddIcon from "@material-ui/icons/Add";
import jsonData from "./response.json";
import Table from "./components/Table";
import EditModal from "./components/EditModal";
import DeleteModal from "./components/DeleteModal";
import AddModal from "./components/AddModal";

function App() {
  const [tableData, setTableData] = useState(
    jsonData.cars.map(({ id, ...rest }) => rest)
  );
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const columns = [
    { title: "Car", field: "car" },
    { title: "Model", field: "car_model" },
    { title: "Color", field: "car_color" },
    { title: "Year", field: "car_model_year" },
    { title: "VIN", field: "car_vin" },
    { title: "Price", field: "price" },
    { title: "Availability", field: "availability", type: "boolean" },
    {
      title: "Actions",
      field: "actions",
      export: false,
      render: (rowData) => (
        <div className="select-wrapper">
          <select
            id={`action-select-${rowData.tableData.id}`}
            value=""
            onChange={() => handleActionChange(rowData)}
          >
            <option value="" disabled>
              Select Action
            </option>
            <option value="edit">Edit</option>
            <option value="delete">Delete</option>
          </select>
        </div>
      ),
    },
  ];

  const handleActionChange = (rowData) => {
    const selectedAction = document.getElementById(
      `action-select-${rowData.tableData.id}`
    ).value;

    if (selectedAction === "edit") {
      setSelectedRowData(rowData);
      setShowEditModal(true);
    } else if (selectedAction === "delete") {
      setSelectedRowData(rowData);
      setShowDeleteModal(true);
    }
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setSelectedRowData(null);
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
    setSelectedRowData(null);
  };

  const handleEditModalSave = (updatedData) => {
    const updatedTableData = [...tableData];
    updatedTableData[selectedRowData.tableData.id] = updatedData;
    setTableData(updatedTableData);
    setShowEditModal(false);
    setSelectedRowData(null);
  };

  const handleDeleteModalConfirm = () => {
    const updatedTableData = [...tableData];
    updatedTableData.splice(selectedRowData.tableData.id, 1);
    setTableData(updatedTableData);
    setShowDeleteModal(false);
    setSelectedRowData(null);
  };

  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleAddModalSave = (newData) => {
    const updatedTableData = [...tableData];
    updatedTableData.unshift(newData);
    setTableData(updatedTableData);
    setShowAddModal(false);
  };

  return (
    <div className="App">
      <h1 align="center">Super Table 🦸‍♂️</h1>
      <h4 align="center">by Samir Harashov</h4>

      <Table
        columns={columns}
        data={tableData}
        handleOpenAddModal={handleOpenAddModal}
      />

      {selectedRowData && showEditModal && (
        <EditModal
          className="modal"
          rowData={selectedRowData}
          onClose={handleEditModalClose}
          onSave={handleEditModalSave}
        />
      )}

      {selectedRowData && showDeleteModal && (
        <DeleteModal
          className="modal"
          rowData={selectedRowData}
          onClose={handleDeleteModalClose}
          onConfirm={handleDeleteModalConfirm}
        />
      )}

      {showAddModal && (
        <AddModal onClose={handleCloseAddModal} onSave={handleAddModalSave} />
      )}
    </div>
  );
}

export default App;
