import React from "react";
import MaterialTable from "material-table";

const Table = ({ columns, data, handleOpenAddModal }) => {
  return (
    <MaterialTable
      columns={columns}
      data={data}
      options={{
        sorting: true,
        search: true,
        searchFieldAlignment: "right",
        searchAutoFocus: true,
        searchFieldVariant: "standard",
        paging: true,
        pageSizeOptions: [2, 5, 10, 20, 25, 50, 100],
        pageSize: 5,
        paginationType: "stepped",
        showFirstLastPageButtons: false,
        paginationPosition: "both",
        exportButton: true,
        exportAllData: true,
        exportFileName: "TableData",
        addRowPosition: "first",
        actionsColumnIndex: -1,
        showSelectAllCheckbox: false,
        showTextRowsSelected: false,
        rowStyle: (data, index) =>
          index % 2 === 0 ? { background: "#f5f5f5" } : null,
        headerStyle: { background: "#819595", color: "#fff" },
      }}
      title="Cars Information"
      actions={[
        {
          icon: "add",
          tooltip: "Add Car",
          isFreeAction: true,
          onClick: handleOpenAddModal,
        },
      ]}
    />
  );
};

export default Table;
