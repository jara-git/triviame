import React, { Component, Fragment } from 'react';
import './questions.scss';
  
class Questions extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            isLoading: false,
            data: [],
            answers: [],
            final_score: 0
        }
    }

    //fetching results from API, 10 questions general questions medium difficulty category
    componentDidMount() {
        this.setState({ isLoading: true });
        
         fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=medium')
          .then(response => response.json())
          .then(fetchedData => this.setState({ data: fetchedData.results }));

          // this.setState({results})

        this.setState({ isLoading: false })
    }


    render() { 
        const { isLoading, data, answers } = this.state;

        return (
            <Fragment>
                { !isLoading && data ? (
                
                data.map((element, index) => {
                    let options = element.incorrect_answers.concat(element.correct_answer)
                    return (
                        <div key= {index} className='Questions'>
                        <main className='qa'>
                            <section className='trivia-questions'>
                            <h2>{ element.question }</h2>
                            </section>
                            <section className='trivia-answers'>
                                <h2>Options</h2>
                                    {options.map((option, index2) => {
                                        return (
                                            <div className='item-list' key= {index2}>
                                                <input value = {option} id = {index2} className='check' type="radio" name = "option" onChange = {e => {
                                                    let entry = [element.correct_answer, e.target.value];
                                                    this.setState(
                                                        state => {
                                                            const answers = [...this.state.answers, entry]
                                                            return { answers }
                                                        }
                                                    )
                                                }} />
                                                <label className='checks' htmlFor = {index2}>{option}</label>
                                            </div>
                                        )
                                    })}   
                            </section>
                        </main>
                    </div>
                    )
                })
                
                ) : (
                    <div className='ripplerer'><div><div className="lds-ripple"><div></div><div></div></div></div></div>
                )

            }
            </Fragment>
        )
    }
}


export default Questions;
  