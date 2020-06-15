import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import FitnessCenter from "@material-ui/icons/FitnessCenter";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import SpecificExerciseTable from "components/Exercises/SpecificExerciseTable";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            title="Main Exercises:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Bench Press",
                tabIcon: FitnessCenter,
                tabContent: (
                  <SpecificExerciseTable
                    exerciseId={'-M8q2kdM8T3zOiRnXqzx'}
                  />
                )
              },
              {
                tabName: "Squat",
                tabIcon: FitnessCenter,
                tabContent: (
                  <SpecificExerciseTable
                  exerciseId={'-M8q2zYVuT1KVJGRCgqI'}
                  />
                )
              },
              {
                tabName: "Deadlift",
                tabIcon: FitnessCenter,
                tabContent: (
                  <SpecificExerciseTable
                  exerciseId={'-M8q3APVUxGZVZOZyE4u'}
                  />
                )
              }
            ]}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}
