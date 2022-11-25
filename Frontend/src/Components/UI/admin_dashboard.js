import { Button, Container, FormControl, getFabUtilityClass, Grid, InputLabel, MenuItem, OutlinedInput, Paper, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Chart, registerables } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { line_chart, default_data, pie_chart } from '../Function/adminDashboard_function'
import axios from 'axios'
Chart.register(...registerables);



const Admin_dashboard = () => {
    const res = default_data();
    const [options, setoption] = useState(res.options)
    const [data, setdata] = useState(res.data);
    const [pie_data, setPieData] = useState(res.data);
    const [year, setYear] = useState("2022");
    const [reload, setReload] = useState(true);
    const filter = (years) => {
        axios.post(process.env.REACT_APP_HOST + "api/charts/user_count", { year: years })
            .then((response) => {
                console.log(response.data)
                const ok = line_chart(response.data.employer_month, response.data.freelancer_month);
                setoption(ok.options);
                setdata(ok.data)
            })
        axios.post(process.env.REACT_APP_HOST + "api/charts/skillset", { year:years })
            .then((response) => {
                console.log(response.data)
                const ok = pie_chart(response.data);
                setPieData(ok.data)
            })
    }
    useEffect(() => {
        axios.post(process.env.REACT_APP_HOST + "api/charts/user_count", { year })
            .then((response) => {
                console.log(response.data)
                const ok = line_chart(response.data.employer_month, response.data.freelancer_month);
                setoption(ok.options);
                setdata(ok.data)
            })
        axios.post(process.env.REACT_APP_HOST + "api/charts/skillset", { year })
            .then((response) => {
                console.log(response.data)
                const ok = pie_chart(response.data);
                setPieData(ok.data)
            })
    }, [reload])
    return (
        <>
            <Container>

                <FormControl fullWidth sx={{ my: 3 }}>
                    <InputLabel id="skillsets">Year</InputLabel>
                    <Select
                        sx={{ backgroundColor: "white" }}
                        labelId="skillsets"
                        id="skillset"
                        value={year}
                        onChange={async (e) => { await setYear(e.target.value); filter(e.target.value); }}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    >

                        <MenuItem value="2021">2021</MenuItem>
                        <MenuItem value="2022">2022</MenuItem>
                        <MenuItem value="2023">2023</MenuItem>


                    </Select>
                </FormControl>



                <Grid container spacing={3}>
                    <Grid item xs={12} lg={6}>
                        <Paper sx={{ width: "100%" }} elevation={5}>
                            <Line option={options} data={data} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Paper sx={{ width: "100%" }} elevation={5}>
                            <Pie option={options} data={pie_data} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} lg={12}>
                        <Paper sx={{ width: "100%" }} elevation={5}>
                            <Line option={options} data={data} />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>


        </>
    )
}

export default Admin_dashboard
