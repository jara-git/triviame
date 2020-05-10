import React, { Component, Fragment } from 'react';
import './questions.scss';
import { CSSTransitionGroup } from 'react-transition-group';
  
class Questions extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            isLoading: false,
            data: [],
            answers: []
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
        const { isLoading, data } = this.state;
        console.log("DATA", data);

        return (
            <Fragment>
                { !isLoading && data ? (
                //  element that wraps all of the components that are going to be animated.
                // <CSSTransitionGroup
                //     className="container"
                //     component="div"
                //     transitionName="fade"
                //     transitionEnterTimeout={800}
                //     transitionLeaveTimeout={500}
                //     transitionAppear
                //     transitionAppearTimeout={500}
                // >
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
                                                <input className='check' type="checkbox" onChange={ function guessed (option, correct_answer) {
                                                    return (index2.option === index.correct_answer)? 'Hooray!':
                                                   'ooooh wrong answer..'
                                                } } />
                                                <p>{option}</p>
                                            </div>
                                        )
                                    })}
                            </section>
                        </main>
                    </div>
                    )
                })
                // </CSSTransitionGroup>
                ) : (
                    <div className='ripplerer'><div><div className="lds-ripple"><div></div><div></div></div></div></div>
                )

            }
            </Fragment>
        )
    }
}


export default Questions;
  