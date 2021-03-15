import React from 'react'
import { IoIosCheckmarkCircleOutline, IoIosRefresh, IoIosCloseCircleOutline } from 'react-icons/io';

const options =  {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
}

const StatusIcon = ({ icon })=>{

 return icon === 'true' ? <IoIosCheckmarkCircleOutline /> : <IoIosCloseCircleOutline />
}


export default function KnowledgeCheckBlock(){
    const [state, setState] = React.useState(null)
    const [passed, setPassed] = React.useState('')

    React.useEffect(()=>{

        fetch('/knowledge-check-blocks', options)
            .then(response => response.json())
            .then(data => setState(data));
        
    }, [])

    const submit = (e)=>{
       e.preventDefault()
       console.log('l', typeof e.target.elements.answer.value)
       if(e.target.elements.answer.value === 'true'){
        setPassed('true')
       }else{
        setPassed('false') 
       }
    }

    const reset = ()=>{
        window.document.getElementById("knowledge-form").reset()
        setPassed('')
    }

    const FeedBackIcon = passed === 'true'? IoIosCheckmarkCircleOutline : IoIosCloseCircleOutline

    return (
        <div className="container">
        <form onSubmit={submit} id="knowledge-form">
        {state?.map(val=>(
            <React.Fragment key={val.id}>
            <h3 className="title">{val.question?.text}</h3>
            <img src={val.question?.media?.url} alt={val.question?.text} width="632" />
            <ul className="lists">
                {val.answers.map(answer =>(
                    <li key={answer.key} className={passed === answer.isCorrect.toString() ? 'selected': ''}>
                    {passed !== '' 
                    ? <StatusIcon icon={answer.isCorrect.toString()} />
                    : <input type="radio" name="answer" value={answer.isCorrect} />} 
                    {answer.text}
                    </li>

                ))}
            </ul>
          </React.Fragment>
        ))}
         {passed !== '' &&
         <>
         <div className="feedback">
         <FeedBackIcon style={{fontSize: '5rem', color: '#888', display: 'block', margin: '0 auto'}}/>
         <span style={{fontSize: '0.8rem'}}>{passed === 'true' ? 'Correct' : 'Incorrect'}</span>
         <p style={{color: '#707070', fontSize: '0.9rem'}}>I just love cookies and a warm cup of coffee!</p>
         </div>
        <p className="retry">
        <span onClick={reset}>TAKE AGAIN <br /><IoIosRefresh style={{fontSize: '1.5rem'}}/></span>
        </p>
        </>
         }
  
         <button className="btn" type="submit">Submit</button>
         </form>
        </div>
    )
    }