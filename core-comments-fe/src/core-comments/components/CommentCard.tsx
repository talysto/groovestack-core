import React, { useState, useEffect } from "react";

// import { makeStyles, Theme, createStyles } from '@mui/material/styles'; // TODO Refactor
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Divider from '@mui/material/Divider';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "react-admin";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";

// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         root: {
//             margin: 3,
//             "& .MuiTextField-root": {
//                 margin: "0 auto",
//                 width: "100%",
//             },
//             boxShadow: "none"
//         },
//         dividerFullWidth: {
//             margin: `5px 0 0 ${theme.spacing(2)}px`,
//         },
//         media: {
//             height: 0,
//             paddingTop: '56.25%', // 16:9
//         },
//         expand: {
//             transform: 'rotate(0deg)',
//             marginLeft: 'auto',
//             transition: theme.transitions.create('transform', {
//                 duration: theme.transitions.duration.shortest,
//             }),
//         },
//         expandOpen: {
//             transform: 'rotate(180deg)',
//         },
//         avatar: {
//             backgroundColor: red[500],
//         },
//         actions: {
//             paddingLeft: 18,
//         }
//     }),
// );

const CommentCard = (props: any) => {
    // const classes = useStyles();
    const {
        id,
        record,
        status,
        handleCreate,
        handleDelete,
        handleUpdate
    } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const [isEdit, setEditing] = useState(false);
    const [comment, setComment] = useState("");
    const [isChanged, writing] = useState(false);
    // const notify = useNotify();

    useEffect(() => {
        setComment(record.body);
    }, [record.body]);

    const handleEdit = () => {
        setEditing(true);
        setAnchorEl(null);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCancel = (event: any) => {
        setComment(record.body || ""); // set to empty string for create case
        writing(false);
        setEditing(false);
    };

    const handleChange = (event: any) => {
        event.stopPropagation();
        setComment(event.target.value);
        writing(true);
    };

    const handleDeleting = (event: any) => {
        handleDelete({ id, previousData: record, onSuccess: () => setAnchorEl(null) });
    }

    const handleCreating = (event: any) => {
        handleCreate({
            body: comment,
            resourceType: record.resource,
            resourceId: record.resourceId
        })

        setComment("");
    }

    const handleUpdating = (event: any) => {
        handleUpdate({
            id: record.id,
            data: { id: record.id, body: comment },
            previousData: record,
            onSuccess: () => {
                setEditing(false)
                setAnchorEl(null)
            }
        })
    }

    const isCreate = status === "create";

    return (
        <>
            <Card
            // className={classes.root}
            >
                <CardHeader
                    avatar={
                        !isCreate ? <Avatar aria-label="author"
                        // className={classes.avatar}
                        >
                            {record.author.name.split(" ").map((word: any[]) => word[0]).join("")}
                        </Avatar> : null
                    }
                    action={!isCreate &&
                        <IconButton aria-label="settings" onClick={handleClick}>
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={!isCreate ? record.author.name : ""}
                    subheader={!isCreate ? new Date(record.createdAt).toLocaleDateString() : ""}
                />

                <CardContent>
                    {isCreate ? (
                        <TextField
                            multiline
                            maxRows={5}
                            value={comment}
                            onChange={handleChange}
                            variant="outlined"
                        />
                    ) : (
                        !isEdit ? (
                            <Typography variant="body2" color="textSecondary" component="p">
                                {comment}
                            </Typography>
                        ) : (
                            <TextField
                                multiline
                                maxRows={5}
                                value={comment}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        )
                    )
                    }
                </CardContent>
                <CardActions
                // className={classes.actions}
                >
                    {(isEdit || isCreate) ? (
                        <>
                            {isEdit &&
                                <Button
                                    size="small"
                                    color="primary"
                                    variant="contained"
                                    disabled={!isChanged}
                                    onClick={handleUpdating}
                                >
                                    <>Save</>
                                </Button>
                            }
                            {isCreate &&
                                <Button
                                    size="small"
                                    color="primary"
                                    variant="contained"
                                    disabled={!isChanged}
                                    onClick={handleCreating}
                                >
                                    <>Comment</>
                                </Button>
                            }
                            <Button
                                size="small"
                                color="primary"
                                onClick={handleCancel}
                            >
                                <>Cancel</>
                            </Button>
                        </>
                    ) : null
                    }
                </CardActions>
            </Card>
            <Divider variant="middle" />
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <MenuItem onClick={handleEdit}>
                    Edit
                </MenuItem>
                <MenuItem onClick={handleDeleting}>
                    Delete
                </MenuItem>
            </Menu>
        </>
    );
}

export default CommentCard;