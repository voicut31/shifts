import axios from 'axios'
import React from "react";
import { Container } from "react-bootstrap";
import MonthDay from "./monthDay";

export default class Shifts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            monthDays: [],
            users: [],
            users_shifts: [],
            weekday: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        }
    }

    componentDidMount() {
        this.myFunction();
        axios.get(`http://localhost:8081/api/users`)
            .then(res => {
                const users = res.data;
                this.setState({ users });
            });

        axios.get(`http://localhost:8081/api/users_shifts`)
            .then(res => {
                const users_shifts = res.data;
                var usersShifts = [];

                users_shifts.forEach(element => {
                    if(usersShifts[element.user_id] !== undefined && usersShifts[element.user_id][element.shift_date] !== undefined) {
                        usersShifts[element.user_id][element.shift_date].push( { id: element.id, shift: element.shift });
                    } else {
                        if(usersShifts[element.user_id] === undefined) {
                            usersShifts[element.user_id] = [];
                        }
                        usersShifts[element.user_id][element.shift_date] = [];
                        usersShifts[element.user_id][element.shift_date].push( { id: element.id, shift: element.shift });
                    }
                });
                this.setState({ users_shifts: usersShifts });
            });
    }

    daysInMonth(month,year) {
        return new Date(year, month, 0).getDate();
    }

    myFunction() {
        let d = new Date();
        let month = d.getMonth();
        let year = d.getFullYear();

        let monthDays = [];

        for (let i = 1, l = this.daysInMonth(month, year); i < l; i++) {
            let d = new Date(year, month - 1, i);
            let weekDay = this.state.weekday[d.getDay()];
            monthDays.push([ i, weekDay ] );
        }

        this.setState({ monthDays: monthDays });
    }

    render() {
        return(
            <Container>
                <h1>Shifts application</h1>
                <table className="table">
                    <thead>
                        <tr key="1">
                            <th key={1} scope={"col"}>#</th>
                            <th key={2} scope={"col"}>Name</th>
                            {
                                this.state.monthDays.map(function(obj) {
                                    return (<th key={"head-" + obj[0]} scope="col">{obj[0]}</th>)
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.users.map(function(object){
                            return (<tr key={'user-' + object.id}>
                                <td key={'user-id-' + object.id}>{object.id}</td>
                                <td key={'user-name-' + object.name}>{object.name}</td>
                                {
                                    this.state.monthDays.map(function(mD){
                                        let d = new Date();
                                        let month = d.getMonth() > 9 ? (d.getMonth() + 1) : ('0' + (d.getMonth() + 1));
                                        let dayDate = (mD[0] > 9 ) ?
                                            (d.getFullYear() + '-' + month + '-' + mD[0])  :
                                            (d.getFullYear() + '-' + month + '-0' + mD[0]);

                                        if (this.state.users_shifts[object.id] !== undefined && this.state.users_shifts[object.id][dayDate] !== undefined) {
                                            return (<MonthDay userId={object.id} shiftDate={dayDate} shiftInfo={this.state.users_shifts[object.id][dayDate]} />)
                                        } else {
                                            return (<MonthDay  userId={object.id} shiftDate={dayDate} />)
                                        }
                                    }.bind(this))
                                }
                            </tr>)
                        }.bind(this))
                    }
                    </tbody>
                </table>
            </Container>
    )}
}
