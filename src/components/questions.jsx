import React, { Component } from 'react';
import './questions.scss';
  
class Questions extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            isLoading: false,
            data: null,
        }
    }

    //fetching results from API, 10 questions general questions medium difficulty category
    componentDidMount() {
        this.setState({ isLoading: true });
        this.setState({ question: true });
        

         fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=medium')
          .then(response => response.json())
          .then(fetchedData => this.setState({ data: fetchedData.results }));

          // this.setState({results})

        this.setState({ isLoading: false })
        console.log(this.state.data);

        // if this.state.data.map((element, index) => {
        //    return (
        //      <div key={index}>... 
        //    )   
        //})
    }

    render() { 
        const { isLoading,   } = this.state;
        if (isLoading) {
            return <div className='ripplerer'><div><div className="lds-ripple"><div></div><div></div></div></div></div>;
          }
        return ( 
            <div className='Questions'>
                <main className='qa'>
                    <section className='trivia-questions'>
                        <h2>Question</h2>
                    </section>
                    <section className='trivia-answers'>
                        <h2>Options</h2>
                        <p className='description'>Choose one correct answer</p>
                    </section>
                </main>

            </div>
         );
    }
}

export default Questions;
  