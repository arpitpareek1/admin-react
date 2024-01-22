import { IoMdHome } from "react-icons/io";
import { MdBarChart, MdDashboard } from "react-icons/md";
import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import TaskCard from "views/admin/default/components/TaskCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { backend_url } from "variables/helper";
import { AllData } from "types/interfaces";
import TransactionTable from "./components/TranscotionsTable";
import Navbar from "components/navbar";
import ProductsTable from "./components/productsTable";
import "./../../../assets/css/App.css"
import NewsTable from "./components/NewsTable";


const Dashboard = () => {
  const [data, setData] = useState<null | AllData>(null)

  useEffect(() => {
    const token = localStorage.getItem("user")
    if (token !== null) {
      axios.get(backend_url + "user/getAllData").then(({ data }) => {
        console.log(data);
        if (data && data.data && data.status) {
          setData(data.data)
        }
      })
    }
  }, [])

  const totalEarning = () => {
    let earnings = 0
    if (data && data.transactionsInfo && data.transactionsInfo.length) {
      data.transactionsInfo.forEach((tra) => {
        earnings += tra.amount
      })
    }
    return earnings
  }

  return (
    <div className="flex h-full w-full">
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900 ">
        <div>
          <Navbar
            brandText={"My DashBoard"}
          />
          {data &&
            <>
              <div className="mt-6 grid grid-cols-1 ml-5 mr-5 mt-10 gap-5 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-4">
                <Widget
                  icon={<IoMdHome className="h-7 w-7" />}
                  title={"All User"}
                  subtitle={data.userInfo.length + ""}
                />
                <Widget
                  icon={<MdBarChart className="h-6 w-6" />}
                  title={"All withdrawal Requests"}
                  subtitle={data.withdrawalInfo.length + ""}
                />
                <Widget
                  icon={<MdDashboard className="h-6 w-6" />}
                  title={"All Transactions "}
                  subtitle={data.transactionsInfo.length + ""}
                />
                <Widget
                  icon={<MdDashboard className="h-6 w-6" />}
                  title={"Total Earning"}
                  subtitle={totalEarning() + ""}
                />
              </div>
              <div className="grid h-full grid-cols-1 gap-5 lg:!grid-cols-12 ml-5 mr-5 mb-10">
                <div className="col-span-12 mt-4 lg:col-span-12 lg:mb-0 3xl:col-span-6" style={{ height: 'max-content' }}>
                  <CheckTable tableData={data.userInfo} len={4} /><br />
                  <TransactionTable tableData={data.transactionsInfo} userData={data.userInfo} len={4} /><br />
                  <ComplexTable tableData={data.withdrawalInfo} userData={data.userInfo} len={4} />
                </div>
                <div className="col-span-12 mt-4 lg:col-span-12 lg:mb-0 3xl:col-span-6" style={{ height: 'max-content' }}>
                  <ProductsTable tableData={data.products} len={4} /><br />
                  <NewsTable tableData={data.news} len={4} /><br />
                  <TaskCard settings={data.settings} />
                </div>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
