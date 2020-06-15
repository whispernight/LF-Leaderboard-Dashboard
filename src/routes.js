// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import ExercisesList from "views/ExerciseView/ExerciseList.js";
import FitnessCenter from "@material-ui/icons/FitnessCenter";
import ReportData from "views/AddData/ReportData";

// core components/views for RTL layout

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/exercises",
    name: "Exercises",
    icon: FitnessCenter,
    component: ExercisesList,
    layout: "/admin"
  },
  {
    path: "/data",
    name: "Add Data",
    icon: FitnessCenter,
    component: ReportData,
    layout: "/admin"
  }
];

export default dashboardRoutes;
