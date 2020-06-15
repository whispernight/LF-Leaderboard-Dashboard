import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import firebase from 'components/Firebase/firebase';
import Exercises from "components/Exercises/Exercises";


const useStyles = makeStyles({
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
});

export default function ExerciseList() {
  const classes = useStyles();
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseDescription, setExerciseDescription] = useState('');
  const [exerciseURL, setExerciseURL] = useState('');
  const [exercises, setExercises] = useState([]);
  const [errorExcercise, setErrorExcercise] = useState(false); // set false as initial value


  const addExercise = (event, value) => {
    console.log("New Exercise: " + exerciseName + " " + exerciseURL + " " + exerciseDescription);
    if (Object.keys(exercises).map(x => {
      return exercises[x].exerciseName;
    }).includes(exerciseName)) {
      setErrorExcercise(true);
      return
    }
    setErrorExcercise(false);
    firebase.database().ref('exercises').push({ exerciseName: exerciseName, exerciseURL: exerciseURL, exerciseDescription: exerciseDescription });
    setExerciseName('');
    setExerciseURL('');
    setExerciseDescription('');
  }

  useEffect(() => {
    function getExercises() {
      firebase.database().ref('exercises').on('value', (snapshot) => {
        let res = [];
        let items = snapshot.val();
        Object.keys(items).map(key => {
          res.push({ key: key, value: items[key].exerciseName });
        });
        res.sort((a, b) => (a.value > b.value) ? 1 : -1);

        console.log(res);

        setExercises(res);
      });
    }

    // Update the document title using the browser API
    getExercises();
  }, []);


  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Create Exercise</h4>
              <p className={classes.cardCategoryWhite}>Complete the exercise description</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput color="secondary"
                    error={errorExcercise}
                    labelText="Exercise Name"
                    id="exercise-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: exerciseName,
                      onInput: e => setExerciseName(e.target.value)
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Exercise URL"
                    id="url"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: exerciseURL,
                      onInput: e => setExerciseURL(e.target.value)
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Description of the exercise."
                    id="description"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 3,
                      value: exerciseDescription,
                      onInput: e => setExerciseDescription(e.target.value)
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="warning" onClick={addExercise}>Create</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Exercise list</h4>
              <p className={classes.cardCategoryWhite}>
                All existing exercises
            </p>
            </CardHeader>
            <CardBody>
              <Exercises
                exercises={exercises}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div >
  );
}


