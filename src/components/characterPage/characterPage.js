import { Component } from "react";
import RowBlock from "../rowBlock/rowBlock";
import ItemList from "../itemList/itemList";
import ErrorMessage from "../errorMessage/errorMessage";
import CharDetails, { Field } from "../charDetails/charDetails";
import GotService from "../../services/gotService";

export default class CharacterPage extends Component {
	gotService = new GotService();

	state = {
		error: false,
		selectedChar: 130,
	};

	componentDidCatch() {
		this.setState({
			error: true,
		});
	}

	onItemSelected = (id) => {
		this.setState({ selectedChar: id });
	};

	render() {
		if (this.state.error) {
			return <ErrorMessage />;
		}

		const itemList = (
			<ItemList
				onItemSelected={this.onItemSelected}
				getData={this.gotService.getAllCharacters}
				renderItem={(item) => `${item.name} (${item.gender})`}
			/>
		);

		const charDetails = (
			<CharDetails charId={this.state.selectedChar}>
				<Field field="gender" label="Gender" />
				<Field field="born" label="Born" />
				<Field field="died" label="Died" />
				<Field field="culture" label="Culture" />
			</CharDetails>
		);

		return <RowBlock left={itemList} right={charDetails} />;
	}
}
