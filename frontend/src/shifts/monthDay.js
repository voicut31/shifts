import React from "react";
import axios from "axios";

export default class MonthDay extends React.Component {

    constructor(props) {
        super(props)

        this.onChange = this.onChange.bind(this)
    }

    onChange(event) {
        if (this.props.shiftInfo !== undefined && this.props.shiftInfo.id !== undefined) {
            axios.patch('http://localhost:8081/api/users_shifts/' + this.props.shiftInfo.id, {
                user_id: this.props.userId,
                shift: event.target.value,
                shift_date: this.props.shiftDate,
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            let data = {
                user_id: this.props.userId,
                shift: event.target.value,
                shift_date: this.props.shiftDate,
            };

            axios.post('http://localhost:8081/api/users_shifts', data)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    render(){
        const props = this.props;
        let defaultShiftValue = (props.shiftInfo !== undefined && props.shiftInfo[0].shift !== undefined) ? props.shiftInfo[0].shift : '';

        let selected1 = defaultShiftValue  === 1 ? 'selected' : '';
        let selected2 = defaultShiftValue === 2 ? 'selected' : '';
        let selected3 = defaultShiftValue === 3 ? 'selected' : '';
        return (
            <td key={'td-' + props.userId + '-' + this.props.shiftDate} >
                <select
                    className={'form-control form-control-sm'}
                    onChange={this.onChange}
                    key={'select-' + props.userId + '-' + this.props.shiftDate}
                    defaultValue={defaultShiftValue}
                >
                    <option>Select shift</option>
                    <option selected={selected1} value="1">0 - 8</option>
                    <option selected={selected2} value="2">8 - 16</option>
                    <option selected={selected3} value="3">16 - 24</option>
                </select>
            </td>
        )
    }
}