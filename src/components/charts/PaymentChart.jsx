import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function PaymentChart({ data }) {
    const chartRef = useRef(null);

    useEffect(() => {
        if (data.length > 0) {
            const svg = d3.select(chartRef.current);

            const margin = { top: 40, right: 40, bottom: 60, left: 70 };
            const width = 1000 - margin.left - margin.right;
            const height = 500 - margin.top - margin.bottom;

            svg.selectAll('*').remove();

            const g = svg
                .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

            const x = d3
                .scalePoint()
                .domain(data.map(d => d.className))
                .range([0, width]);

            const y = d3
                .scaleLinear()
                .domain([0, d3.max(data, (d) => d.totalAmount)])
                .nice()
                .range([height, 0]);

            const line = d3
                .line()
                .x((d) => x(d.className))
                .y((d) => y(d.totalAmount))
                .curve(d3.curveMonotoneX);

            g.append('g')
                .attr('transform', `translate(0,${height})`)
                .call(d3.axisBottom(x))
                .selectAll('text')
                .attr('transform', 'rotate(-45)')
                .style('text-anchor', 'end');

            g.append('g').call(d3.axisLeft(y));

            g.append('path')
                .datum(data)
                .attr('fill', 'none')
                .attr('stroke', '#69b3a2')
                .attr('stroke-width', 2)
                .attr('d', line);

            g.selectAll('circle')
                .data(data)
                .enter()
                .append('circle')
                .attr('cx', (d) => x(d.className))
                .attr('cy', (d) => y(d.totalAmount))
                .attr('r', 4)
                .attr('fill', '#69b3a2');

            g.selectAll('.label')
                .data(data)
                .enter()
                .append('text')
                .attr('class', 'label')
                .attr('x', (d) => x(d.className))
                .attr('y', (d) => y(d.totalAmount) - 10)
                .attr('text-anchor', 'middle')
                .text((d) => d.totalAmount);
        }
    }, [data]);

    return <svg ref={chartRef} width={1000} height={500}></svg>;
};

export default PaymentChart;
