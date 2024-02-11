import Navbar from "components/navbar";
import Banner from "./components/Banner";
import General from "./components/General";
import Project from "./components/Project";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { backend_url } from "variables/helper";
import { Products, UserInfo, userAllData } from "types/interfaces";
import ComplexTable from "../default/components/ComplexTable";

const ProfileOverview = () => {
  const [userAllData, setUserAllData] = useState<null | userAllData>(null)
  const [products, setProducts] = useState<null | Products[]>(null)
  const location = useLocation();
  const userData = location.state as UserInfo;

  useEffect(() => {
    axios.post(backend_url + "user/userData", {
      email: userData.email
    }).then(({ data }) => {
      console.log("data", data);
      if (data && data.data && data.status) {
        setUserAllData(data.data)
        if (data.data.transactionsInfo && data.data.transactionsInfo.length) {
          axios.get(backend_url + "user/getAllProduct").then(({ data }) => {
            console.log(data);
            setProducts(data)
          }).catch(console.log)
        }
      }
    }).catch(console.log)
  }, [])
  return (
    <div className="flex h-full w-full">
      {userAllData && <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        <div>
          <Navbar
            brandText={"User Info"}
          />
          <div className="flex w-full flex-col gap-5">
            <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
              <div className="col-span-12 lg:!mb-0 item-center">
                <Banner 
                  rechargePoints={userAllData.userInfo.rechargePoints}
                  userData={userAllData.userInfo}
                  allTraLen={userAllData.transactionsInfo.length}
                  allWithdrawLen={userAllData.withdrawalInfo.length}
                />
              </div>
            </div>
            <div className="grid h-full grid-cols-1 gap-5 lg:!grid-cols-12 mb-10">
              {userAllData.transactionsInfo && userAllData.transactionsInfo.length ?
                <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-4">
                  <Project products={products} transactions={userAllData.transactionsInfo} />
                </div> : null}
              {userAllData.withdrawalInfo && userAllData.withdrawalInfo.length ?
                <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-4">
                  <ComplexTable tableData={userAllData.withdrawalInfo} userData={[userAllData.userInfo]} len={userAllData.withdrawalInfo.length} />
                </div> : null}
              <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5 mb-10">
                <General userInfo={userAllData.userInfo} />
              </div>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
};

export default ProfileOverview;
