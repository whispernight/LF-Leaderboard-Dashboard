import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import firebase from 'components/Firebase/firebase';
import CustomSelect from 'components/CustomSelect/CustomSelect.js'
import CustomInputWeight from "components/CustomInputWeight/CustomInputWeight";
import InputAdornment from '@material-ui/core/InputAdornment'

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
    },
});


export default function ReportData() {
    const classes = useStyles();
    const [exercises, setExercises] = useState([{NoData: 'No Data'}]);
    const [errorForm1, setErrorForm1] = useState(false);
    const [errorForm2, setErrorForm2] = useState(false);
    const [errorForm3, setErrorForm3] = useState(false);

    const [exercisers, setExercisers] = useState([{NoData: 'No Data'}]);
    const [values, setValues] = React.useState({
        weight: '',
        exerciserSelected: {},
        exerciseSelected: {}
    });

    const addReportData = (event, value) => {
        console.log("New Record: " + values.exerciserSelected.key + " " + values.exerciseSelected.key + " " + values.weight);
        let error = false;
        if (!values.exerciserSelected) {
            setErrorForm1(true);
            error = true;
        }
        if (!values.exerciseSelected) {
            setErrorForm2(true);
            error = true;
        }
        if (!values.weight) {
            setErrorForm3(true);
            error = true;
        }
        if (error) {
            return;
        }
        setErrorForm1(false);
        setErrorForm2(false);
        setErrorForm3(false);
        let pushObj = {
        };
        pushObj[values.exerciserSelected.key] = Number.parseInt(values.weight);
        firebase.database().ref('exercisesMax/' + values.exerciseSelected.key).update({exerciseName: values.exerciseSelected.value});
        firebase.database().ref('exercisesMax/' + values.exerciseSelected.key + "/Records/").update(pushObj);
        //setValues({ ...values, weight: ''});
        //setValues({ ...values, exerciserSelected: {}});
        //setValues({ ...values, exerciseSelected: {}});
    }

    useEffect(() => {
        function getExercises() {
            firebase.database().ref('exercises').on('value', (snapshot) => {
                let items = snapshot.val();
                let newState = [];

                for (let item in items) {
                    if (items[item].exerciseName) {
                        newState.push({
                            key: item,
                            value: items[item].exerciseName
                        });
                    }
                }
                newState.sort((a, b) => (a.value > b.value) ? 1 : -1);

                console.log(newState);
                setExercises(newState);
            });
        }

        function getExercisers() {
            firebase.database().ref('exercisers').on('value', (snapshot) => {
                let items = snapshot.val();
                let newState = [];

                for (let item in items) {
                    newState.push({
                        key: item,
                        value: item
                    });
                }
                console.log(newState);
                setExercisers(newState);
            });
        }

        // Update the document title using the browser API
        getExercisers();
        getExercises();
    }, []);

    const handleChange = (prop) => (event) => {
        console.log(event.target.value);
        setValues({ ...values, [prop]: event.target.value });
    };


    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="warning">
                            <h4 className={classes.cardTitleWhite}>Update Record for Exercise</h4>
                            <p className={classes.cardCategoryWhite}>Complete the exercise description</p>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomSelect
                                        labelText="Exerciser Name"
                                        id="exerciser-name"
                                        dataSelect={exercisers}
                                        error={errorForm1}
                                        inputProps={{
                                            onChange: handleChange('exerciserSelected')
                                        }}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomSelect
                                        labelText="Exercise Name"
                                        id="exercise-name"
                                        dataSelect={exercises}
                                        error={errorForm2}
                                        inputProps={{ onChange: handleChange('exerciseSelected'), }}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInputWeight
                                        labelText="Exercise Weight"
                                        id="exercise-weight"
                                        error={errorForm3}
                                        inputProps={{
                                            'aria-label': 'weight',
                                            onChange: handleChange('weight'),
                                            endAdornment: <InputAdornment position="end">lb</InputAdornment>,
                                        }}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter>
                            <Button color="warning" onClick={addReportData}>Create</Button>
                        </CardFooter>
                    </Card>
                </GridItem>

            </GridContainer>
        </div >
    );
}


