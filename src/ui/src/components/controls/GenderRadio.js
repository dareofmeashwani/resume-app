import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import getText from "../../messages";

export default function RowRadioButtonsGroup() {
	return (
		<FormControl>
			<RadioGroup
				row
				aria-labelledby="demo-row-radio-buttons-group-label"
				name="row-radio-buttons-group"
			>
				<FormLabel required
					id="demo-row-radio-buttons-group-label"
					sx={{ marginTop: ".5rem", marginRight: "1rem" }}
				>
					{getText("gender")}
				</FormLabel>
				<FormControlLabel
					value="female"
					control={<Radio />}
					label={getText("female")}
				/>
				<FormControlLabel
					value="male"
					control={<Radio />}
					label={getText("male")}
				/>
				<FormControlLabel
					value="other"
					control={<Radio />}
					label={getText("other")}
				/>
			</RadioGroup>
		</FormControl>
	);
}
