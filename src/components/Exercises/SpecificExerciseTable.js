import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";

// @material-ui/icons
import firebase from 'components/Firebase/firebase';

// core components
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";

const useStyles = makeStyles(styles);



export default function SpecificExerciseTable(props) {
    const classes = useStyles();
    const { exerciseId } = props;
    const tableCellClasses = classnames(classes.tableCell);
    const [exerciseData, setExerciseData] = useState([]);

    useEffect(() => {
        function getExerciseData() {
            firebase.database().ref('exercisesMax/' + exerciseId + '/Records').on('value', (snapshot) => {
                let res = [];
                let val = snapshot.val();
                Object.keys(val).map(key => {
                    res.push({key: key, value: val[key]});
                });
                res.sort((a, b) => (a.value < b.value) ? 1 : -1);

                console.log(res);
                
                setExerciseData(res);
            });
        }


        // Update the document title using the browser API
        //getExerciseName();
        getExerciseData();
    }, [exerciseId]);


    return (
        <Table className={classes.table}>
            <TableHead className={classes["warningTableHeader"]}>
                <TableRow className={classes.tableHeadRow}>
                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>
                        {"Name"}
                    </TableCell>
                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>
                        {"Weight"}
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {exerciseData.map((elem) => (
                    <TableRow key={elem.key} className={classes.tableRow}>
                        <TableCell className={tableCellClasses}>{elem.key}</TableCell>
                        <TableCell className={tableCellClasses}>{elem.value}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

SpecificExerciseTable.propTypes = {
    exerciseId: PropTypes.string,
};
