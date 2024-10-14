import  { useEffect, useRef } from 'react';
import * as d3 from "d3";

function PaymentChart  ({ data })  {
    const chartRef = useRef(null);

    useEffect(() => {
        if (data.length > 0) {
            const svg = d3.select(chartRef.current);
            const margin = { top: 20, right: 30, bottom: 40, left: 50 };
            const width = 600 - margin.left - margin.right;
            const height = 400 - margin.top - margin.bottom;

            svg.selectAll('*').remove();

            const g = svg
                .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

            const x = d3
                .scaleBand()
                .domain(data.map((d) => d.className))
                .range([0, width])
                .padding(0.1);
            const y = d3.scaleLinear().domain([0, d3.max(data, (d) => d.totalAmount)]).nice().range([height, 0]);

            g.append('g')
                .selectAll('.bar')
                .data(data)
                .enter()
                .append('rect')
                .attr('class', 'bar')
                .attr('x', (d) => x(d.className))
                .attr('y', (d) => y(d.totalAmount))
                .attr('width', x.bandwidth())
                .attr('height', (d) => height - y(d.totalAmount))
                .attr('fill', '#69b3a2');

            g.append('g')
                .attr('transform', `translate(0,${height})`)
                .call(d3.axisBottom(x));

            g.append('g').call(d3.axisLeft(y));

            g.selectAll('.label')
                .data(data)
                .enter()
                .append('text')
                .attr('class', 'label')
                .attr('x', (d) => x(d.className) + x.bandwidth() / 2)
                .attr('y', (d) => y(d.totalAmount) - 5)
                .attr('text-anchor', 'middle')
                .text((d) => d.totalAmount);
        }
    }, [data]);

    return <svg ref={chartRef} width={500} height={400}></svg>;
};

export default PaymentChart;
