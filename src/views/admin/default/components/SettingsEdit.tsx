import axios from "axios";
import Navbar from "components/navbar";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { backend_url, toastCss } from "variables/helper";

const SettingsEdit = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const settingsData = location.state;

    const [setting, setSetting] = useState<{ _id: string; key: string; value: string } | null>(null);
    const [updatedValue, setUpdatedValue] = useState('');

    useEffect(() => {
        setSetting(settingsData)
        setUpdatedValue(settingsData.value)
    }, [settingsData])

    const handleUpdate = () => {
        if (updatedValue) {
            axios
                .put(backend_url + `settings/update`, { key: settingsData.key, value: updatedValue })
                .then(() => {
                    toast.info("Setting Updated", toastCss)
                    navigate('/admin');
                })
                .catch((error) => {
                    console.error('Error updating setting:', error);
                });
        }
    };

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
                            <input
                                type="text"
                                value={updatedValue}
                                onChange={(e) => setUpdatedValue(e.target.value)}
                                className="mt-2 p-2 w-full border rounded-md"
                            />
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