/**
 * Created by xinzheng on 5/2/17.
 */
{ this.props.gridNumber != null && !this.props.isCompareMode ?
  <div>
    <h5>Total number of jobs</h5>
    <BarChart width={300} height={window.innerHeight * 0.55} data={data}
              margin={{top: 50, right: 30, left: 0, bottom: 5}} style={{color: "white"}}>

      <XAxis dataKey="name" stroke="white"/>
      <YAxis stroke="white" type="number" domain={[0, 400000]} tickFormatter={tooltipFormatter}/>

      <CartesianGrid strokeDasharray="3 3"/>
      {/*<Tooltip/>*/}
      {/*<Legend />*/}
      <Bar dataKey="job" fill="#facd7a" isAnimationActive={false} label/>

    </BarChart>
  </div>
  : null
}


  <div>
    <h5>Total number of jobs</h5>
    <BarChart width={300} height={window.innerHeight * 0.55} data={data}
              margin={{top: 50, right: 30, left: 0, bottom: 5}} style={{color: "white"}}>

      <XAxis dataKey="name" stroke="white"/>
      <YAxis stroke="white" type="number" domain={[0, 400000]} tickFormatter={tooltipFormatter}/>

      <CartesianGrid strokeDasharray="3 3"/>
      {/*<Tooltip/>*/}
      {/*<Legend />*/}

      <Bar dataKey="job" fill="#facd7a" isAnimationActive={false} label>
        {
          data.map((entry, index) => (
            <Cell fill={index === 0 ? '#2eadd3' : '#facd7a' } key={`cell-${index}`}/>
          ))
        }
      </Bar>

    </BarChart>
