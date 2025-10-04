import { Route, Routes } from "react-router-dom";
import Maps from "../components/Maps.jsx";
export default function AppRoutes() {
    return (
        <Routes>
            {/* <Route path="/" element={<Home/>}/> */}
            <Route path="/maps" element={<Maps />} />
        </Routes>
    );
};