import Card from "components/card";
import { UserInfo, userAllData } from "types/interfaces";
const General = ({ userInfo }: { userInfo: UserInfo }) => {
  return (
    <Card extra={"w-full h-full p-3"}>
      <div className="mt-2 mb-8 w-full">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
          General Information
        </h4>
      </div>
      <div className="grid grid-cols-2 gap-4 px-2">
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Phone</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {userInfo.phone}
          </p>
        </div>
        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Email</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {userInfo.email}
          </p>
        </div>
        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Total Points</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {userInfo.money}
          </p>
        </div>
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Is Referred by Someone</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {userInfo.isRefered ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default General;
