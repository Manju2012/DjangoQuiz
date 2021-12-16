console.log('Hello')

const url = window.location.href

const quizBox = document.getElementById('quiz-box')
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

                answers.forEach(ans=>{
                    quizBox.innerHTML += `
                        <div>
                            <input type='radio' class='ans' id='${question}-${ans}' name='${question}' value='${ans}'
                            <label for='${question}'>${ans}</label>
                    `
                })
            }
        });

    },
    error: function(error){
        console.log(error)
    }
});