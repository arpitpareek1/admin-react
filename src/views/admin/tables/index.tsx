import tableDataColumns from "./variables/tableDataColumns";
import ColumnsTable from "./components/ColumnsTable";

const Tables = () => {
  return (
    <div>
      <div className="mt-5 grid h-full ">
        <ColumnsTable tableData={tableDataColumns} />
      </div>
    </div>
  );
};

export default Tables;
