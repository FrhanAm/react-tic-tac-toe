import React from "react";
import { IconButton } from '@material-ui/core';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';


class GameButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = { check: false };
    }

    handle() {
        let result = this.props.click();
        result && this.setState({ check: result });
    }

    render() {
        return (
            <IconButton id={this.props.id} color="primary" onClick={() => { this.handle() }}>
                {this.state.check || <CheckBoxOutlineBlank fontSize="large" />}
            </IconButton>
        );
    }
}

export default GameButton;