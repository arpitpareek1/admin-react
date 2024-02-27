import axios from "axios";
import Navbar from "components/navbar";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { backend_url, toastCss } from "variables/helper"

const SettingsEdit = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const settingsData = location.state;

    const [selectedWeekdays, setSelectedWeekdays] = useState<number[]>([]);
    const [setting, setSetting] = useState<{ _id: string; key: string; value: string } | null>(null);
    const [updatedValue, setUpdatedValue] = useState('');
    interface WeekdayOption {
        id: number;
        name: string;
    }
    useEffect(() => {
        setSetting(settingsData)
        setUpdatedValue(settingsData.value)
    }, [settingsData])

    const weekdays: WeekdayOption[] = [
        { id: 1, name: 'Monday' },
        { id: 2, name: 'Tuesday' },
        { id: 3, name: 'Wednesday' },
        { id: 4, name: 'Thursday' },
        { id: 5, name: 'Friday' },
        { id: 6, name: 'Saturday' },
        { id: 7, name: 'Sunday' },
    ];

    const toggleWeekday = (weekdayId: number) => {
        if (selectedWeekdays.includes(weekdayId)) {
            setSelectedWeekdays(selectedWeekdays.filter(id => id !== weekdayId));
        } else {
            setSelectedWeekdays([...selectedWeekdays, weekdayId]);
        }
    };

    const handleUpdate = () => {

        const toUpdate = setting.key === 'withdraw_days' ? JSON.stringify(selectedWeekdays) : updatedValue
        console.log("toUpdate", toUpdate);

        if (toUpdate) {
            axios
                .put(backend_url + `settings/update`, { key: settingsData.key, value: toUpdate })
                .then(() => {
                    toast.info("Setting Updated", toastCss)
                    navigate('/admin');
                })
                .catch((error) => {
                    console.error('Error updating setting:', error);
                });
        }
    };
    console.log("setting", setting);


    return (
        <div className=" mx-auto flex h-screen bg-lightPrimary dark:bg-navy-900 overflow-auto">
            {setting && (
                <div className="w-full h-full">
                    <Navbar
                        brandText={"Edit Settings"}
                    />
                    <div className="bg-white dark:bg-navy-900 shadow overflow-hidden sm:rounded-md ">
                        <div className="p-4">
                            <p className="text-lg font-semibold dark:text-white">{setting.key}</p>
                            {setting.key !== "withdraw_days" ?
                                <input
                                    type="text"
                                    value={updatedValue}
                                    onChange={(e) => setUpdatedValue(e.target.value)}
                                    className="mt-2 p-2 w-full border rounded-md"
                                /> :
                                <div className="space-y-2">
                                    {weekdays.map(weekday => (
                                        <label key={weekday.id} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedWeekdays.includes(weekday.id)}
                                                onChange={() => toggleWeekday(weekday.id)}
                                                className="form-checkbox text-indigo-600 h-5 w-5 "
                                            />
                                            <span className="text-gray-800 dark:text-white">{weekday.name}</span>
                                        </label>
                                    ))}
                                </div>}
                            <button
                                onClick={handleUpdate}
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Update Setting
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SettingsEdit