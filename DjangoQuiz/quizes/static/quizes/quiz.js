console.log('Hello quiz view')

const url = window.location.href

const quizBox = document.getElementById('quiz-box')
const ScoreBox = document.getElementById('score-box')
const resultBox = document.getElementById('result-box')


// let data

$.ajax({
    type: 'GET',
    url: `${url}data`,
    success: function(response){
        // console.log(response)
        const data = response.data
        data.forEach(el => {
            for (const [question, answers] of Object.entries(el)){
                quizBox.innerHTML += `
                    <hr>
                    <div class='mb-2'>
                        <b>${question}</b>
                    </div>
                `

                answers.forEach(answer=>{
                    quizBox.innerHTML += `
                        <div>
                            <input type='radio' class='ans' id='${question}-${answer}' name='${question}' value='${answer}'
                            <label for='${question}'>${answer}</label>
                    `
                })
            }
        });

    },
    error: function(error){
        console.log(error)
    }
});

const quizFom = document.getElementById('quiz-form')
const csrf = document.getElementsByName('csrfmiddlewaretoken')

const sentData = () =>  {
    const elements = [...document.getElementsByClassName('ans')]
    const data = {}
    data['csrfmiddlewaretoken'] = csrf[0].value
    elements.forEach(el=> {
        if (el.checked) {
            data[el.name] = el.value
        }
        else {
            if (!data[el.name]) {
                data[el.name] = null
            }
        }
    })

$.ajax({
    type:'POST',
    url: `${url}save/`,
    data: data,
    success: function(response){
        // console.log(response)
        const results = response.results
        quizFom.classList.add('not-visble')
        console.log(results);

        ScoreBox.innerHTML = `${response.passed ? 'congrailations!' : 'Ups..:('} your result is ${response.score.toFixed(2)}%`

        results.forEach(res => {
            const resDiv = document.createElement('div')
            for (const [question, resp] of Object.entries(res)){
                // console.log(question);
                // console.log(resp);
                // console.log('******');

                resDiv.innerHTML += question
                const cls = ['conntaine', 'p-3', 'text-light','h6']
                resDiv.classList.add(...cls)

                if (resp=='not answered'){
                    resDiv.innerHTML += `- not answered`
                    resDiv.classList.add('bgg-danger')
                }
                else{
                    const answer = resp['answere']
                    const correct = resp['correcct_answer']

                    // console.log(answer, correct);
                    if (answer == correct){
                    resDiv.classList.add('bg-success')
                    resDiv.innerHTML += `answered : $(answer)`
                    } else{
                        resDiv.classList.add('bg-danger')
                        resDiv.innerHTML += ` | corect answer: ${correct}`
                        resDiv.innerHTML += ` | answered: $(answer)`
                    }
                }
            }
            // const body = document.getElementsByClassName('BODY')[0]
            resultBox.append(resDiv)
        });
    },
    error: function(error){
        console.log(error);
    }
});

}

quizFom.addEventListener('submit', e=>{
    e.preventDefault()

    sentData()
})