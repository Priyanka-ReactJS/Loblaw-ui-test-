
import React from 'react'
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles((theme) => ({
    root: {
        flexWrap: 'wrap',
        backgroundColor: theme.palette.background.paper,
        borderRadius: '10px',
        // NOTE: Media query for different screen size
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
        [theme.breakpoints.up('md')]: {
            width: '100%',
        },
        [theme.breakpoints.up('lg')]: {
            width: '50%',
        }
    },
    pos: {
        marginBottom: 12,
        textAlign: 'center',
        fontWeight: 600,
        marginTop: '12px',
        color: 'white'
    },
    row: {
        width: '97%'
    },
    cardContent: {
        width: '100%',
        textAlign: 'center',
        backgroundColor: '#198794d1',
    },
    h5: {
        fontSize: '1.2rem',
        fontWeight: '400',
        lineHeight: '1.334',
        letterSpacing: '0em',
        marginTop: '24px',
        color: 'white'
    }
}));

const Cardwrap = ({ text, value }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.row}>
                {/* Note: Material Ui components */}
                <Card className={classes.root} variant="outlined">
                    <CardContent className={classes.cardContent}>
                        <Typography className={classes.h5} >
                            {text}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            {value}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
export default Cardwrap;