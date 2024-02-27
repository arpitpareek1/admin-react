import { MdCheckCircle } from "react-icons/md";
import Card from "components/card";
import { Settings } from "types/interfaces";
import { useNavigate } from "react-router-dom";

const TaskCard = ({ settings }: { settings: Settings[] }) => {
  console.log(settings);
  const navigate = useNavigate()
  const weekdays = [
    { id: 1, name: 'Monday' },
    { id: 2, name: 'Tuesday' },
    { id: 3, name: 'Wednesday' },
    { id: 4, name: 'Thursday' },
    { id: 5, name: 'Friday' },
    { id: 6, name: 'Saturday' },
    { id: 7, name: 'Sunday' },
];

  return (
    <Card extra="pb-7 p-[20px] mt-6">
      <div className="relative flex flex-row justify-between">
        <div className="flex items-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-100 dark:bg-white/5">
            <MdCheckCircle className="h-6 w-6 text-brand-500 dark:text-white" />
          </div>
          <h4 className="ml-4 text-xl font-bold text-navy-700 dark:text-white">
            Settings
          </h4>
        </div>
      </div>
      <div className="h-full w-full">
        {settings && settings.length ? settings.map((setting, index) => (
          <div className="flex items-center justify-between p-4 border-b" key={index}>
            <div>
              <p className="text-lg font-semibold">{setting.key}</p>
              {
               setting.key !=="withdraw_days" ?  <p className="text-gray-500">{setting.value}</p> : <p className="text-gray-500">{(JSON.parse(setting.value) as number[]).map((v)=>weekdays[v].name).join(", ")}</p>

              }
            </div>
            <h4 className="font-bold mt-2 text-navy-700 dark:text-white" onClick={() => {
              navigate("/SettingsEdit", {
                state: setting
              })
            }}>Edit</h4>
          </div>
        )) : null}
      </div>
    </Card>
  );
};

export default TaskCard;
