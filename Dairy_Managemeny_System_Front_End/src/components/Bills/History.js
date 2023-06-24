


import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, PolarGrid } from 'recharts';
import '../../css/History.css';
import moment from 'moment';

const History = () => {
    const [bills, setBills] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [minAmount, setMinAmount] = useState(null);
    const [maxAmount, setMaxAmount] = useState(null);

    const lowestAmount = Math.min(...bills.map((bill) => bill.totalAmount));
    const highestAmount = Math.max(...bills.map((bill) => bill.totalAmount));


    useEffect(() => {
        if (bills.length > 0) {
            let minIndex = 0;
            let maxIndex = 0;
            let minValue = bills[0].totalAmount;
            let maxValue = bills[0].totalAmount;

            bills.forEach((bill, index) => {
                if (bill.totalAmount < minValue) {
                    minIndex = index;
                    minValue = bill.totalAmount;
                }

                if (bill.totalAmount > maxValue) {
                    maxIndex = index;
                    maxValue = bill.totalAmount;
                }
            });
            setMinAmount(bills[minIndex].totalAmount);
            setMaxAmount(bills[maxIndex].totalAmount);
        }
    }, [bills]);

    const handleFilter = (e) => {
        e.preventDefault();

        const startDateString = startDate ? `startDate=${startDate}&` : '';
        const endDateString = endDate ? `endDate=${endDate}&` : '';

        fetch(`http://localhost:7071/bills/all-bills`)
            .then(response => response.json())
            .then(data => setBills(data))
            .catch(error => console.error(error));
    };
    const getChartData = () => {
        const chartData = [];
        let buffaloTotal = 0;
        let cowTotal = 0;

        bills.forEach(bill => {
            buffaloTotal += bill.buffaloMilkQuantity;
            cowTotal += bill.cowMilkQuantity;
        });

        chartData.push({ name: 'Buffalo Milk', value: buffaloTotal });
        chartData.push({ name: 'Cow Milk', value: cowTotal });

        return chartData;
    };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className='form'>
            <h2>Analyze Bills</h2>
            {/* // <Form onSubmit={handleFilter} className='form'>
            //     <Form.Group controlId="startDate">
            //         <Form.Label className='form-label'>Start Date</Form.Label>
            //         <Form.Control className='form-control' type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            //     </Form.Group>

            //     <Form.Group controlId="endDate">
            //         <Form.Label className='form-label'>End Date</Form.Label>
            //         <Form.Control className='form-control' type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            //     </Form.Group>

                <Button className='btn' variant="primary" type="submit">
                    Filter
                </Button>
            // </Form> */}
            <Button className='btn' variant="" type="submit" onClick={handleFilter}>
                click here to analyze
            </Button>
            {bills.length > 0 && (
                <div style={{ width: '100%' }}>

                    <div backgroundColor='grey' style={{ position: 'absolute', left: 0, marginTop: 40 }}>
                        <h2 >Bill Summary</h2>
                        <BarChart width={600} height={300} data={bills} className='bar-chart' style={{ backgroundColor: 'lightgrey' }} >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis fontSize={20} color="black" dataKey="billDate" tickFormatter={(date) => moment(date).format("DD-MM")} />
                            <YAxis />
                            <Tooltip className='recharts-default-tooltip' />
                            <Legend className='recharts-default-legend' />
                            <Bar dataKey="totalAmount" fill="royalblue" />
                        </BarChart>
                    </div>


                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {/* <h2 >Milk Quantity Breakdown</h2> */}
                        <PieChart width={800} height={600} className='pie-chart' >
                            <PolarGrid />
                            <Pie
                                data={getChartData()}
                                cx={200}
                                cy={300}
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {getChartData().map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip className='recharts-default-tooltip' />
                            <Legend className='recharts-default-legend' />
                        </PieChart>
                    </div>
                </div>

            )}

            {bills.length > 0 && (
                <Table className="table-custom" striped bordered hover>
                    <thead>
                        <tr>
                            <th>Bill ID</th>
                            <th>Bill Date</th>
                            <th>Buffalo Milk Quantity</th>
                            <th>Buffalo Milk Fat</th>
                            <th>Cow Milk Quantity</th>
                            <th>Cow Milk Fat</th>
                            <th>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills.map(bill => (
                            <tr key={bill.billId} style={{ backgroundColor: bill.totalAmount === minAmount ? 'red' : bill.totalAmount === maxAmount ? 'green' : 'transparent' }}>
                                <td className='.table-custom-td'>{bill.billId}</td>
                                <td className='.table-custom-td'>{bill.billDate}</td>
                                <td className='.table-custom-td'>{bill.buffaloMilkQuantity}</td>
                                <td className='.table-custom-td'>{bill.buffaloMilkFat}</td>
                                <td className='.table-custom-td'>{bill.cowMilkQuantity}</td>
                                <td className='.table-custom-td'>{bill.cowMilkFat}</td>
                                <td className='.table-custom-td'>{bill.totalAmount}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}


            <div className='low-high' >
                Lowest Amount: {lowestAmount} | Highest Amount: {highestAmount}
            </div>

        </div>
    );
};

export default History;
