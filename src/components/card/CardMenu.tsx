import React from "react";
import Dropdown from "components/dropdown";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";

function CardMenu(props: { onCallBack?: (status: string) => void, transparent?: boolean }) {
  const { onCallBack, transparent } = props;

  const [open, setOpen] = React.useState(false);

  return (
    <Dropdown
      button={
        <button
          onClick={(ev) => {

            setOpen(!open)
          }}
          id="dropDownButton"
          className={`flex items-center text-xl hover:cursor-pointer ${transparent
            ? "bg-none text-white hover:bg-none active:bg-none"
            : "bg-lightPrimary p-2 text-brand-500 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10"
            } linear justify-center rounded-lg font-bold transition duration-200`}
        >
          <BsThreeDotsVertical className="h-6 w-6" />
        </button>
      }
      animation={"origin-top-left transition-all duration-300 ease-in-out"}
      classNames={`${transparent ? "top-8" : "top-11"} right-0 w-max`}
      children={
        (<>
          <div className="z-50 w-max rounded-xl bg-white py-3 px-4 text-sm shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="hover:text-black flex cursor-pointer items-center gap-2 text-gray-600 hover:font-medium" onClick={() => {
              onCallBack("completed")
              setOpen(!open);
            }}>
              <span>
                <MdCheckCircle className="text-green-500 me-1 dark:text-green-300" />
              </span>
              Complete
            </p>
            <p className="hover:text-black mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium" onClick={() => { setOpen(!open); onCallBack("pending") }}>
              <span>
                <MdCancel className="text-red-500 me-1 dark:text-red-300" />
              </span>
              Pending
            </p>
            <p className="hover:text-black mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium" onClick={() => { setOpen(!open); onCallBack("cancelled") }}>
              <span>
                <MdOutlineError className="text-amber-500 me-1 dark:text-amber-300" />
              </span>
              Cancelled
            </p>
          </div>
        </>)

      }
    />
  );
}

export default CardMenu;
