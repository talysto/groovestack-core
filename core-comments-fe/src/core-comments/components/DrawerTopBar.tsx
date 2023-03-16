import React from 'react'

// import { makeStyles } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// const useStyles = makeStyles((theme) => ({
// 	root: {
// 		flexGrow: 1,
// 		position: "sticky",
// 		top: 0,
// 	},
// 	appbar: {
// 		color: "black",
// 		backgroundColor: "white",
// 	},
// 	toolbar: {
// 		display: "flex",
// 		justifyContent: "space-between",
// 	},
// 	title: {
// 		fontSize: "1em",
// 		display: "flex",
// 		alignItems: "center",
// 	},
// 	formControl: {
// 		marginLeft: theme.spacing(1),
// 		minWidth: 50,
// 	},
// 	selectEmpty: {},
// 	flex: {
// 		display: "flex",
// 		alignItems: "center",
// 	},
// }));

export default function CommentTopBar() {
	// const classes = useStyles();

	return (
		<div
		// className={classes.root}
		>
			<AppBar position="sticky"
			// className={classes.appbar}
			>
				<Toolbar
					variant="dense"
					// className={classes.toolbar}
					>
					<div
					// className={classes.flex}
					>
						<Typography
							variant="h6"
							// className={classes.title}
							>
							Comments
						</Typography>
					</div>

				</Toolbar>
			</AppBar>
		</div>
	);
}
