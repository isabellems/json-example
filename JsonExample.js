import React from 'react'

const CodeBlock = (props) => (
    <span className={`value ${props.indented ? 'indented' : ''}`}>
        {props.name && 
            <React.Fragment>
              <span className='word'>"{props.name}"</span>:&nbsp;
            </React.Fragment>
        }
        {(typeof(props.value) === "number" || 
          typeof(props.value) === "string")&&
                <span className='word'>{props.value}</span>
        }
        {(!Array.isArray(props.value) && 
          typeof(props.value)==="object") &&
                <React.Fragment> 
                      <span className='brace'>{'{'}</span>
                      {props.indented && <br/>}
                      { Object.keys(props.value).map((key, index) => 
                          <CodeBlock name={key} value={props.value[key]} 
                              indented={props.indented} lastValue={index === Object.keys(props.value).length - 1}/>
                        )
                      }
                      <span className='brace'>{'}'}</span>
                </React.Fragment>
        }
        {Array.isArray(props.value) && 
            <React.Fragment>
                <span className='brace'>{'['}</span>
                { props.value.map((value, index) =>
                    <CodeBlock value={value} indented={props.indented} lastValue={index === props.value.length - 1}/>
                  )
                }
                <span className='brace'>{']'}</span>
            </React.Fragment>
        }
        {!props.lastValue && ', '}
        {props.indented && <br/>}
    </span>
)

export default (props) => (
    <div className='example code'>
        {props.header}&nbsp;
        {props.indented && <br/>}
        <CodeBlock value={props.data} indented={props.indented} lastValue={true}/>
     </div>
)
