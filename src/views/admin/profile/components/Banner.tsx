import avatar from "assets/img/avatars/avatar4.png";
import banner from "assets/img/profile/banner.png";
import Card from "components/card";
import { UserInfo } from "types/interfaces";

const Banner = ({ userData, allTraLen, allWithdrawLen, rechargePoints }: { userData: UserInfo, allTraLen: number, allWithdrawLen: number, rechargePoints: number }) => {

  return (
    <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
      <div
        className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
          <img className="h-full w-full rounded-full" src={avatar} alt="" />
        </div>
      </div>
      <div className="mt-16 flex flex-col items-center">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          {userData.name}
        </h4>
      </div>
      <div className="mt-6 mb-3 flex gap-4 md:!gap-14">
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">{userData.money}</p>
          <p className="text-sm font-normal text-gray-600">Points</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            {allTraLen}
          </p>
          <p className="text-sm font-normal text-gray-600">All Transactions</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            {allWithdrawLen}
          </p>
          <p className="text-sm font-normal text-gray-600">All Withdraw Requests</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            {rechargePoints}
          </p>
          <p className="text-sm font-normal text-gray-600">Deposit points</p>
        </div>
      </div>
    </Card>
  );
};

export default Banner;
