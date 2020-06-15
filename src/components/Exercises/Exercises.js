import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import firebase from 'components/Firebase/firebase';

// core components
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";

const useStyles = makeStyles(styles);



export default function Exercises(props) {
    const classes = useStyles();
    const { exercises } = props;
    const tableCellClasses = classnames(classes.tableCell);


    const removeItem = (key) => {
        console.log("clicked: " + key);
        firebase.database().ref('exercises/'+ key).remove();
    }

    return (
        <Table className={classes.table}>
            <TableBody>
                {exercises.map((elem) => (
                    <TableRow key={elem.key} className={classes.tableRow}>
                        <TableCell className={tableCellClasses}>{elem.value}</TableCell>
                        <TableCell className={classes.tableActions}>
                            <IconButton
                                aria-label="Close"
                                className={classes.tableActionButton}
                                onClick={() => { removeItem(elem.key) }}
                            >
                                <Close
                                    className={
                                        classes.tableActionButtonIcon + " " + classes.close
                                    }
                                />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

Exercises.propTypes = {
    exercises: PropTypes.arrayOf(PropTypes.object),
};
