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
import TransactionTable from "./components/TransitionsTable";
import Navbar from "components/navbar";
import ProductsTable from "./components/productsTable";
import "./../../../assets/css/App.css"
import NewsTable from "./components/NewsTable";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const [data, setData] = useState<null | AllData>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("user")
    if (token !== null) {
      axios.get(backend_url + "user/getAllData").then(({ data }) => {
        console.log(data);
        if (data && data.data && data.status) {
          console.log(data.data);
          setData(data.data)
        } else {
          alert("Something went wrong !")
        }
      })
    } else {
      navigate("/login");
    }
  }, [])

  const getTotalUPI = () => {
    let upi = 0
    if (data && data.transactionsInfo && data.transactionsInfo.length) {
      data.transactionsInfo.forEach((tra) => {
        if (((tra.product_name === "GETTING_SPINNER_CHANCES" && tra.payment_method === "upi") || tra.product_name === "ADDED_TO_WALLET")) {
          upi += Number(tra.amount)
        }
      })
    }
    return upi
  }

  const getDailyUPI = () => {
    let upi = 0
    if (data && data.transactionsInfo && data.transactionsInfo.length) {
      data.transactionsInfo.forEach((tra) => {
        if (((tra.product_name === "GETTING_SPINNER_CHANCES" && tra.payment_method === "upi") || tra.product_name === "ADDED_TO_WALLET") && new Date(tra.createdAt).getDate() === new Date().getDate()) {
          upi += Number(tra.amount)
        }
      })
    }
    return upi
  }

  return (
    <div className="flex h-full w-full">
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900 ">
        <div>
          <Navbar
            brandText={"My DashBoard"}
          />
          {data ?
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
                  title={"Total UPI Transactions Amount"}
                  subtitle={getTotalUPI() + ""}
                />
                <Widget
                  icon={<MdDashboard className="h-6 w-6" />}
                  title={"Daily UPI Transactions Amount"}
                  subtitle={getDailyUPI() + ""}
                />
              </div>
              <div className="grid h-full grid-cols-1 gap-5 lg:!grid-cols-12 ml-5 mr-5 mb-10">
                <div className="col-span-12 mt-4 lg:col-span-12 lg:mb-0 3xl:col-span-6" style={{ height: 'max-content' }}>
                  <CheckTable tableData={data.userInfo} len={4} /><br />
                  <TransactionTable tableData={data.transactionsInfo} userData={data.userInfo} len={4} /><br />
                  <ComplexTable tableData={data.withdrawalInfo} userData={data.userInfo} len={4} />
                  <TaskCard settings={data.settings} />
                </div>
                <div className="col-span-12 mt-4 lg:col-span-12 lg:mb-0 3xl:col-span-6" style={{ height: 'max-content' }}>
                  <ProductsTable tableData={data.products} len={4} /><br />
                  <NewsTable tableData={data.news} len={4} /><br />
                </div>
              </div>
            </>
            :
            <div className="flex justify-center items-center mt-[200px] h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 "></div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
