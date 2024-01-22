import React from "react";
import image3 from "assets/img/profile/image3.png";
import Card from "components/card";
import { Products, TransactionsInfo } from "types/interfaces";

const Project = ({ products, transactions }: { products: Products[], transactions: TransactionsInfo[] }) => {

  const getImageUrl = (name: string) => {
    const product = products.filter((product) => name === product.title)
    if (product && product.length) {
      return product[0].imageSource
    } else {
      return image3
    }
  }
  return (
    <Card extra={"w-full p-4 h-full"}>
      <div className="mb-8 w-full">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          All Transactions
        </h4>
        <p className="mt-2 text-base text-gray-600">
          the List of all the products user has buy.
        </p>
      </div>
      {
        transactions && products && transactions.map((transaction, index) => (
          <div key={index} className={`flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none  ${index !== 0 ? " mt-4" : ""}`}>
            <div className="flex items-center">
              <div className="">
                <img className="h-[83px] w-[83px] rounded-lg" src={getImageUrl(transaction.product_name)} alt="" />
              </div>
              <div className="ml-4">
                <p className="text-base font-medium text-navy-700 dark:text-white">
                  {transaction.product_name}
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  Amount {" "}{transaction.amount}
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  Transaction Id {" "}{transaction.transaction_id}
                </p>
              </div>
            </div>
          </div>
        ))
      }
    </Card>
  );
};

export default Project;
