import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import getText from "../../messages";

export default function RowRadioButtonsGroup(props) {
	const [selectedValue, setSelectedValue] = React.useState("female");
	const onChange = props.onChange;
	const handleChange = (event) => {
		setSelectedValue(event.target.value);
		if(onChange){
			onChange(event);
		}
	};
	React.useEffect(() => {
		setSelectedValue(props.value);
	}, [props.value]);
	return (
		<RadioGroup
			row
			aria-labelledby="demo-row-radio-buttons-group-label"
			name="row-radio-buttons-group"
			defaultValue="female"
			value={selectedValue}
			onChange={handleChange}
		>
			<FormLabel
				required
				id="demo-row-radio-buttons-group-label"
				sx={{ marginTop: ".5rem", marginRight: "1rem" }}
			>
				{getText("gender")}
			</FormLabel>
			<FormControlLabel
				value="female"
				name="female"
				control={<Radio />}
				label={getText("female")}
			/>
			<FormControlLabel
				value="male"
				name="male"
				control={<Radio />}
				label={getText("male")}
			/>
			<FormControlLabel
				value="other"
				name="other"
				control={<Radio />}
				label={getText("other")}
			/>
		</RadioGroup>
	);
}
