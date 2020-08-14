const select = d3.select;
const csv = d3.csv;
const scaleLinear = d3.scaleLinear;
const scaleBand = d3.scaleBand;
const max = d3.max;
const axisLeft = d3.axisLeft;
const axisBottom = d3.axisBottom;

const svg = select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data => {
    const xValue = d => d.population;
    const yValue = d => d.country;
    const margin = {top: 20, right: 40, bottom: 20, left: 100}
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = scaleLinear()
                    .domain([0, max(data, d => xValue(d))])
                    .range([0, innerWidth]);
    
    const yScale = scaleBand()
                    .domain(data.map(d => yValue(d)))
                    .range([0, innerHeight])
                    .padding(0.1);
                    

    const g = svg.append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`);


    g.append('g').call(axisLeft(yScale));
    g.append('g').call(axisBottom(xScale))
        .attr('transform', `translate(0, ${innerHeight})`);

    g.selectAll('react')
        .data(data)
        .enter()
        .append('rect')
        .attr('y', d => yScale(yValue(d)))
        .attr('width', d => xScale(xValue(d)))
        .attr('height', yScale.bandwidth())
}

csv('data.csv').then(data => {
    data.forEach(d => {
        d.population = +d.population * 1000;
    });
    render(data)
});
