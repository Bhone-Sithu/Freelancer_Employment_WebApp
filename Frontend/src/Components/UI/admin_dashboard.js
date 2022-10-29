import { Container, getFabUtilityClass, Grid, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Chart, registerables } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { line_chart, default_data } from '../Function/adminDashboard_function'
import axios from 'axios'
Chart.register(...registerables);



const Admin_dashboard = () => {
    const res = default_data();
    const [options, setoption] = useState(res.options)
    const [data, setdata] = useState(res.data);
    useEffect(() => {
        axios.get(process.env.REACT_APP_HOST + "api/charts/line_chart")
        .then((response)=>{
            console.log(response.data)
            const ok = line_chart(response.data.employer_month,response.data.freelancer_month);
            setoption(ok.options);
            setdata(ok.data)
        })


    })
    return (
        <>
            <Container>


                <Grid container spacing={3}>
                    <Grid item xs={12} lg={6}>
                        <Paper sx={{ width: "100%" }} elevation={5}>
                            <Line option={options} data={data} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Paper sx={{ width: "100%" }} elevation={5}>
                            <Bar option={options} data={data} />
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
